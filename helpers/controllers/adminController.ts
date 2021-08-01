import { Context } from '../../@types/helpers'
import { ChangeAdminRightsMutationVariables } from '../../graphql'
import prisma from '../../prisma'
import { checkIsAdmin } from '../isAdmin'

export const changeAdminRights = async (
  _parent: void,
  { id, status }: ChangeAdminRightsMutationVariables,
  { req }: Context
) => {
  checkIsAdmin(req)
  await prisma.user.update({ where: { id }, data: { isAdmin: status } })
  return {
    success: true
  }
}
