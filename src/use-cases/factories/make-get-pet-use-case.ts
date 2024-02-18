import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPicturesRepository } from '@/repositories/prisma/prisma-pictures-repository'
import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository'

import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const pictureRepository = new PrismaPicturesRepository()
  const requirementRepository = new PrismaRequirementsRepository()

  const searchGymsUseCase = new GetPetUseCase(
    petRepository,
    pictureRepository,
    requirementRepository,
  )

  return searchGymsUseCase
}
