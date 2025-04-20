const errorHandeller = async (err, req, res, next) => {
    console.log('server error:', err.message)
    res.status(500).
        json({ success: false, msg: err.message })
}

module.exports = errorHandeller