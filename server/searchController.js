module.exports = {
    beefCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        const db = req.app.get('db');
        let response = await db.beef.searchBeefCust({
            customer
        })
        res.status(200).send(response)
    },
    beefSoldBy: async (req,res) => {
        let soldBy = `%${req.params.soldBy}%`;
        const db = req.app.get('db');
        let response = await db.beef.searchBeefSoldBy({
            soldBy
        })
        res.status(200).send(response)
    },
    beefID: async (req, res) => {
        let ID = req.params.ID
        const db = req.app.get('db');
        let response = await db.beef.searchBeefID({ID});
        res.status(200).send(response)
    },
    beefInvoiceDate: async (req, res) => {
        let invoiceDate = req.query.invoiceDate;
        const db = req.app.get('db');
        let response = await db.beef.searchBeefDate({invoiceDate});
        res.status(200).send(response)
    },
    porkCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        const db = req.app.get('db');
        let response = await db.pork.searchPorkCust({
            customer
        });
        res.status(200).send(response)
    },
    porkSoldBy: async (req, res) => {
        const soldBy = `%${req.params.soldBy}%`;
        const db = req.app.get('db');
        let response = await db.pork.searchPorkSoldBy({
            soldBy
        });
        res.status(200).send(response)
    },
    porkInvoiceDate: async (req, res) => {
        let invoiceDate = req.query.invoiceDate;
        const db = req.app.get('db');
        let response = await db.pork.searchPorkDate({invoiceDate});
        res.status(200).send(response);
    },
    porkID: async (req, res) => {
        let ID = req.params.ID
        const db = req.app.get('db');
        let response = await db.pork.searchPorkID({ID});
        res.status(200).send(response);
    },
    sheepCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        const db = req.app.get('db');
        let response = await db.sheep.searchSheepCust({
            customer
        });
        res.status(200).send(response)
    }
}