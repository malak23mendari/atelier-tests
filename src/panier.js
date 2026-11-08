const total = (items) =>
    items.reduce((s, i) => {
        if (i.prix < 0) {
            throw new Error('Prix négatif');
        }

        return s + i.prix * i.qte;
    }, 0);

module.exports = { total };