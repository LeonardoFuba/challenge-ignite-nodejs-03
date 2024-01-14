import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { CityIsRequiredError } from './errors/city-is-required-error'
import { Organization } from '@/repositories/organizations-repository'
import {
  randomPetAge,
  randomPetEnergyLevel,
  randomPetEnvironment,
  randomPetIndependenceLevel,
  randomPetSize,
} from '@/utils/test/random-pet-characteristics'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: FetchPetsByCityUseCase
let organization: Organization

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository, organizationsRepository)

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

  it('should be able to fetch pets in a city', async () => {
    for (let i = 1; i <= 4; i++) {
      await organizationsRepository.create({
        responsible_name: `John Doe ${i}`,
        email: `johndoe@example.com ${i}`,
        cep: '12345-000',
        state: 'Example State',
        city: 'Other City',
        address: `Same Address Street,  ${i}`,
        latitude: -21.156981,
        longitude: -47.969802,
        whatsapp: `12345678 ${i}`,
        password_hash: `1234${i}`,
      })
    }

    await petsRepository.create({
      name: 'Alfredo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      age: 'Filhote',
      size: 'Médio',
      energy_level: 'Muita energia',
      independence_level: 'Baixo',
      environment: 'Ambiente aberto',
      organizationId: organization.id,
    })

    const { pets } = await sut.execute({
      city: 'Same City',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should not be able to fetch pets without inform a city', async () => {
    await petsRepository.create({
      name: 'Alfredo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      age: 'Filhote',
      size: 'Médio',
      energy_level: 'Muita energia',
      independence_level: 'Baixo',
      environment: 'Ambiente aberto',
      organizationId: organization.id,
    })

    await expect(() =>
      sut.execute({ page: 1 } as never),
    ).rejects.toBeInstanceOf(CityIsRequiredError)
  })

  it('should be able to fetch pets in a city filtering an age', async () => {
    for (let i = 1; i <= 30; i++) {
      await petsRepository.create({
        name: `Name ${i}`,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        age: randomPetAge(),
        size: randomPetSize(),
        energy_level: randomPetEnergyLevel(),
        independence_level: randomPetIndependenceLevel(),
        environment: randomPetEnvironment(),
        organizationId: organization.id,
      })
    }

    const ageToSearch = randomPetAge()

    const { pets } = await sut.execute({
      city: 'Same City',
      age: ageToSearch,
      page: 1,
    })

    pets.forEach((pet) =>
      expect(pet).toEqual(expect.objectContaining({ age: ageToSearch })),
    )
  })
  it('should be able to fetch pets in a city filtering an energyLevel', async () => {
    for (let i = 1; i <= 30; i++) {
      await petsRepository.create({
        name: `Name ${i}`,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        age: randomPetAge(),
        size: randomPetSize(),
        energy_level: randomPetEnergyLevel(),
        independence_level: randomPetIndependenceLevel(),
        environment: randomPetEnvironment(),
        organizationId: organization.id,
      })
    }

    const energyLevelToSearch = randomPetEnergyLevel()

    const { pets } = await sut.execute({
      city: 'Same City',
      energyLevel: energyLevelToSearch,
      page: 1,
    })

    pets.forEach((pet) =>
      expect(pet).toEqual(
        expect.objectContaining({ energy_level: energyLevelToSearch }),
      ),
    )
  })
  it('should be able to fetch pets in a city filtering an independenceLevel', async () => {
    for (let i = 1; i <= 30; i++) {
      await petsRepository.create({
        name: `Name ${i}`,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        age: randomPetAge(),
        size: randomPetSize(),
        energy_level: randomPetEnergyLevel(),
        independence_level: randomPetIndependenceLevel(),
        environment: randomPetEnvironment(),
        organizationId: organization.id,
      })
    }

    const independenceLevelToSearch = randomPetIndependenceLevel()

    const { pets } = await sut.execute({
      city: 'Same City',
      independenceLevel: independenceLevelToSearch,
      page: 1,
    })

    pets.forEach((pet) =>
      expect(pet).toEqual(
        expect.objectContaining({
          independence_level: independenceLevelToSearch,
        }),
      ),
    )
  })
  it('should be able to fetch pets in a city filtering a size', async () => {
    for (let i = 1; i <= 30; i++) {
      await petsRepository.create({
        name: `Name ${i}`,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        age: randomPetAge(),
        size: randomPetSize(),
        energy_level: randomPetEnergyLevel(),
        independence_level: randomPetIndependenceLevel(),
        environment: randomPetEnvironment(),
        organizationId: organization.id,
      })
    }

    const sizeToSearch = randomPetSize()

    const { pets } = await sut.execute({
      city: 'Same City',
      size: sizeToSearch,
      page: 1,
    })

    pets.forEach((pet) =>
      expect(pet).toEqual(
        expect.objectContaining({
          size: sizeToSearch,
        }),
      ),
    )
  })
})
