const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');

const firebaseConfig = {
    apiKey: 'AIzaSyBw_HTNM4A3MWfdIoniscFzReNmfuznh1A',
    authDomain: 'server-580ab.firebaseapp.com',
    databaseURL: 'https://server-580ab-default-rtdb.firebaseio.com',
    projectId: 'server-580ab',
    storageBucket: 'server-580ab.appspot.com',
    messagingSenderId: '350673018580',
    appId: '1:350673018580:web:0d23042e7360f14eef6541',
    measurementId: 'G-3K642TDV2K',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

module.exports = { firebaseApp, db };
