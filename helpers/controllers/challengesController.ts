import { Context } from '../../@types/helpers'
import type {
  CreateChallengeMutationVariables,
  UpdateChallengeMutationVariables
} from '../../graphql'
import { lessons } from '../../graphql/queryResolvers/lessons'
import prisma from '../../prisma'
import { checkIsAdmin } from '../isAdmin'
import { validateLessonId } from '../validateLessonId'

export const createChallenge = async (
  _parent: void,
  arg: CreateChallengeMutationVariables,
  ctx: Context
) => {
  const { req } = ctx
  try {
    checkIsAdmin(req)
    await validateLessonId(arg.lessonId)
    await prisma.challenge.create({ data: arg })
    return lessons()
  } catch (err) {
    throw new Error(err)
  }
}

export const updateChallenge = async (
  _parent: void,
  arg: UpdateChallengeMutationVariables,
  ctx: Context
) => {
  const { req } = ctx
  try {
    checkIsAdmin(req)
    const { id, lessonId, ...data } = arg
    await validateLessonId(lessonId)
    await prisma.challenge.update({
      where: { id },
      data
    })
    return lessons()
  } catch (err) {
    throw new Error(err)
  }
}
