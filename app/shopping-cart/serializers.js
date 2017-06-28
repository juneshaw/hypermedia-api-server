const db = require('../../lib/db')
const linker = require('../../lib/linker')

const serializeProducts = (req, products) => (
  {
    _links: {
      self: {
        href: linker(req, `/api/products`)
      }
    },
    _embedded: {
      products: products.map(product => serializeProduct(req, product)),
    }
  }
)

const serializeProduct = (req, product) => (
  {
    _links: {
      self: {
        href: linker(req, `/api/products/${product.id}`)
      },
      items: {
        href: linker(req, `/api/products/${product.id}/items`)
      }
    },
    id: product.id,
    name: product.name,
    priceInCents: product.priceInCents,
  }
)

const serializeItems = (req, items) => (
  {
    _links: {
      self: {
        href: linker(req, `/api/items`)
      }
    },
    _embedded: {
      items: items.map(item => serializeItem(req, item)),
      products: getProducts(items).map(product => serializeProduct(req, product)),
    }
  }
)

const serializeItem = (req, item) => (
  {
    id: item.id,
    quantity: item.quantity,
    product: {
      ref: linker(req, `/api/products/${item.product_id}`),
      id: item.product_id,
    }
  }
)

const getProducts = items => (
  Array.from(
    items
      .reduce((set, item) => {
        set.add(db.products.find(item.product_id))
        return set
      }, new Set())
      .values()
  )
)

module.exports = {
  serializeProducts,
  serializeProduct,
  serializeItems,
  serializeItem,
}
