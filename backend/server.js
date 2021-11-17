// Charger le module HTTP
const http = require('http');

// Charger le module dotenv
require('dotenv').config();

const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Renvoyer un port valide
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// Rechercher les différentes erreurs
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " nécessite des privilèges élevés.");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " est déjà en cours d'utilisation.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Création du serveur HTTP
const server = http.createServer(app);

// Écouteur d'événements
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Démarre le serveur à l'adresse 127.0.0.1 sur le port 3000
// Affiche un message dès que le serveur commence à écouter les requêtes
server.listen(port);