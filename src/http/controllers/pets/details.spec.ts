import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { removeLocalFile } from '@/utils/test/remove-local-file'
import { join, resolve } from 'node:path'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const TEMP_PATH = resolve(__dirname, '..', '..', '..', '..', 'tmp')

describe('Details Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data; boundary=petForm')
      .field('name', 'Pet to get detail')
      .field('description', 'Pet description')
      .field('age', 'Pet age')
      .field('size', 'Pet size')
      .field('energyLevel', 'Pet energy level')
      .field('independenceLevel', 'Pet independence')
      .field('environment', 'Pet environment')
      .field('adoptionRequirements', 'Pet;adoption;requirements')
      .attach('petImage', join(TEMP_PATH, 'petTester.jpeg'))

    const { pet } = createPetResponse.body

    const response = await request(app.server)
      .get(`/pets/${pet.id}/details`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Pet to get detail',
        pictures: expect.any(Array),
      }),
    )

    const fileToRemove = createPetResponse.body.pet.pictures[0].key
    removeLocalFile(fileToRemove, TEMP_PATH)
  })
})
