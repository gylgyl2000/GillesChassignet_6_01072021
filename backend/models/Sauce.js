// Importation du paquet mongoose pour modéliser les objets MongoDB
const mongoose = require('mongoose');

// Création d'un schéma de données avec les champs pour chaque sauce
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: {type: Number, default: 0 },
    dislikes: {type: Number, default: 0 },
    usersLiked: {type: [String] },
    usersDisliked: {type: [String] },
});

// Exportation du modèle "Sauce" vers le contrôleur "sauces.js"
module.exports = mongoose.model('Sauce', sauceSchema);