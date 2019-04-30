module.exports = {
    beefCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        // console.log(customer)
        const db = req.app.get('db');
        let response = await db.beef.searchBeefCust({
            customer
        })
        res.status(200).send(response)
    },
    beefSoldBy: async (req,res) => {
        // console.log("beef sold by")
        let soldBy = `%${req.params.soldBy}%`;
        // console.log(soldBy)
        const db = req.app.get('db');
        let response = await db.beef.searchBeefSoldBy({
            soldBy
        })
        res.status(200).send(response)
    },
    beefID: async (req, res) => {
        // console.log("beefID")
        // console.log(req.params.ID)
        let ID = req.params.ID
        const db = req.app.get('db');
        let response = await db.beef.searchBeefID({ID});
        res.status(200).send(response)
    }
}