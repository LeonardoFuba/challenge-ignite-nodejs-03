import { randomUUID } from 'node:crypto'
import {
  Requirement,
  RequirementsCreateInput,
  RequirementsRepository,
} from '../requirements-repository'

export class InMemoryRequirementsRepository implements RequirementsRepository {
  public requirements: Requirement[] = []

  async findById(id: string) {
    return Promise.resolve(
      this.requirements.find((item) => item.id === id) ?? null,
    )
  }

  async findManyByPetId(petId: string) {
    return Promise.resolve(
      this.requirements.filter((item) => item.pet_id === petId),
    )
  }

  async createMany(data: RequirementsCreateInput[]) {
    const newRequirements = data.map((requirement) => {
      const newRequirement = {
        id: randomUUID(),
        value: requirement.value,
        pet_id: requirement.pet_id,
        created_at: new Date(),
      } as Requirement

      this.requirements.push(newRequirement)

      return newRequirement
    })

    return Promise.resolve(newRequirements)
  }
}
