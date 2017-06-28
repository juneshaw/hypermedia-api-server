const express = require('express')
const router = express.Router()
const db = require('../../lib/db')
const { serializeProducts, serializeProduct, serializeItems, serializeItem } = require('./serializers')

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

router.post('/products/:productId/items', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10)
  const product = db.products.find(req.params.productId)
  const item = db.items.insert({ quantity: req.body.quantity, product_id: product.id })

  res.json(serializeItem(req, item))
})

module.exports = router
