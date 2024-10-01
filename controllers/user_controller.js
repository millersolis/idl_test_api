const postgre = require('../database')

///////// CONSTANTS //////////
const IDLE_STR = 'idle';
const AWAY_STR = 'away';
const UNKNWN_STR = 'unknown';
//////////////////////////////

const userController = {
    getUsers: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from users")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getByUsername: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from users where username = $1", [req.params.username])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(404).json({msg: "not found"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    create: async(req, res) => {
        try {
            const { username, status } = req.body

            const sql = 'INSERT INTO users(username, status) VALUES($1, $2) RETURNING *'

            const { rows } = await postgre.query(sql, [username, status])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    setIdleByUsername: async(req, res) => {
        try {
            const sql = 'UPDATE users set status = $2 where username = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.username, IDLE_STR])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    setAwayByUsername: async(req, res) => {
        try {
            const sql = 'UPDATE users set status = $2 where username = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.username, AWAY_STR])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    updateStatusByUsername: async(req, res) => {
        try {
            const { status } = req.body

            const sql = 'UPDATE users set status = $2 where username = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.username, status])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    deleteByUsername: async(req, res) => {
        try {
            const sql = 'DELETE FROM users where username = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.username])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})
            

        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = userController