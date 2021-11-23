// Importation du module express
const express = require('express');

// Importation du gestionnaire de route
const router = express.Router();

// Importation du contrôleur "sauces"
const sauceCtrl = require('../controllers/sauces');

// Importation du middleware pour la vérification des tokens
const auth = require('../middleware/auth');

// Importation du middleware pour la gestion des fichiers téléchargés
const multer = require('../middleware/multer-config');

// Définition des différentes routes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, sauceCtrl.likeOuDislike);

// Exportation du router "sauce" vers app.js
module.exports = router;