// api router will mount other routers
module.exports = (app) => {
  app.get('/es/run', (req, res) => { res.send('true') });
  app.use('/es/main', require('./elastic/elastic.routes'));
};
