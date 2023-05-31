require('dotenv').config();
const { app, server, io } = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');

db.authenticate()
  .then(() => console.log('Database Authenticated! 😼'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => {
    console.log('Database Synced! 🤩');

    // Implementación de Socket.IO
    io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado');

      // Escucha el evento 'disconnect' cuando un cliente se desconecta
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });

    const port = +process.env.PORT || 3020;
    server.listen(port, () => {
      console.log(`App Running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
