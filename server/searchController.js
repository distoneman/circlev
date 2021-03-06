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
    },
    sheepSoldBy: async (req, res) => {
        const soldBy = `%${req.params.soldBy}%`;
        const db = req.app.get('db');
        let response = await db.sheep.searchSheepSoldBy({
            soldBy
        });
        res.status(200).send(response)
    },
    sheepInvoiceDate: async (req, res) => {
        let invoiceDate = req.query.invoiceDate;
        const db = req.app.get('db');
        let response = await db.sheep.searchSheepDate({invoiceDate});
        res.status(200).send(response);
    },
    sheepID: async (req, res) => {
        let ID = req.params.ID
        const db = req.app.get('db');
        let response = await db.sheep.searchSheepID({ID});
        res.status(200).send(response);
    },
    circleVCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        const db = req.app.get('db');
        let response = await db.circleV.searchCircleVCust({
            customer
        });
        res.status(200).send(response)
    },
    circleVSoldBy: async (req, res) => {
        const soldBy = `%${req.params.soldBy}%`;
        const db = req.app.get('db');
        let response = await db.circleV.searchCircleVSoldBy({
            soldBy
        });
        res.status(200).send(response)
    },
    circleVID: async (req, res) => {
        let ID = req.params.ID
        const db = req.app.get('db');
        let response = await db.circleV.searchCircleVID({ID});
        res.status(200).send(response);
    },
    circleVInvoiceDate: async (req, res) => {
        let invoiceDate = req.query.invoiceDate;
        const db = req.app.get('db');
        let response = await db.circleV.searchCircleVDate({invoiceDate});
        res.status(200).send(response);
    },
    invoiceCustomer: async (req, res) => {
        let customer = `%${req.params.customer}%`;
        const db = req.app.get('db');
        let response = await db.invoice.searchInvoiceCust({
            customer
        });
        res.status(200).send(response)
    },
    invoiceSoldBy: async (req, res) => {
        const soldBy = `%${req.params.soldBy}%`;
        const db = req.app.get('db');
        let response = await db.invoice.searchInvoiceSoldBy({
            soldBy
        });
        res.status(200).send(response)
    },
    invoiceInvoiceDate: async (req, res) => {
        let invoiceDate = req.query.invoiceDate;
        const db = req.app.get('db');
        let response = await db.invoice.searchInvoiceDate({invoiceDate});
        res.status(200).send(response);
    },
    invoiceID: async (req, res) => {
        let ID = req.params.ID
        const db = req.app.get('db');
        let response = await db.invoice.searchInvoiceID({ID});
        res.status(200).send(response);
    }
}