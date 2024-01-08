import { Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Organization, OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  private organizations: Organization[] = []

  async findById(id: string) {
    return this.organizations.find((organization) => organization.id === id) ?? null
  }

  async findByEmail(email: string) {
    return this.organizations.find((organization) => organization.email === email) ?? null
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const newOrganization = {
      id: randomUUID(),
      created_at: new Date(),
      responsible_name: data.responsible_name,
      email: data.email,
      cep: data.cep,
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
