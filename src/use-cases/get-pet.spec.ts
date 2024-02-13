import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPicturesRepository } from '@/repositories/in-memory/in-memory-pictures-repository'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'
import { Organization } from '@/repositories/organizations-repository'
import { fakeUploadImageProps } from '@/utils/test/fake-upload-image-props'
import * as utils from '@/utils/test/random-pet-characteristics'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let picturesRepository: InMemoryPicturesRepository
let requirementsRepository: InMemoryRequirementsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let organization: Organization
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    picturesRepository = new InMemoryPicturesRepository()
    requirementsRepository = new InMemoryRequirementsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetPetUseCase(
      petsRepository,
      picturesRepository,
      requirementsRepository,
    )

    organization = await organizationsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      state: 'Example State',
      city: 'Same City',
      address: 'Same Address Street, 4321',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password_hash: '123456',
    })
  })

  it('should be able to get pet characteristics', async () => {
    await petsRepository.create({
      id: 'pet-id-01',
      name: `Pet Name`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: utils.randomPetAge(),
      size: utils.randomPetSize(),
      energy_level: utils.randomPetEnergyLevel(),
      independence_level: utils.randomPetIndependenceLevel(),
      environment: utils.randomPetEnvironment(),
      organization_id: organization.id,
    })

    await picturesRepository.createMany([
      {
        ...fakeUploadImageProps('pet-id-01'),
        pet_id: 'pet-id-01',
      },
    ])

    const { pet } = await sut.execute({
      petId: 'pet-id-01',
    })

    expect(pet.id).toBe('pet-id-01')
    expect(pet.name).toBe('Pet Name')
    expect(pet.organization_id).toEqual(expect.any(String))
    expect(pet.pictures.length).toBeGreaterThanOrEqual(1)
    expect(pet.pictures).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        url: expect.any(String),
        key: expect.any(String),
      }),
    ])
  })
})
