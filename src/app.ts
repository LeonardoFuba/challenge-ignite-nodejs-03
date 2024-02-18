import { fastifyCookie } from '@fastify/cookie'
import { fastifyJwt } from '@fastify/jwt'
import { fastifyStatic } from '@fastify/static'
import fastify from 'fastify'
import { contentParser } from 'fastify-multer'
import { ZodError } from 'zod'
import { env } from './env'

import { organizationsRoutes } from '@/http/controllers/organizations/routes'
import { petsRoutes } from '@/http/controllers/pets/routes'
import path from 'path'

export const app = fastify()
app.get('/healthz', () => ({ message: 'Server online' }))

/* file upload plugin */
app.register(contentParser)

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

/* http routes */
app.register(petsRoutes)
app.register(organizationsRoutes)

/* static routes */
app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'tmp'),
  prefix: '/images/',
})

/* error handler */
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
