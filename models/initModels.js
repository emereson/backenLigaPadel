// const Calendary = require('./calendary.model');
// const Event = require('./event.model');
// const GalleryImg = require('./galleryImg.model');
// const Inscription = require('./inscription.model');
// const ListVersus = require('./listVersus.model');

// const initModel = () => {
//   Event.hasMany(Inscription);
//   Inscription.belongsTo(Event);

//   Event.hasMany(GalleryImg);
//   GalleryImg.belongsTo(Event);

//   Event.hasMany(Calendary);
//   Calendary.belongsTo(Event);

//   Calendary.hasMany(ListVersus);
//   ListVersus.belongsTo(Calendary);
// };

const Calendary = require('./calendary.model');
const CalendaryImg = require('./calendaryImg.model');
const Event = require('./event.model');
const Gallery = require('./gallery.model');
const GalleryImg = require('./galleryImg.model');
const Inscription = require('./inscription.model');
const ListVersus = require('./listVersus.model');
const ListVersusImg = require('./listVersusImg.model');
const ResultsEvent = require('./resultsEvent.model');
const ResultsEventImg = require('./resultsEventImg.model');

const initModel = () => {
  Event.hasMany(Inscription);
  Inscription.belongsTo(Event);

  Calendary.hasMany(CalendaryImg, { foreignKey: 'calendaryId' });
  CalendaryImg.belongsTo(Calendary, { foreignKey: 'calendaryId' });

  ListVersus.hasMany(ListVersusImg, { foreignKey: 'listVersusId' });
  ListVersusImg.belongsTo(ListVersus, { foreignKey: 'listVersusId' });

  Gallery.hasMany(GalleryImg, { foreignKey: 'galleryId' });
  GalleryImg.belongsTo(Gallery, { foreignKey: 'galleryId' });

  ResultsEvent.hasMany(ResultsEventImg, { foreignKey: 'resultsEventId' });
  ResultsEventImg.belongsTo(ResultsEvent, { foreignKey: 'resultsEventId' });
};

module.exports = initModel;
