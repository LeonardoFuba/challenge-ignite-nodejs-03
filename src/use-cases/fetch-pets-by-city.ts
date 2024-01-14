import { OrganizationsRepository } from '@/repositories/organizations-repository'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  PetsRepository,
  Size,
} from '@/repositories/pets-repository'
import { CityIsRequiredError } from './errors/city-is-required-error'

interface FetchPetsByCityUseCaseRequest {
  state?: string
  city: string
  page: number
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
    page,
    age,
    energyLevel,
    independenceLevel,
    size,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    if (!city) {
      throw new CityIsRequiredError()
    }

    const organizationsOnCity =
      await this.organizationsRepository.findManyByCity({
        city,
      })

    const pets = await this.petsRepository.searchManyByCity(
      organizationsOnCity.map((org) => org.id),
      {
        age,
        energyLevel,
        independenceLevel,
        size,
      },
      page,
    )

    return { pets }
  }
}
