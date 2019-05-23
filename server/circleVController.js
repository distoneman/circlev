module.exports = {
    addCircleV: async (req, res) => {
        const{ soldBy, iDate, customer, phone, cellPhone,
            email, baskets, row, qtyLine1, descLine1,
            priceLine1, totalLine1, qtyLine2, descLine2, 
            priceLine2, totalLine2, subTotal, taxAmt, total,
            amtPaid, balance, netWeight, message
        } = req.body;
        const db = req.app.get('db');
        let response = await db.circleV.saveCircleV({
            soldBy, iDate, customer, phone, cellPhone,
            email, baskets, row, qtyLine1, descLine1,
            priceLine1, totalLine1, qtyLine2, descLine2, 
            priceLine2, totalLine2, subTotal, taxAmt, total,
            amtPaid, balance, netWeight, message
        })
        res.status(200).send(response)
    }
}