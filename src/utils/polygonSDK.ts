import dotenv from 'dotenv'
dotenv.config()

import { restClient } from '@polygon.io/client-js'
const rest = restClient(process.env.POLYGON_API_KEY)

export default rest
