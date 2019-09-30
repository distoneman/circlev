module.exports = {
    getGrindingData: async(req, res) => {
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        const db = req.app.get('db')
        let response = await db.reports.getGrinding({
            startDate, endDate
        })
        res.status(200).send(response)
    },
    
    getQtrBeefSales: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        const db = req.app.get('db')
        let response = await db.reports.qtrBeefSales({
            taxYear, taxQtr
        })
        res.status(200).send(response)
    },
    getQtrPorkSales: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        const db = req.app.get('db')
        let response = await db.reports.qtrPorkSales({
            taxYear, taxQtr
        })
        res.status(200).send(response)
    },
    getQtrSheepSales: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        const db = req.app.get('db')
        let response = await db.reports.qtrSheepSales({
            taxYear, taxQtr
        })
        res.status(200).send(response)
    },
    getQtrCircleVSales: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        const db = req.app.get('db')
        let response = await db.reports.qtrCircleVSubTotal({
            taxYear, taxQtr
        })
        res.status(200).send(response)
    },
    getQtrCircleVTax: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        const db = req.app.get('db')
        let response = await db.reports.qtrCircleVTaxAmt({
            taxYear, taxQtr
        })
        res.status(200).send(response)
    },
    getQtrInvoiceSubTotal: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        let taxExempt = req.query.taxExempt;
        const db = req.app.get('db')
        let response = await db.reports.qtrInvoiceSubTotal({
            taxYear, taxQtr, taxExempt
        })
        res.status(200).send(response)
    },
    getQtrInvoiceTax: async(req, res) => {
        let taxYear = req.query.taxYear;
        let taxQtr = req.query.taxQtr;
        const db = req.app.get('db')
        let response = await db.reports.qtrInvoiceTaxAmt({
            taxYear, taxQtr
        })
        res.status(200).send(response)
    }
}