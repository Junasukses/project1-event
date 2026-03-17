import { reactive } from 'vue'

export const appStore = reactive({
  // Single product — no packages
  product: {
    id: 'snapdesk-license',
    name: 'SnapDesk License',
    tagline: 'Lisensi Permanent — Sekali Bayar',
    price: 499000,
  },

  // Payment form
  payment: {
    name: '',
    email: '',
    phone: '',
    method: 'transfer',
  },

  // Order state
  orderConfirmed: false,
  orderId: null,

  confirmOrder() {
    this.orderConfirmed = true
    this.orderId = 'SDK-' + Date.now().toString(36).toUpperCase()
  },

  resetOrder() {
    this.payment = { name: '', email: '', phone: '', method: 'transfer' }
    this.orderConfirmed = false
    this.orderId = null
  },
})
