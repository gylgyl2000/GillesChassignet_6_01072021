// Importation du paquet pour créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Chargement du module dotenv
require('dotenv').config();

module.exports = (req, res, next) => {
    // Utilisation de 'try...catch' pour éviter des problèmes
    try {
        // Extraction du token du header authorization en retirant 'Bearer'
        const token = req.headers.authorization.split(' ')[1];
        // Décodage du token avec la fonction 'verify'
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        // Extraction de l'ID
        const userId = decodedToken.userId;
        // Comparaison
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Requête non autorisée !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non autorisée !' });
    }
};