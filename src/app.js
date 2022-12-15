const { app, webSocketServer, server } = require('./config/serverConfig');
// const path = require('path');

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

webSocketServer.on('connection', async () => {});

module.exports = { app, server };
