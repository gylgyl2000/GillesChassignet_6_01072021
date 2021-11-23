// Importation du paquet mongoose pour modéliser les objets MongoDB
const mongoose = require('mongoose');

// Importation du plugin qui ajoute une validation de pré-enregistrement pour les champs uniques dans un schéma Mongoose.
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma mongoose pour l'utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Validation du schema
userSchema.plugin(uniqueValidator);

// Exportation du modèle "User" vers le contrôleur "user.js"
module.exports = mongoose.model('User', userSchema);