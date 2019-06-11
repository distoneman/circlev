module.exports = {
    addInvoice: async (req, res) => {
        const {iDate, soldBy, customer, memo, taxExempt,
            taxIdNum, poNum, phone, cellPhone, email, 
            location, qtyLine1, descLine1, priceLine1,
            totalLine1, qtyLine2, descLine2, priceLine2,
            totalLine2, qtyLine3, descLine3, priceLine3,
            totalLine3, qtyLine4, descLine4, priceLine4,
            totalLine4, qtyLine5, descLine5, priceLine5,
            totalLine5, qtyLine6, descLine6, priceLine6,
            totalLine6, qtyLine7, descLine7, priceLine7,
            totalLine7, qtyLine8, descLine8, priceLine8,
            totalLine8, qtyLine9, descLine9, priceLine9,
            totalLine9, qtyLine10, descLine10, priceLine10,
            totalLine10, subTotal, taxAmt, total
        } = req.body
        const db = req.app.get('db');
        let response = await db.invoice.saveInvoice({
            iDate, soldBy, customer, memo, taxExempt,
            taxIdNum, poNum, phone, cellPhone, email, 
            location, qtyLine1, descLine1, priceLine1,
            totalLine1, qtyLine2, descLine2, priceLine2,
            totalLine2, qtyLine3, descLine3, priceLine3,
            totalLine3, qtyLine4, descLine4, priceLine4,
            totalLine4, qtyLine5, descLine5, priceLine5,
            totalLine5, qtyLine6, descLine6, priceLine6,
            totalLine6, qtyLine7, descLine7, priceLine7,
            totalLine7, qtyLine8, descLine8, priceLine8,
            totalLine8, qtyLine9, descLine9, priceLine9,
            totalLine9, qtyLine10, descLine10, priceLine10,
            totalLine10, subTotal, taxAmt, total
        });
        res.status(200).send(response)
    },
    invoiceDelete: async (req, res) => {
        let ID = req.params.ID;
        const db = req.app.get('db');
        let response = await db.invoice.deleteInvoiceInvoice({ ID });
        res.status(200).send(response)
    },
    updateInvoice: async (req, res) => {
        // console.log(req.body)
        const {invoiceId, iDate, soldBy, customer, memo, taxExempt,
            taxIdNum, poNum, phone, cellPhone, email, 
            location, qtyLine1, descLine1, priceLine1,
            totalLine1, qtyLine2, descLine2, priceLine2,
            totalLine2, qtyLine3, descLine3, priceLine3,
            totalLine3, qtyLine4, descLine4, priceLine4,
            totalLine4, qtyLine5, descLine5, priceLine5,
            totalLine5, qtyLine6, descLine6, priceLine6,
            totalLine6, qtyLine7, descLine7, priceLine7,
            totalLine7, qtyLine8, descLine8, priceLine8,
            totalLine8, qtyLine9, descLine9, priceLine9,
            totalLine9, qtyLine10, descLine10, priceLine10,
            totalLine10, subTotal, taxAmt, total
        } = req.body
        const db = req.app.get('db');
        let response = await db.invoice.updateInvoice({
            invoiceId, iDate, soldBy, customer, memo, taxExempt,
            taxIdNum, poNum, phone, cellPhone, email, 
            location, qtyLine1, descLine1, priceLine1,
            totalLine1, qtyLine2, descLine2, priceLine2,
            totalLine2, qtyLine3, descLine3, priceLine3,
            totalLine3, qtyLine4, descLine4, priceLine4,
            totalLine4, qtyLine5, descLine5, priceLine5,
            totalLine5, qtyLine6, descLine6, priceLine6,
            totalLine6, qtyLine7, descLine7, priceLine7,
            totalLine7, qtyLine8, descLine8, priceLine8,
            totalLine8, qtyLine9, descLine9, priceLine9,
            totalLine9, qtyLine10, descLine10, priceLine10,
            totalLine10, subTotal, taxAmt, total
        })
        res.status(200).send(response)
    }

}