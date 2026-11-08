const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

app.use(express.static('public'));

// Route pour rechercher un utilisateur
app.get('/users/:id', async (req, res) => {

    const id = Number(req.params.id);

    // Vérifier l'identifiant
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            erreur: 'id invalide'
        });
    }

    try {
        const { rows } = await db.query(
            'SELECT id, nom FROM users WHERE id = $1',
            [id]
        );

        // Utilisateur inexistant
        if (!rows[0]) {
            return res.status(404).json({
                erreur: 'introuvable'
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erreur: 'Erreur serveur'
        });
    }
});

module.exports = app;