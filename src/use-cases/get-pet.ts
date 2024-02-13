import {
  PetCharacteristics,
  PetsRepository,
} from '@/repositories/pets-repository'
import { PicturesRepository } from '@/repositories/pictures-repository'
import { RequirementsRepository } from '@/repositories/requirements-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: PetCharacteristics
}

export class GetPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private picturesRepository: PicturesRepository,
    private requirementsRepository: RequirementsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const pictures = await this.picturesRepository.findManyByPetId(pet.id)
    const requirements = await this.requirementsRepository.findManyByPetId(
      pet.id,
    )

    return {
      pet: {
        ...pet,
        pictures,
        requirements,
      },
    }
  }
}
