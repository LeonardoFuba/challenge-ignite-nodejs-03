import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { removeLocalFile } from '@/utils/test/remove-local-file'
import { join, resolve } from 'node:path'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const TEMP_PATH = resolve(__dirname, '..', '..', '..', '..', 'tmp')

describe('Create Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data; boundary=petForm')
      .field('name', 'Pet name')
      .field('description', 'Pet description')
      .field('age', 'Pet age')
      .field('size', 'Pet size')
      .field('energyLevel', 'Pet energy level')
      .field('independenceLevel', 'Pet independence')
      .field('environment', 'Pet environment')
      .field('adoptionRequirements', 'Pet;adoption;requirements')
      .attach('petImage', join(TEMP_PATH, 'petTester.jpeg'))

    expect(response.statusCode).toEqual(201)

    const fileToRemove = response.body.pet.pictures[0].key
    removeLocalFile(fileToRemove, TEMP_PATH)
  })

  it('should not be able to create a pet without authenticate', async () => {
    const response = await request(app.server)
      .post('/pets')
      .set('Content-Type', 'multipart/form-data; boundary=petForm')
      .field('name', 'Pet name')

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual({
      message: 'Unauthorized',
    })
  })
})
