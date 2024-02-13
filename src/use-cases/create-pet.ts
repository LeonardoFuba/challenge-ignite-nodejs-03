import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  PetsRepository,
  Size,
} from '@/repositories/pets-repository'
import {
  PictureCreateInput,
  PicturesRepository,
} from '@/repositories/pictures-repository'
import {
  RequirementsCreateInput,
  RequirementsRepository,
} from '@/repositories/requirements-repository'
import { OneOrMorePicturesAreRequiredError } from './errors/one-or-more-pictures-are-required'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  organizationId: string
  pictures: Array<Omit<PictureCreateInput, 'pet_id'>>
  requirements: Array<Omit<RequirementsCreateInput, 'pet_id'>>
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private picturesRepository: PicturesRepository,
    private requirementsRepository: RequirementsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    organizationId,
    pictures,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
      organization_id: organizationId,
    })

    if (pictures.length < 1) {
      throw new OneOrMorePicturesAreRequiredError()
    }

    await this.picturesRepository.createMany(
      pictures.map((props) => ({
        pet_id: pet.id,
        ...props,
      })),
    )

    await this.requirementsRepository.createMany(
      requirements.map((requirement) => ({
        pet_id: pet.id,
        ...requirement,
      })),
    )

    return { pet }
  }
}
