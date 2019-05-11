module.exports = {
    addPork: async (req, res) => {
        const { soldBy, iDate, customer, email, phone, cell_phone,
            baskets, row, slaughter, cutWrap, cure, links, bulk, fat,
            qty_other, desc_other, price_other, total, lard,
            net_weight, message } = req.body;
        const db = req.app.get('db');
        let prices = await db.pork.getPrices();
        const price_slaughter = prices[0].slaughter;
        const total_slaughter = price_slaughter * slaughter;
        const price_cut = prices[0].cut_wrap;
        const total_cut = price_cut * cutWrap;
        const price_cure = prices[0].cure;
        const total_cure = price_cure * cure;
        const price_links = prices[0].links;
        const total_links = price_links * links;
        const price_fat = prices[0].fat;
        const total_fat = price_fat * fat;
        const total_other = qty_other * price_other;
        let response = await db.pork.savePork({
            soldBy, iDate, customer, phone, cell_phone,
            email, baskets, row, slaughter, price_slaughter,
            total_slaughter, cutWrap, price_cut, total_cut,
            cure, price_cure, total_cure, links, price_links,
            total_links, bulk, fat, price_fat, total_fat,
            qty_other, desc_other, price_other, total_other,
            total, lard, net_weight, message
        })
        res.status(200).send(response);
    },
    porkPrices: async (req, res) => {
        const db = req.app.get('db');
        let prices = await db.pork.getPrices()
        res.status(200).send(prices);
    },
    porkDelete: async (req, res) => {
        let ID = req.params.ID;
        const db = req.app.get('db');
        let response = await db.pork.deletePorkInvoice({ ID });
        res.status(200).send(response)
    },
    updatePork: async (req, res) => {
        console.log('pork update')
        const {pork_id, iDate, soldBy, customer, phone,
            cellPhone, email, baskets, row, qty_slaughter,
            total_slaughter, qty_cut, total_cut, qty_cure,
            total_cure, qty_link, total_link, qty_bulk,
            qty_fat, total_fat, qty_other, desc_other,
            price_other, total_other, total, lard, 
            net_weight, message} = req.body;
        const db = req.app.get('db');
        let response = await db.pork.updatePork({pork_id, iDate, soldBy, customer, phone,
            cellPhone, email, baskets, row, qty_slaughter,
            total_slaughter, qty_cut, total_cut, qty_cure,
            total_cure, qty_link, total_link, qty_bulk,
            qty_fat, total_fat, qty_other, desc_other,
            price_other, total_other, total, lard, 
            net_weight, message})
        res.status(200).send(response)

    }

}