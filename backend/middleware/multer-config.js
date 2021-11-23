// Chargement du middleware de téléchargement de fichiers
const multer = require('multer');

// Définition du dictionnaire pour résoudre l'extension de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

// Création de 'storage' passé à 'multer' pour enregistrer en local
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); // destination : le dossier 'images'
    },
    // Définition du nom de fichier
    filename: (req, file, callback) => {
        // Nom d'origine, remplacement des espaces par '_'
        const name = file.originalname.split(' ').join('_');
        // Utilisation des fichiers du dictionnaire comme extension
        const extension = MIME_TYPES[file.mimetype];
        // Ajout d'un timestamp et de l'extension
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation du middleware avec 'storage' et un fichier unique vers la route 'sauce.js'
module.exports = multer({ storage }).single('image');