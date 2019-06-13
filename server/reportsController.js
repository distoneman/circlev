module.exports = {
    getGrindingData: async(req, res) => {
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        const db = req.app.get('db')
        let response = await db.reports.getGrinding({
            startDate, endDate
        })
        res.status(200).send(response)
    }
}