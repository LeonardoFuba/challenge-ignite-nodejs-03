import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-000',
      address: 'Same Address Street, 1234',
      latitude: -21.156981,
      longitude: -47.969802,
      whatsapp: '123456789',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
