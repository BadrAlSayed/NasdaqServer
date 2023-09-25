import { Response, Request, NextFunction } from 'express'
import redisConnection from '../utils/redisConnection.js'

const redisMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ticker } = req.params
  try {
    const redis = redisConnection.client
    const cachedData = await redis.get(`tickers${ticker}`)
    if (cachedData !== null) {
      res.send(JSON.parse(cachedData))
    } else {
      next()
    }
  } catch (error) {
    res.send(error)
  }
}
export default redisMiddleware
