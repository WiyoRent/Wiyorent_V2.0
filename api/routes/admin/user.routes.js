import express from 'express'
import { fetchSingleUser, fetchUsers } from '../../controllers/admin/user.controller.js'

const userAdminRouter = express.Router()

userAdminRouter.get(
    '/get/users',
    fetchUsers
)

userAdminRouter.get(
    '/get/user/:id',
    fetchSingleUser
)

export default userAdminRouter