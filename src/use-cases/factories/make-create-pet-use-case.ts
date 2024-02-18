import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPicturesRepository } from '@/repositories/prisma/prisma-pictures-repository'
import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const pictureRepository = new PrismaPicturesRepository()
  const requirementRepository = new PrismaRequirementsRepository()

  const createPetUseCase = new CreatePetUseCase(
    petRepository,
    pictureRepository,
    requirementRepository,
  )

  return createPetUseCase
}
