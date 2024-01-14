import { randomUUID } from 'node:crypto'
import {
  Location,
  Organization,
  OrganizationCreateInput,
  OrganizationsRepository,
} from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async findById(id: string) {
    return (
      this.organizations.find((organization) => organization.id === id) ?? null
    )
  }

  async findByEmail(email: string) {
    return (
      this.organizations.find((organization) => organization.email === email) ??
      null
    )
  }

  async findManyByCity(locations: Location) {
    const organizations = this.organizations.filter(
      (organization) => organization.city === locations.city,
    )

    return organizations
  }

  async create(data: OrganizationCreateInput) {
    const newOrganization = {
      id: randomUUID(),
      created_at: new Date(),
      responsible_name: data.responsible_name,
      email: data.email,
      cep: data.cep,
      state: data.state,
      city: data.city,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
    } as Organization

    this.organizations.push(newOrganization)

    return newOrganization
  }
}
