import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const registerUseCase = new RegisterUseCase(organizationRepository)

  return registerUseCase
}
