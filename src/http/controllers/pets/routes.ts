import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { options } from '@/lib/multer'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { create } from './create'
import { details } from './details'
import { searchByCity } from './searchByCity'

const upload = multer(options)

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJWT)

  app.post(
    '/pets',
    {
      preHandler: upload.array('petImage'),
      onRequest: verifyJWT,
    },
    create,
  )

  app.get('/pets/:id/details', details)
  app.get('/pets/byCity', searchByCity)
}
