import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { Organization } from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let organization: Organization
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Alfredo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      age: 'Filhote',
      size: 'Médio',
      energyLevel: 'Muita energia',
      independenceLevel: 'Baixo',
      environment: 'Ambiente aberto',
      organizationId: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
