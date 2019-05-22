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
        let response = await db.sheep.deleteSheepInvoice({ ID });
        res.status(200).send(response)
    },
    updateSheep: async (req, res) => {
        const { sheep_id, iDate, soldBy, customer, phone,
            cellPhone, email, baskets, row, qty_slaughter,
            total_slaughter, qty_cut, total_cut, qty_bone,
            total_bone, qty_other, desc_other, price_other,
            total_other, total, net_weight, message } = req.body;
        const db = req.app.get('db');
        let response = await db.sheep.updateSheep({
            sheep_id, iDate, soldBy, customer, phone, cellPhone, email,
            baskets, row, qty_slaughter, total_slaughter,
            qty_cut, total_cut, qty_bone, total_bone, qty_other,
            desc_other, price_other, total_other, total,
            net_weight, message
        })
        res.status(200).send(response)
    }
}
