// api router will mount other routers
module.exports = (app) => {
  app.get('/es/run', (req, res) => { res.send('true') });
  app.use('/elastic/', require('./elastic/search.routes'));
};
