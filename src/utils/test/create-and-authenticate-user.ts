import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
