import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { Pet, PetsRepository, PAGE_LENGTH } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async findById(id: string) {
    return this.pets.find((pets) => pets.id === id) ?? null
  }

  async searchMany(query: string, page: number) {
    return this.pets
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
  }

  async create(data: Prisma.PetCreateInput) {
    const organization = data.organization as { id: string }

    const newPet = {
      id: data.id ?? randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      organization_id: organization.id,
    } as Pet

    this.pets.push(newPet)

    return newPet
  }
}
