require('dotenv').config()

const express = require('express')
const app = express()

const connectDb = require('./db/connect')
const errorHandler = require('./middleware/errorHandeller')

const cors = require('cors')

const pokemonRouter = require('./routers/pokemon')

app.use(cors({ origin: "*" }))

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use('/api/v1/pokemon', pokemonRouter)

// error handling
app.use(errorHandler)

const port = process.env.PORT || 8080
const start = async () => {
    await connectDb(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server listening to post ${port}`)
    })
}
start()