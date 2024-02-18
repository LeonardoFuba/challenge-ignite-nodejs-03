import { app } from '@/app'
import { Organization } from '@/repositories/organizations-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let organization: Organization
let petsRepository: PrismaPetsRepository
let organizationsRepository: PrismaOrganizationsRepository

describe('Search Pet By City Controller (e2e)', () => {
  beforeAll(async () => {
    petsRepository = new PrismaPetsRepository()
    organizationsRepository = new PrismaOrganizationsRepository()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets in a city', async () => {
    for (let i = 1; i <= 4; i++) {
      organization = await organizationsRepository.create({
        responsible_name: `John Doe ${i}`,
        email: `johndoe@example.com ${i}`,
        cep: '12345-000',
        state: 'Example State',
        city: `City-${i}`,
        address: `Same Address Street,  ${i}`,
        latitude: -21.156981,
        longitude: -47.969802,
        whatsapp: `12345678 ${i}`,
        password_hash: `1234${i}`,
      })

      await petsRepository.create({
        name: `Pet Name ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: `Age ${i}`,
        size: `Size ${i}`,
        energy_level: `Energy ${i}`,
        independence_level: `${i}`,
        environment: `Environment type ${i}`,
        organization_id: organization.id,
      })
    }
    const response = await request(app.server)
      .get('/pets/byCity')
      .query({
        page: 1,
        city: 'City-2',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        age: expect.any(String),
        energy_level: expect.any(String),
        independence_level: expect.any(String),
      }),
    ])
  })
})
