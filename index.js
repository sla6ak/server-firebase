const { server } = require('./src/app');

const { PORT = 5000 } = process.env;

async function start() {
    try {
        server.listen(PORT, () => {
            console.log(`Use port ${PORT}`);
        });
    } catch (error) {
        console.log('описание ошибки:', error.massage);
        process.exit(1);
    }
}

start();
