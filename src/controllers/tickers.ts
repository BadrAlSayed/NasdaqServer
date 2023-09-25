import rest from '../utils/polygonSDK.js'
import { Request, Response } from 'express'
import redisConnection from '../utils/redisConnection.js'

const getAllTickers = async (req: Request, res: Response) => {
  try {
    const tickers = await rest.reference.tickers({
      exchange: 'XNAS'
    })
    res.json(tickers)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

const getStockDetails = async (req: Request, res: Response) => {
  const { ticker } = req.params
  try {
    const tickers = await rest.reference.tickerDetails(ticker)
    res.json(tickers)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

const getStockPrevClose = async (req: Request, res: Response) => {
  const { ticker } = req.params
  try {
    const tickers = await rest.stocks.previousClose(ticker)
    res.json(tickers)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

const getSearchedTickers = async (req: Request, res: Response) => {
  const { ticker } = req.params
  try {
    const tickers = await rest.reference.tickers({
      exchange: 'XNAS',
      search: ticker
    })
    redisConnection.client.setEx(
      `tickers${ticker}`,
      60,
      JSON.stringify(tickers)
    )
    res.json(tickers)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default {
  getStockDetails,
  getStockPrevClose,
  getAllTickers,
  getSearchedTickers
}
