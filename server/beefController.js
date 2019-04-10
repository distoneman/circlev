module.exports = {
    save: (req, res) => {
        const db = req.app.post('db')
        // console.log(req.params.catid)
        db.saveBeef().then(response => {
        //   console.log(response)
            res.status(200).send(response)
        })
    },
    addOne: (req,res) => {
        console.log('addOne Hit')
    },
    beefPrices: async (req, res) => {
        let animal_type = 'BEEF'
        const db = req.app.get('db');
        let prices = await db.getPrices({ animal_type });
        res.status(200).send(prices)
    }
}