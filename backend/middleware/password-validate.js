
// Importation du schéma de validation
const passwordSchema = require('../models/Password');

// Validation du mot de passe
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        return res.status(400)
        .json({ message: 'Le mot de passe doit comporter au minimum 8 caractères, 1 majuscule, 1 minuscule, 2 chiffres et sans espace.'});
    }
    else { 
        next(); 
    }
}