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

  res.status(200).json({
    status: 'success',
    message: 'Pago realizado con éxito',
    preferenceId: response,
  });
});

exports.webhook = catchAsync(async (req, res) => {
  try {
    const payment = req.query;
    const io = req.app.get('io'); // Obtener la instancia de 'io' desde la aplicación Express Bandera para controlar la emisión única del evento

    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id']);
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
      if (data.body.status === 'approved') {
        contador++; // Incrementar el contador
        io.emit('validPay', { data: 'approved', contador }); // Emitir el evento con el contador
      }

      res.status(200).json({
        status: 'success',
        message: 'Pago realizado con éxito',
        paymentStatus: data.body.status,
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Webhook recibido',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
});
