const catchAsync = require('../utils/catchAsync');
const mercadopago = require('mercadopago');
const AppError = require('../utils/AppError');
const Event = require('../models/event.model');
const DatePayments = require('../models/datePayments.model');

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN,
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { couponCode } = req.body;

  const event = await Event.findOne({
    where: {
      id,
    },
  });

  if (!event) {
    return next(new AppError('Event not found', 401));
  }

  const unitPrice = parseFloat(event.price.replace('.', '').replace(',', '.'));

  let discount = 0;
  if (couponCode === event.coupon1) {
    discount = unitPrice * (event.discount1 / 100);
  } else if (couponCode === event.coupon2) {
    discount = unitPrice * (event.discount2 / 100);
  }

  const finalPrice = unitPrice - discount;

  if (finalPrice === 0) {
    res.status(200).json({
      status: 'success',
      message: 'Evento registrado como gratuito',
      paymentLink: null,
    });

    return; // Terminar la ejecución de la función
  }

  const preference = {
    items: [
      {
        title: event.name,
        unit_price: finalPrice,
        quantity: 1,
        currency_id: 'PEN',
      },
    ],
    notification_url: `${process.env.NOTIFICATION_URL}/api/v1/event/webhook`,
    back_urls: {
      success: 'http://localhost:5173/#/', // URL de éxito
    },
    external_reference: id.toString(),
  };

  const response = await mercadopago.preferences.create(preference);

  if (!response || !response.body || !response.body.init_point) {
    const error = new Error('Error al generar la preferencia de pago');
    error.statusCode = 500;
    throw error;
  }

  // Enviar la respuesta al frontend con el enlace de pago
  res.status(200).json({
    status: 'success',
    message: 'Orden de pago creada con éxito',
    paymentLink: response.body.init_point,
  });
});

exports.webhook = catchAsync(async (req, res) => {
  const payment = req.query;
  if (payment.type === 'payment') {
    const data = await mercadopago.payment.findById(payment['data.id']);
    console.log(data);
    const newPayment = await DatePayments.create({
      email: data.body.payer.email,
      typePay: data.body.order.type,
      transactionAmount: data.body.transaction_amount,
      receivedAmount: data.body.transaction_details.net_received_amount,
      collectorId: data.body.collector_id,
      status: data.body.status,
      description: data.body.description,
    });
    console.log('Pago guardado:', newPayment);

    // Validar el estado del pago
    if (data.body.status === 'approved') {
      res.status(200).json({
        status: 'success',
        message: 'Pago realizado con éxito',
        paymentStatus: 'approved',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Pago pendiente',
        paymentStatus: 'pending',
      });
    }
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Webhook recibido',
    });
  }
});
