import rest from '../utils/polygonSDK.js'
import { Request, Response } from 'express'
import redisConnection from '../utils/redisConnection.js'

const getAllTickers = async (req: Request, res: Response) => {
  rest.reference
    .tickers({ exchange: 'XNAS', market: 'stocks' })
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      res.status(404).json(e)
    })
}

const getStockDetails = async (req: Request, res: Response) => {
  const { ticker } = req.params

  rest.reference
    .tickerDetails(ticker)
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      res.status(404).json(e)
    })
}

const getStockPrevClose = async (req: Request, res: Response) => {
  const { ticker } = req.params

  rest.stocks
    .previousClose(ticker)
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      res.status(404).json(e)
    })
}

const getSearchedTickers = async (req: Request, res: Response) => {
  const { ticker } = req.params

  rest.reference
    .tickers({ exchange: 'XNAS', search: ticker })
    .then((data) => {
      redisConnection.client.setEx(`tickers${ticker}`, 60, JSON.stringify(data))
      res.json(data)
    })
    .catch((e) => {
      res.status(404).json(e)
    })
}

export default {
  getStockDetails,
  getStockPrevClose,
  getAllTickers,
  getSearchedTickers
}
