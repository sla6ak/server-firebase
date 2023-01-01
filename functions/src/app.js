const { app } = require('./config/serverConfig');

const routerWarks = require('./routers/works.routes');
const routerMain = require('./routers/mainInfo.routes');

app.use('/main', routerMain);
app.use('/works', routerWarks);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found nothing try later' });
});

module.exports = { app };
