module.exports = {
    addBeef: async (req, res) => {

    },
    porkPrices: async (req, res) => {
        const db = req.app.get('db');
        let prices = await db.pork.getPrices()
        res.status(200).send(prices);
    }
}