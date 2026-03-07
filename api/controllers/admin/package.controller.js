import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"

export const getPackages = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, name, price, description, inclusions, is_popular
            FROM packages
            ORDER BY price ASC
        `)

        const packages = result.rows.map((row) => ({
            package_id: row.id,
            name: row.name,
            price: row.price,
            description: row.description,
            inclusions: row.inclusions ?? [],
            is_popular: row.is_popular,
        }))

        console.log(packages, '---packages')

        return successMsg(res, 200, '', packages)
    } catch (error) {
        console.error(error.message)
        return errorMsg(res, error.status || 500, error.message || 'An internal server error occured')
    }
}

export const createPackage = async (req, res) => {
    const { name, price, description, inclusions, is_popular } = req.body

    if (!name || !price) {
        return errorMsg(res, 400, 'Name and price are required')
    }

    try {
        const result = await pool.query(`
            INSERT INTO packages(name, price, description, inclusions, is_popular)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [name, price, description, inclusions ?? [], is_popular ?? false])

        const row = result.rows[0]

        const new_package = {
            package_id: row.id,
            name: row.name,
            price: row.price,
            description: row.description,
            inclusions: row.inclusions ?? [],
            is_popular: row.is_popular,
        }

        console.log(new_package, '---created package')

        return successMsg(res, 200, 'Package created', new_package)
    } catch (error) {
        console.error(error.message)
        return errorMsg(res, error.status || 500, error.message || 'An internal server error occured')
    }
}

export const updatePackage = async (req, res) => {
    const packageId = req.params.id
    const { name, price, description, inclusions, is_popular } = req.body

    if (!packageId) {
        return errorMsg(res, 400, "Couldn't get package ID")
    }

    try {
        const result = await pool.query(`
            UPDATE packages
            SET
                name = $1,
                price = $2,
                description = $3,
                inclusions = $4,
                is_popular = $5
            WHERE id = $6
            RETURNING *
        `, [name, price, description, inclusions ?? [], is_popular ?? false, packageId])

        if (result.rowCount === 0) {
            return errorMsg(res, 404, 'Package not found')
        }

        const row = result.rows[0]

        const updated_package = {
            package_id: row.id,
            name: row.name,
            price: row.price,
            description: row.description,
            inclusions: row.inclusions ?? [],
            is_popular: row.is_popular,
        }

        console.log(updated_package, '---updated package')

        return successMsg(res, 200, 'Package updated', updated_package)
    } catch (error) {
        console.error(error.message)
        return errorMsg(res, error.status || 500, error.message || 'An internal server error occured')
    }
}

export const deletePackage = async (req, res) => {
    const packageId = req.params.id

    if (!packageId) {
        return errorMsg(res, 400, "Couldn't get package ID")
    }

    try {
        const result = await pool.query(`
            DELETE FROM packages WHERE id = $1
        `, [packageId])

        if (result.rowCount === 0) {
            return errorMsg(res, 404, 'Package not found')
        }

        return successMsg(res, 200, 'Package deleted', [])
    } catch (error) {
        console.error(error.message)
        return errorMsg(res, error.status || 500, error.message || 'An internal server error occured')
    }
}
