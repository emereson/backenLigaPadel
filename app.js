const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const http = require('http');
const socketIO = require('socket.io');

const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const eventRoute = require('./routes/event.routes');
const inscriptionRoute = require('./routes/inscription.routes');
const sponsorRoute = require('./routes/sponsor.routes');
const galleryRoute = require('./routes/gallery.routes');
const calendaryRoute = require('./routes/calendary.routes');
const listVersusRoute = require('./routes/listVersus.routes');
const resultsEventRoute = require('./routes/resultsEvent.routes');
const datePaymentsRoute = require('./routes/datePayments.routes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/error.controller');
const { rateLimit } = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(hpp());

app.use('/api/v1', limiter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/event', eventRoute);
app.use('/api/v1/inscription', inscriptionRoute);
app.use('/api/v1/calendary', calendaryRoute);
app.use('/api/v1/listVersus', listVersusRoute);
app.use('/api/v1/sponsor', sponsorRoute);
app.use('/api/v1/gallery', galleryRoute);
app.use('/api/v1/resultsEvent', resultsEventRoute);
app.use('/api/v1/datePay', datePaymentsRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404)
  );
});

app.use(globalErrorHandler);

// Configurar eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('A client connected');

  // Escuchar evento "pagoFinalizado" desde el cliente
  socket.on('pagoFinalizado', (data) => {
    console.log('Pago finalizado:', data);
    // Realizar acciones necesarias con el pago finalizado
    // Emitir eventos de respuesta al cliente si es necesario
  });

  // Manejar evento de desconexión del cliente
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Agregar el objeto 'io' a la aplicación para que esté disponible en otros archivos
app.set('io', io);

module.exports = { app, server };
