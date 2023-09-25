import rest from '../utils/polygonSDK.js'
import { Request, Response } from 'express'

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

export default { getStockDetails, getStockPrevClose }
