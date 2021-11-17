const express = require('express');

// Importation du gestionnaire de route
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, sauceCtrl.likeOuDislike);

module.exports = router;