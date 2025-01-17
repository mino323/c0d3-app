import {
  MutationAddExerciseCommentArgs,
  QueryGetExerciseCommentsArgs,
  QueryGetChildCommentsArgs
} from '..'
import { Context } from '../../@types/helpers'
import prisma from '../../prisma'

export const getExerciseComments = async (
  _parent: void,
  { exerciseId }: QueryGetExerciseCommentsArgs
) => {
  return prisma.exerciseComment.findMany({
    where: { parentId: null, exerciseId },
    include: {
      replies: true,
      author: true
    }
  })
}

export const getChildComments = async (
  _parent: void,
  { parentId }: QueryGetChildCommentsArgs
) => {
  return prisma.exerciseComment.findMany({
    where: { parentId },
    include: {
      replies: true,
      author: true
    }
  })
}

export const addExerciseComment = async (
  _parent: void,
  { content, exerciseId, parentId, userPic }: MutationAddExerciseCommentArgs,
  context: Context
) => {
  const authorId = context.req.user?.id
  if (!authorId) throw new Error('User should be logged in')

  return prisma.exerciseComment.create({
    data: { authorId, content, exerciseId, parentId, userPic }
  })
}
