import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
