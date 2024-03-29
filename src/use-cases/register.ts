import {
  Organization,
  OrganizationsRepository,
} from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'
import { IncompleteDataError } from './errors/incomplete-data-error'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cep: string
  state: string
  city: string
  address: string
  latitude: number
  longitude: number
  whatsapp: string
  password: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    cep,
    state,
    city,
    address,
    latitude,
    longitude,
    whatsapp,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    if (!whatsapp) {
      throw new IncompleteDataError('whatsapp')
    }

    if (!address) {
      throw new IncompleteDataError('address')
    }

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      responsible_name: name,
      email,
      cep,
      state,
      city,
      address,
      latitude,
      longitude,
      whatsapp,
      password_hash: passwordHash,
    })

    return { organization }
  }
}
