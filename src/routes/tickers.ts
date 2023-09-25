import express from 'express'
import tickers from '../controllers/tickers.js'

const router = express.Router()

// router.get('/', tickers.getAllStocks)
router.get(
  '/:ticker/details',

  tickers.getStockDetails
)
router.get('/:ticker/prevClose', tickers.getStockPrevClose)

export default router
