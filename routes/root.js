const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  return res.status(200).json({ message: 'hello world' })
})

module.exports = router
