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
    },
    beefInvoiceDate: async (req, res) => {
        // console.log("invoice date")
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
        // console.log('search controller')
        const soldBy = `%${req.params.soldBy}%`;
        const db = req.app.get('db');
        let response = await db.pork.searchPorkSoldBy({
            soldBy
        });
        res.status(200).send(response)
    },
    porkInvoiceDate: async (req, res) => {
        console.log('invoice date')
        let invoiceDate = req.query.invoiceDate;
        const db = req.app.get('db');
        let response = await db.pork.searchPorkDate({invoiceDate});
        res.status(2000).send(response);
    },
    porkID: async (req, res) => {
        console.log('search by ID')
    }
}