import { prisma } from '@/lib/prisma'
import {
  RequirementsCreateInput,
  RequirementsRepository,
} from '../requirements-repository'

export class PrismaRequirementsRepository implements RequirementsRepository {
  async findById(id: string) {
    const requirement = await prisma.requirement.findUnique({
      where: {
        id,
      },
    })

    return requirement
  }

  async findManyByPetId(petId: string) {
    const requirements = await prisma.requirement.findMany({
      where: {
        pet_id: petId,
      },
    })

    return requirements
  }

  async createMany(data: RequirementsCreateInput[]) {
    await prisma.requirement.createMany({
      data: data.map((req) => {
        return {
          value: req.value,
          pet_id: req.pet_id,
        }
      }),
    })

    return prisma.requirement.findMany({
      where: {
        pet_id: data[0].pet_id,
      },
    })
  }
}
