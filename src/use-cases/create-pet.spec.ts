import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPicturesRepository } from '@/repositories/in-memory/in-memory-pictures-repository'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'
import { Organization } from '@/repositories/organizations-repository'
import { fakeUploadImageProps } from '@/utils/test/fake-upload-image-props'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { OneOrMorePicturesAreRequiredError } from './errors/one-or-more-pictures-are-required'

let petsRepository: InMemoryPetsRepository
let picturesRepository: InMemoryPicturesRepository
let requirementsRepository: InMemoryRequirementsRepository
let organizationRepository: InMemoryOrganizationsRepository
let organization: Organization
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    picturesRepository = new InMemoryPicturesRepository()
    requirementsRepository = new InMemoryRequirementsRepository()

    sut = new CreatePetUseCase(
      petsRepository,
      picturesRepository,
      requirementsRepository,
    )

    organization = await organizationRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      state: 'Example State',
      city: 'Same City',
      address: 'Same Address Street, 1234',
      latitude: -22.006577,
      longitude: -47.891006,
      whatsapp: '123456789',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Alfredo',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: 'Filhote',
      size: 'Médio',
      energyLevel: 'Muita energia',
      independenceLevel: 'Baixo',
      environment: 'Ambiente aberto',
      organizationId: organization.id,
      pictures: [1, 2, 3, 4].map((id) => fakeUploadImageProps(id)),
      requirements: [1, 2].map((i) => ({ value: `requirement-${i}` })),
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet without pictures', async () => {
    await expect(() =>
      sut.execute({
        name: 'Alfredo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'Filhote',
        size: 'Médio',
        energyLevel: 'Muita energia',
        independenceLevel: 'Baixo',
        environment: 'Ambiente aberto',
        organizationId: organization.id,
        pictures: [],
        requirements: [1, 2].map((i) => ({ value: `requirement-${i}` })),
      }),
    ).rejects.toBeInstanceOf(OneOrMorePicturesAreRequiredError)
  })
})
