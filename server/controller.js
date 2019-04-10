module.exports = {
    getAllTest: (req, res) => {
        const db = req.app.get('db')
        // console.log(req.params.catid)
        db.getAll().then(response => {
        //   console.log(response)
            res.status(200).send(response)
        })
    }
}