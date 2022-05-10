import express from 'express'
import { initDb, pool } from './database'

const app = express()

app.listen(3000, () => {
    initDb(pool)
    console.log('http://localhost:3000')
})