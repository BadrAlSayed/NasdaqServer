import express, { Request, Response } from 'express'

import cors from 'cors'
import redisConnection from './utils/redisConnection.js'
import tickers from './routes/tickers.js'

const app = express()

const port = process.env.PORT || '5000'
app.use(cors())
app.use(express.json())

app.use('/tickers', tickers)

redisConnection.connect()
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
})
