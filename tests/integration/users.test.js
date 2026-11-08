const request = require('supertest');

const app = require('../../src/app');

const db = require('../../src/db');

// Préparer la base avant chaque test
beforeEach(async () => {

    await db.query('DROP TABLE IF EXISTS users');

    await db.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            nom TEXT NOT NULL
        )
    `);

    await db.query(
        "INSERT INTO users (nom) VALUES ('Alice')"
    );

});

// Fermer la connexion à la fin
afterAll(async () => {
    await db.end();
});

describe('GET /users/:id', () => {

    test("retourne 200 et l'utilisateur existant", async () => {

        const res = await request(app).get('/users/1');

        expect(res.status).toBe(200);
        expect(res.body.nom).toBe('Alice');

    });

    test('retourne 404 pour un utilisateur inconnu', async () => {

        const res = await request(app).get('/users/999');

        expect(res.status).toBe(404);

    });

    test('retourne 400 pour un identifiant invalide', async () => {

        const res = await request(app).get('/users/abc');

        expect(res.status).toBe(400);

    });

    test("résiste à une tentative d'injection SQL", async () => {

        const attaque = encodeURIComponent(
            '1; DROP TABLE users;--'
        );

        const res = await request(app).get(
            '/users/' + attaque
        );

        expect(res.status).toBe(400);

        const { rows } = await db.query(
            'SELECT count(*) FROM users'
        );

        expect(Number(rows[0].count)).toBe(1);

    });

});