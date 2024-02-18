import { env } from '@/env'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    environment: z.string(),
    adoptionRequirements: z
      .string()
      .regex(
        /([A-Z a-z]+;)*[A-Z a-z]+/,
        'Must be this format: requirement1;requirement2;requirement3',
      ),
  })

  const petImagesSchema = z.array(
    z.object({
      originalname: z.string(),
      filename: z.string(),
      size: z.number(),
    }),
  )

  const {
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    adoptionRequirements,
  } = createPetBodySchema.parse(request.body)

  const pictures = petImagesSchema.parse(request.files).map((file) => {
    return {
      name: file.originalname,
      size: file.size,
      key: file.filename,
      url: `${env.STATIC_BASE_URL}/images/${file.filename}`,
    }
  })

  /* executando use-case */
  const createPetUseCase = makeCreatePetUseCase()

  const pet = await createPetUseCase.execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    organizationId: request.user.sub,
    requirements: adoptionRequirements.split(';').map((requirement) => ({
      value: requirement,
    })),
    pictures,
  })

  return reply.status(201).send(pet)
}
