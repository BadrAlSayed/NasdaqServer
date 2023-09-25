import express from 'express'
import tickers from '../controllers/tickers.js'
import redisCache from '../middleware/redisCache.js'
const router = express.Router()

router.get('/', tickers.getAllTickers)
router.get(
  '/:ticker/details',

  tickers.getStockDetails
)
router.get('/:ticker/prevClose', tickers.getStockPrevClose)
router.get('/search/:ticker', redisCache, tickers.getSearchedTickers)

export default router
