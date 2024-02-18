import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345000',
      state: 'SP',
      city: 'Same City',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '16912344678',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
