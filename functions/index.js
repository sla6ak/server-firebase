const functions = require('firebase-functions');
const { app } = require('./src/app');

// запуск сервера по докам firebase
exports.myApp = functions.https.onRequest(app);

// код для разработки
// const { PORT = 5000 } = process.env;
// async function start() {
//     try {
//         app.listen(PORT, () => {
//             console.log(`Use port ${PORT}`);

//         });
//     } catch (error) {
//         console.log(error.massage);
//         process.exit(1);
//     }
// }
// start();
