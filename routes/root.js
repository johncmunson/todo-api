const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  return res.status(200).json({ version: '1.0.0' })
})

module.exports = router
