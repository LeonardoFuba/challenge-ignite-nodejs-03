import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { IncompleteDataError } from './errors/incomplete-data-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      cep: '12345-000',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        cep: '12345-000',
        address: 'Same Address Street, 1234',
        latitude: -21.156981,
        longitude: -47.969802,
        whatsapp: '123456789',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should not be able to register without address', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        cep: '12345-000',
        address: '',
        latitude: -21.156981,
        longitude: -47.969802,
        whatsapp: '123456789',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(IncompleteDataError)
  })

  it('should not be able to register without whatsapp', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        cep: '12345-000',
        address: 'Same Address Street, 1234',
        latitude: -21.156981,
        longitude: -47.969802,
        whatsapp: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(IncompleteDataError)
  })
})
