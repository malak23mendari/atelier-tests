const { total } = require('../../src/panier');

describe('total()', () => {

    test('calcule le total du panier', () => {
        const items = [
            { prix: 10, qte: 2 },
            { prix: 5, qte: 1 }
        ];

        const resultat = total(items);

        expect(resultat).toBe(25);
    });

    test('retourne 0 pour un panier vide', () => {
        expect(total([])).toBe(0);
    });

    test('ignore une ligne dont la quantité est 0', () => {
        const items = [
            { prix: 10, qte: 0 },
            { prix: 5, qte: 2 }
        ];

        expect(total(items)).toBe(10);
    });

    test('refuse un prix négatif', () => {
        const items = [{ prix: -5, qte: 1 }];

        expect(() => total(items)).toThrow('Prix négatif');
    });

});