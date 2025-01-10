import path from 'node:path'
import { expressMiddleware } from '@apollo/server/express4'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { Sequelize } from 'sequelize'
import { createApolloServer } from './apollo'
import { BybKernel } from './config/BybKernel'
import config from './config/env'

const sequelizeInstance = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './database/database.sqlite'),
})

// Allows to apply middleware on graphql resolvers
// e.g check user session or authentication token validation
// forward the authentication user data to resolvers as a context
// for resolver access restrictions
const createContextMiddleware = ({ req, res }: { req: Request; res: Response }) => {
  return { req, res }
}

async function bootstrap() {
  // configure application kernel
  const kernel = new BybKernel(sequelizeInstance)
  kernel.configure()

  // configure graphql server
  const apolloServer = createApolloServer(kernel)
  await apolloServer.start()

  // create express.js app instance
  const app = express()
  const port = config.port || 3000

  // apply basic API middlewares
  app.use(bodyParser.json())
  app.use(bodyParser.text({ type: 'application/graphql' }))
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: '50mb',
      extended: true,
    }),
  )
  app.use(cors())

  // mount graphql endpoint
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      // @ts-ignore
      context: createContextMiddleware,
    }),
  )

  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!')
  })

  // startup http server
  app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.env} mode.`)
  })
}

bootstrap()
