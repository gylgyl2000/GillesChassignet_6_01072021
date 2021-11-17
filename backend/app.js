// Importation du module express
const express = require('express');

// Importation du middleware 'helmet' pour sécuriser l'application Express
const helmet = require('helmet');

// Charger l'outil 'mongoose' pour modéliser les données
const mongoose = require('mongoose');

// Charger le module path
// (fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires).
const path = require('path');

// Charger le module 'dotenv' pour charger les variables d'environnement
require('dotenv').config();

// Charger les routes 'sauce' et 'user'
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connection à la base MongoDB
mongoose.connect(process.env.MONGO,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Initialiser Express et ses fonctionnalités
const app = express();

// CORS
app.use((req, res, next) => {
  // Permettre d'accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Permettre d'ajouter les headers aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Permettre d'envoyer des requêtes avec les méthodes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Charger 'helmet' dans l'application
app.use(helmet());

// Charger la méthode express.json() pour l'analyse
app.use(express.json());

// Charger la fonction middleware du dossier 'image' monté sur le chemin d'accès absolu '/image'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Charger la fonction middleware 'sauceRoutes' monté sur le chemin '/api/sauces'
app.use('/api/sauces', sauceRoutes);

// Charger la fonction middleware 'userRoutes' monté sur le chemin '/api/auth'
app.use('/api/auth', userRoutes);

// Exportation de 'app', déclaré dans server.js
module.exports = app;