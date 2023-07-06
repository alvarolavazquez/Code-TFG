
class Count {
  static URLproduct = 0;

  static inc(){
    let URLproduct = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('URLproduct')) {
        URLproduct = JSON.parse(localStorage.getItem('URLproduct'))
      }
      URLproduct++
      localStorage.setItem('URLproduct', JSON.stringify(URLproduct))
    }
  }
  static des(){let URLproduct = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('URLproduct')) {
        URLproduct = JSON.parse(localStorage.getItem('URLproduct'))
      }
      URLproduct--
      localStorage.setItem('URLproduct', JSON.stringify(URLproduct))
    }}
  static getURL(){ let URLproduct = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('URLproduct')) {
        URLproduct = JSON.parse(localStorage.getItem('URLproduct'))
      }
      return URLproduct
    }
  }
}

const cart = {

  address(){

    return Count.getURL();
  },
  itemTotal() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length
      }
    }
    return 0
  },
  addItem(item, cb) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      if(item.type == 'URL') Count.inc();
      console.log(Count.getURL())
      cart.push({
        product: item,
        quantity: 1,
        shop: item.shop._id
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      cb()
    }
  },
  updateCart(itemIndex, quantity) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart[itemIndex].quantity = quantity
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  },
  getCart() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'))
      }
    }
    return []
  },
  removeItem(item) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.splice(item, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      if(item.type == 'URL') Count.des();
    }
    return cart
  },
  emptyCart(cb) {
    if (typeof window !== "undefined") {
      localStorage.removeItem('cart')
      cb()
    }
  },

  getCartTotal() {
    let cart = []
    let total=0
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
        total=cart.reduce((a, b) => {
          return a + (b.quantity*b.product.price)
        }, 0)
      }
    }
    return total;
  }
}

export default cart
