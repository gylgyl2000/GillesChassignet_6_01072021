// Importation du module express
const express = require('express');

// Importation du gestionnaire de route
const router = express.Router();

// Importation du contrôleur "utilisateur"
const userCtrl = require('../controllers/user');

// Importation du middleware pour la vérification du mot de passe
const passwordValidator = require('../middleware/password-validate');

// Définition des différentes routes
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router "utilisateur" vers app.js
module.exports = router;