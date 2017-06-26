const express = require('express')
const router = express.Router()
const db = require('../../lib/db')
const { serializeProducts, serializeProduct, serializeItems } = require('./serializers')

router.get('/products', (req, res, next) => {
  const products = db.products.findAll()
  res.json(serializeProducts(req, products))
})

router.get('/products/:id', (req, res, next) => {
  const product = db.products.find(req.params.id)
  res.json(serializeProduct(req, product))
})

router.get('/items', (req, res, next) => {
  const items = db.items.findAll()
  res.json(serializeItems(req, items))
})

module.exports = router
