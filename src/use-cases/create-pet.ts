import { Pet, PetsRepository } from '@/repositories/pets-repository'

type Age = 'Filhote' | 'Adulto'

type Size = 'Pequenino' | 'Médio' | 'Grandalhão'

type EnergyLevel =
  | 'Muito baixa'
  | 'Baixa'
  | 'Média'
  | 'Muita energia'
  | 'Elétrico'

type IndependenceLevel = 'Baixo' | 'Médio' | 'Alto'

type Environment = 'Ambiente pequeno' | 'Ambiente amplo' | 'Ambiente aberto'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    })

    return { pet }
  }
}
