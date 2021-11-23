// Importation du paquet de chiffrement
const bcrypt = require('bcrypt');

// Importation du paquet pour créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Charger le module dotenv
require('dotenv').config();

// Importation du modèle "User"
const User = require('../models/User');

// Exportation de la fonction "signup" - Création compte utilisateur
exports.signup = (req, res, next) => {
    // Hachage du mot de passe et salage 10 fois
    bcrypt
        .hash(req.body.password, 10)
        // Réception du hash généré
        .then(hash => {
            // Création de l'utilisateur
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Enregistrement de l'utilisateur dans la base
            user
                .save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(() => res.status(400).json({ message: 'Email déjà utilisé' }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Exportation de la fonction "login" - Connexion
exports.login = (req, res, next) => {
    // Vérification de l'existence de l'utilisateur dans la base
    User.findOne({ email: req.body.email })
    .then(userFind => {
        // Envoi d'une erreur si non présent
        if (!userFind) {
            res.statusCode = 401;
            res.statusMessage = 'Cet utilisateur n\'existe pas !';
            res.end();
            return;
        }
        // Comparaison du mot de passe
        bcrypt
        .compare(req.body.password, userFind.password)
        .then(pwValid => {
            // Envoi d'une erreur si différent
            if (!pwValid) {
                res.statusCode = 401;
                res.statusMessage = 'Mot de passe incorrect !';
                res.end();
                return;
            }
            // Envoi d'une réponse avec l'ID et le token
            res.status(200).json({
                userId: userFind._id,
                token: jwt.sign(
                    { userId: userFind._id },
                    process.env.TOKEN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
