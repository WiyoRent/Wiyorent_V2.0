import express from 'express'
import { getPackages, createPackage, updatePackage, deletePackage } from '../../controllers/admin/package.controller.js'

const packageRouter = express.Router()

packageRouter.get('/get/packages', getPackages)
packageRouter.post('/create/package', createPackage)
packageRouter.patch('/update/package/:id', updatePackage)
packageRouter.delete('/delete/package/:id', deletePackage)

export default packageRouter
