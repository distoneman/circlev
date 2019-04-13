module.exports = {
    addBeef: async (req, res) => {
        // console.log(req.body)
        const animal_type = 'BEEF';
        const {soldBy, date, customer, phone, baskets,
            row, slaughter, cutWrap, patties, brand} = req.body;
        const db = req.app.get('db')
        let prices = await db.getPrices({ animal_type });
        const price_slaughter = prices[0].slaughter;
        const total_slaughter = price_slaughter * slaughter;
        const price_cut = prices[0].cut_wrap;
        const total_cut = price_cut * cutWrap;
        const price_patties = prices[0].patties;
        const total_patties = price_patties * patties;
        console.log(price_slaughter)
        let response = await db.saveBeef({
            soldBy, date, customer, phone, baskets, row, 
            slaughter, price_slaughter, total_slaughter,
            cutWrap, price_cut, total_cut,
            patties, price_patties, total_patties,
            brand
        });
        res.status(200).send(response);
    },
    beefPrices: async (req, res) => {
        const animal_type = 'BEEF'
        // console.log("prices hit")
        const db = req.app.get('db');
        let prices = await db.getPrices({ animal_type });
        res.status(200).send(prices)
    }
}