module.exports = {
    addSheep: async (req, res) => {
        const { soldBy, iDate, customer, email, phone, cellPhone,
            baskets, row, slaughter, priceSlaughter, cutWrap, 
            priceCutWrap, boneRoll, priceBone, qtyOther,
            descOther, priceOther, otherTotal, total, netWeight,
            message, slaughterTotal, cutWrapTotal, boneTotal
            } = req.body;
        // console.log(req.body)
        const db = req.app.get('db');
        let response = await db.sheep.saveSheep({
            soldBy, iDate, customer, email, phone, cellPhone,
            baskets, row, slaughter, priceSlaughter, cutWrap, 
            priceCutWrap, boneRoll, priceBone, qtyOther,
            descOther, priceOther, otherTotal, total, netWeight,
            message, slaughterTotal, cutWrapTotal, boneTotal
        })
        res.status(200).send(response);
    },
    sheepPrices: async (req, res) => {
        const db = req.app.get('db');
        let prices = await db.sheep.getPrices();
        res.status(200).send(prices);
    },
    sheepDelete: async (req, res) => {
        let ID = req.params.ID;
        const db = req.app.get('db');
        let response = await db.sheep.deleteSheepInvoice({ID});
        res.status(200).send(response)
    }
}
