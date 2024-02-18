import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string().length(8).regex(/[0-9]/g),
    state: z.string().length(2).regex(/[A-Z]/g),
    city: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    whatsapp: z.string().min(10).regex(/[0-9]/g),
    password: z.string().min(6),
  })

  const {
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
  } = registerBodySchema.parse(request.body)

  try {
    /* executando use-case */
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
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
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
  return reply.status(201).send()
}
