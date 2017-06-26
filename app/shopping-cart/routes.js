const express = require('express')
const router = express.Router()
const db = require('../../lib/db')
const { serializeProducts, serializeItems } = require('./serializers')

router.get('/products', (req, res, next) => {
  const products = db.products.findAll()
  res.json(serializeProducts(req, products))
})

router.get('/items', (req, res, next) => {
  const items = db.items.findAll()
  res.json(serializeItems(req, items))
})

module.exports = router
