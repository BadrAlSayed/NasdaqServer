import * as redis from 'redis'
import dotenv from 'dotenv'
dotenv.config()

const client = redis.createClient({
  url: 'redis://localhost:6379'
})

const connect = async (): Promise<void> => {
  await client.connect()

  client.on('connect', () => {
    console.log('Redis server connected succesfully.')
  })

  client.on('error', (err) => {
    throw err
  })
}

export default { client, connect }
