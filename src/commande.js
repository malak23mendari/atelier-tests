const { total } = require('./panier');
const mailer = require('./mailer');

async function validerCommande(items, email) {

    if (items.length === 0) {
        throw new Error('Panier vide');
    }

    const montant = total(items);

    await mailer.envoyer(
        email,
        `Commande validée : ${montant} €`
    );

    return { montant };
}

module.exports = { validerCommande };