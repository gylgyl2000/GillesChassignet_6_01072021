// Importation de la bibliothèque 'password-validator'
const passwordValidator = require('password-validator');

// Creation du schema
const passwordSchema = new passwordValidator();

// Ajouter des propriétés
passwordSchema
.is().min(8) // Longueur minimale 8
.is().max(100) // Longueur maximale 100
.has().uppercase() // Doit avoir des lettres majuscules
.has().lowercase() // Doit avoir des lettres minuscules
.has().digits(2) // Doit avoir au moins 2 chiffres
.has().not().spaces() // Ne doit pas avoir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123', 'Azerty123']); // Liste noire

// Exportation du schéma de validation vers le middleware "password-validate"
module.exports = passwordSchema;