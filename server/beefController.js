module.exports = {
    addBeef: async (req, res) => {
        // console.log(req.body)
        const animal_type = 'BEEF';
        const {soldBy, iDate, customer, phone, cell_phone, 
            email, baskets, row, slaughter, cutWrap, 
            patties, brand, qty_other, desc_other,
            price_other, total, net_weight,
            message} = req.body;
        const db = req.app.get('db');
        let prices = await db.beef.getPrices({ animal_type });
        const price_slaughter = prices[0].slaughter;
        const total_slaughter = price_slaughter * slaughter;
        const price_cut = prices[0].cut_wrap;
        const total_cut = price_cut * cutWrap;
        const price_patties = prices[0].patties;
        const total_patties = price_patties * patties;
        const price_brand = prices[0].brand;
        const total_brand = price_brand * brand;
        const total_other = qty_other * price_other;
        let response = await db.beef.saveBeef({
            soldBy, iDate, customer, phone, cell_phone,
            email, baskets, row, 
            slaughter, price_slaughter, total_slaughter,
            cutWrap, price_cut, total_cut,
            patties, price_patties, total_patties,
            brand, price_brand, total_brand,
            qty_other, desc_other, price_other, 
            total_other, total, net_weight, message
        });
        res.status(200).send(response);
    },
    beefPrices: async (req, res) => {
        const animal_type = 'BEEF'
        // console.log("prices hit")
        const db = req.app.get('db');
        let prices = await db.beef.getPrices({ animal_type });
        res.status(200).send(prices)
    },
    beefDelete: async(req, res) => {
        // console.log(req.params.ID);
        let ID = req.params.ID;
        const db = req.app.get('db');
        let response = await db.beef.deleteBeefInvoice({ID});
        res.status(200).send(response)
    },
    beefUpdate: async (req, res) => {
        const {beef_id, iDate, customer, soldBy, phone, cell_phone, email, 
            baskets, row, slaughter, total_slaughter, cutWrap, total_cut, 
            qty_patties, total_patties, brand, total_brand, qty_other, desc_other, 
            price_other, total_other, total, net_weight, message} = req.body;
        const db = req.app.get('db');
        let response = await db.beef.updateBeef({beef_id, iDate, customer,
            soldBy, phone, cell_phone, email, baskets, row, slaughter, 
            total_slaughter, cutWrap, total_cut, qty_patties, 
            total_patties, brand, total_brand, qty_other, desc_other, 
            price_other, total_other, total, net_weight, message})
        res.status(200).send(response)
    },
    updatePrices: async (req, res) => {
        const {slaughter, cutWrap, patties, brand} = req.body;
        const db = req.app.get('db');
        let response = await db.beef.updatePrices({slaughter, cutWrap,
            patties, brand})
        res.status(200).send(response)
    }
}