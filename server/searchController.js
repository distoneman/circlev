module.exports = {
    beefCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        console.log(customer)
        const db = req.app.get('db');
        let response = await db.search.customer({
            customer
        })
        res.status(200).send(response)
    }
}