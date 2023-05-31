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
  const { id } = req.params;
  const {
    name1,
    lastName1,
    RutPlayer1,
    email1,
    mobileNumber1,
    birthDate1,
    poloSize1,
    category1,
    clubPlay1,
    positionPlay1,
    medicalProblem1,
    name2,
    lastName2,
    RutPlayer2,
    email2,
    mobileNumber2,
    birthDate2,
    poloSize2,
    category2,
    clubPlay2,
    positionPlay2,
    medicalProblem2,
    discountCoupon,
  } = req.body;

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

    const inscription = await Inscription.create({
      name1,
      lastName1,
      RutPlayer1,
      email1,
      mobileNumber1,
      birthDate1,
      poloSize1,
      category1,
      clubPlay1,
      positionPlay1,
      medicalProblem1,
      name2,
      lastName2,
      RutPlayer2,
      email2,
      mobileNumber2,
      birthDate2,
      poloSize2,
      category2,
      clubPlay2,
      positionPlay2,
      medicalProblem2,
      discountCoupon,
      eventId: id,
    });

    console.log('Pago guardado:', newPayment, inscription);
    res.status(200).json({
      status: 'success',
      message: 'Pago realizado con éxito',
      paymentStatus: data.body.status,
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Webhook recibido',
      data,
    });
  }

  return next(new AppError(`Something goes wrong`, 404));
});
