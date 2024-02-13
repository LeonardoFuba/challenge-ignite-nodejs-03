import { randomUUID } from 'crypto'
import {
  Characteristics,
  PAGE_LENGTH,
  Pet,
  PetCreateInput,
  PetsRepository,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async findById(id: string) {
    return Promise.resolve(this.pets.find((pets) => pets.id === id) ?? null)
  }

  async searchManyByCity(
    organizationsIdOnCity: string[],
    characteristics: Characteristics,
    page: number,
  ) {
    const petsOnCity = this.pets
      .filter((item) => organizationsIdOnCity.includes(item.organization_id))
      .filter(
        (item) =>
          (characteristics.age ? item.age === characteristics.age : true) &&
          (characteristics.energyLevel
            ? item.energy_level === characteristics.energyLevel
            : true) &&
          (characteristics.independenceLevel
            ? item.independence_level === characteristics.independenceLevel
            : true) &&
          (characteristics.size ? item.size === characteristics.size : true) &&
          (characteristics.environment
            ? item.environment === characteristics.environment
            : true),
      )
      .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)

    return Promise.resolve(petsOnCity)
  }

  async create(data: PetCreateInput) {
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
      organization_id: data.organization_id,
    }

    this.pets.push(newPet)

    return Promise.resolve(newPet)
  }
}
