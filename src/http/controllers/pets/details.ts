import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getDetailsSchema = z.object({
    id: z.string(),
  })

  const { id } = getDetailsSchema.parse(request.params)

  /* executando use-case */
  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({ petId: id })

  return reply.status(200).send({ pet })
}
