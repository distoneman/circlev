module.exports = {
    addSheep: async (req, res) => {
        const { soldBy, iDate, customer, email, phone, cell_phone,
            baskets, row, slaughter, cutWrap, bone_roll, qty_other,
            desc_other, price_other, total, net_weight,
            message } = req.body;
        console.log(req.body)
    },
    sheepPrices: async (req, res) => {
        const db = req.app.get('db');
        let prices = await db.sheep.getPrices();
        res.status(200).send(prices);
    }
}
