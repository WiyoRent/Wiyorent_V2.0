import express from 'express'
import { deleteUser, fetchSingleUser, fetchUsers, updatedUser } from '../../controllers/admin/user.controller.js'

const userAdminRouter = express.Router()

userAdminRouter.get(
    '/get/users',
    fetchUsers
)

userAdminRouter.get(
    '/get/user/:id',
    fetchSingleUser
)

userAdminRouter.patch(
    '/update/user',
    updatedUser
)

userAdminRouter.delete(
    '/delete/user/:id',
    deleteUser
)

export default userAdminRouter