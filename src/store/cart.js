import { reactive, computed } from 'vue'

export const cartStore = reactive({
  items: [], // { event, quantity }

  addItem(event) {
    const existing = this.items.find((i) => i.event.id === event.id)
    if (existing) {
      existing.quantity++
    } else {
      this.items.push({ event, quantity: 1 })
    }
  },

  removeItem(eventId) {
    this.items = this.items.filter((i) => i.event.id !== eventId)
  },

  updateQuantity(eventId, qty) {
    const item = this.items.find((i) => i.event.id === eventId)
    if (item) {
      if (qty <= 0) {
        this.removeItem(eventId)
      } else {
        item.quantity = qty
      }
    }
  },

  clearCart() {
    this.items = []
  },

  get totalItems() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0)
  },

  get totalPrice() {
    return this.items.reduce((sum, i) => sum + i.event.price * i.quantity, 0)
  },
})
