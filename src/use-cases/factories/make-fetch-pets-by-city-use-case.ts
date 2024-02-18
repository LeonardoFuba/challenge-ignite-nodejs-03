import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const fetchNearbyGymsUseCase = new FetchPetsByCityUseCase(
    petsRepository,
    organizationsRepository,
  )

  return fetchNearbyGymsUseCase
}
