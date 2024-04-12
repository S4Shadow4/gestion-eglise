  const benevoleRoute = require('./routes/benevoleRoute');
  const fideleRoute = require('./routes/fideleRoute');
  const gerantRoutes = require('./routes/gerantRoute'); 
  const addEvenementRoute = require('./routes/addEvenementRoute');
  const addBenevolatRoute = require('./routes/addBenevolatRoute');
  const benevolatRoute = require('./routes/benevolatRoute');
  const reservationRoute = require('./routes/reservationRoute');
  const addFideleRoute = require('./routes/addFideleRoute');

  const express = require('express');
  const cors = require('cors');

  const app = express();

  app.use(cors());
  app.use(express.json()); 

  app.use('/benevole', benevoleRoute);
  app.use('/fidele', fideleRoute);
  app.use('/gerant', gerantRoutes);
  app.use('/addEvenement', addEvenementRoute);
  app.use('/addBenevolat', addBenevolatRoute);
  app.use('/benevolat', benevolatRoute);
   app.use('/reservation', reservationRoute);
   app.use('/addFidele', addFideleRoute);


  // Démarrer le serveur
  app.listen(5000, () => {  
    console.log('Welcome to my server');
  });
  