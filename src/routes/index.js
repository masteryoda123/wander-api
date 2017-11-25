import express from 'express'
import HttpStatus from 'http-status-codes'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(HttpStatus.OK)
  res.send('Welcome to the wanderland')
})

export default router
