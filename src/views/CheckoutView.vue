<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { cartStore } from '../store/cart.js'

const router = useRouter()
const form = ref({ name: '', email: '', phone: '', idNumber: '', paymentMethod: 'transfer' })
const errors = ref({})
const isProcessing = ref(false)

const paymentMethods = [
  { value: 'transfer', label: 'Transfer Bank',  icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
  { value: 'ewallet',  label: 'E-Wallet',        icon: '📱', desc: 'GoPay, OVO, DANA, ShopeePay' },
  { value: 'qris',     label: 'QRIS',             icon: '📷', desc: 'Scan QR dari semua aplikasi' },
  { value: 'cc',       label: 'Kartu Kredit',    icon: '💳', desc: 'Visa, Mastercard, JCB' },
]

const serviceFee  = computed(() => Math.round(cartStore.totalPrice * 0.03))
const grandTotal  = computed(() => cartStore.totalPrice + serviceFee.value)

function formatPrice(p) { return 'Rp ' + p.toLocaleString('id-ID') }

function validate() {
  const e = {}
  if (!form.value.name.trim())     e.name     = 'Nama lengkap wajib diisi'
  if (!form.value.email.trim())    e.email    = 'Email wajib diisi'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) e.email = 'Format email tidak valid'
  if (!form.value.phone.trim())    e.phone    = 'Nomor HP wajib diisi'
  else if (!/^[0-9+\-\s]{8,15}$/.test(form.value.phone)) e.phone = 'Nomor HP tidak valid'
  if (!form.value.idNumber.trim()) e.idNumber = 'Nomor KTP / identitas wajib diisi'
  errors.value = e
  return Object.keys(e).length === 0
}

async function handlePay() {
  if (!validate()) return
  isProcessing.value = true
  await new Promise(r => setTimeout(r, 2500))
  isProcessing.value = false
  const orderData = {
    orderId: 'TIN-' + Date.now().toString().slice(-8),
    name: form.value.name, email: form.value.email, phone: form.value.phone,
    paymentMethod: form.value.paymentMethod,
    items: JSON.parse(JSON.stringify(cartStore.items)),
    total: cartStore.totalPrice,
    date: new Date().toLocaleString('id-ID'),
  }
  sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
  cartStore.clearCart()
  router.push('/success')
}
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0f] pb-16">
    <!-- HEADER -->
    <div class="text-center px-6 pt-24 pb-10" style="background:linear-gradient(135deg,#0f0c29,#302b63)">
      <h1 class="text-4xl font-extrabold text-white mb-2">📝 Checkout</h1>
      <p class="text-slate-400 mb-6">Lengkapi data diri dan pilih metode pembayaran</p>
      <!-- steps -->
      <div class="flex items-center justify-center gap-0 max-w-xs mx-auto">
        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-base">🛒</div>
        <div class="flex-1 h-0.5 bg-indigo-500"></div>
        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-base">📝</div>
        <div class="flex-1 h-0.5 bg-[#2d2d3d]"></div>
        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-[#1e1e2e] border-2 border-[#2d2d3d] text-base">✅</div>
      </div>
    </div>

    <div class="max-w-[1100px] mx-auto px-6 mt-8">
      <!-- EMPTY -->
      <div v-if="cartStore.items.length === 0" class="text-center py-16 text-slate-500">
        <p class="mb-4">Keranjang kamu kosong.</p>
        <button @click="router.push('/events')" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-6 py-3 rounded-xl cursor-pointer">Kembali ke Event</button>
      </div>

      <div v-else class="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <!-- FORM -->
        <div class="flex flex-col gap-5">
          <!-- PERSONAL DATA -->
          <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[#2d2d3d]">
              <span class="text-2xl">👤</span>
              <h2 class="text-base font-bold text-slate-100">Data Diri Pemesan</h2>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-slate-400 mb-1.5">Nama Lengkap <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" placeholder="Sesuai KTP"
                  class="w-full bg-[#0a0a0f] border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  :class="errors.name ? 'border-red-500' : 'border-[#2d2d3d] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]'" />
                <span v-if="errors.name" class="text-red-500 text-xs mt-1 block">{{ errors.name }}</span>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1.5">Email <span class="text-red-500">*</span></label>
                <input v-model="form.email" type="email" placeholder="contoh@email.com"
                  class="w-full bg-[#0a0a0f] border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  :class="errors.email ? 'border-red-500' : 'border-[#2d2d3d] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]'" />
                <span v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{ errors.email }}</span>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1.5">Nomor HP <span class="text-red-500">*</span></label>
                <input v-model="form.phone" type="tel" placeholder="08xxxxxxxxxx"
                  class="w-full bg-[#0a0a0f] border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  :class="errors.phone ? 'border-red-500' : 'border-[#2d2d3d] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]'" />
                <span v-if="errors.phone" class="text-red-500 text-xs mt-1 block">{{ errors.phone }}</span>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-slate-400 mb-1.5">Nomor KTP / Identitas <span class="text-red-500">*</span></label>
                <input v-model="form.idNumber" type="text" placeholder="16 digit nomor KTP"
                  class="w-full bg-[#0a0a0f] border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  :class="errors.idNumber ? 'border-red-500' : 'border-[#2d2d3d] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]'" />
                <span v-if="errors.idNumber" class="text-red-500 text-xs mt-1 block">{{ errors.idNumber }}</span>
              </div>
            </div>
          </div>

          <!-- PAYMENT METHOD -->
          <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[#2d2d3d]">
              <span class="text-2xl">💳</span>
              <h2 class="text-base font-bold text-slate-100">Metode Pembayaran</h2>
            </div>
            <div class="flex flex-col gap-3">
              <label v-for="method in paymentMethods" :key="method.value"
                class="flex items-center gap-3 p-4 rounded-xl border-[1.5px] cursor-pointer transition-all duration-200"
                :class="form.paymentMethod === method.value
                  ? 'border-indigo-500 bg-indigo-500/8'
                  : 'border-[#2d2d3d] bg-[#0a0a0f] hover:border-indigo-500/50'">
                <input type="radio" v-model="form.paymentMethod" :value="method.value" class="hidden" />
                <span class="text-2xl">{{ method.icon }}</span>
                <div class="flex-1">
                  <span class="block text-sm font-bold text-slate-100">{{ method.label }}</span>
                  <span class="block text-xs text-slate-500 mt-0.5">{{ method.desc }}</span>
                </div>
                <span v-if="form.paymentMethod === method.value" class="text-indigo-400 font-bold text-base">✓</span>
              </label>
            </div>
          </div>

          <!-- NOTICE -->
          <div class="flex gap-3 bg-indigo-500/8 border border-indigo-500/25 rounded-xl p-4">
            <span class="text-lg mt-0.5 flex-shrink-0">ℹ️</span>
            <p class="text-xs text-slate-400 leading-relaxed">Tiket akan dikirim ke email yang kamu daftarkan dalam 5 menit setelah pembayaran berhasil. Pastikan email aktif dan dapat menerima pesan.</p>
          </div>
        </div>

        <!-- SUMMARY -->
        <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6 sticky top-20">
          <h3 class="text-base font-bold text-slate-100 mb-4 pb-3 border-b border-[#2d2d3d]">Ringkasan Pesanan</h3>
          <div class="flex flex-col gap-3 mb-3">
            <div v-for="item in cartStore.items" :key="item.event.id" class="flex gap-3 items-start">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" :style="{ background: item.event.color }">{{ item.event.emoji }}</div>
              <div class="flex-1 min-w-0">
                <span class="block text-xs font-bold text-slate-300 truncate">{{ item.event.name }}</span>
                <span class="block text-[11px] text-slate-500">{{ item.event.date }}</span>
                <span class="block text-xs text-indigo-400 font-semibold mt-0.5">{{ item.quantity }} tiket × {{ formatPrice(item.event.price) }}</span>
              </div>
              <span class="text-sm font-bold text-indigo-300 flex-shrink-0">{{ formatPrice(item.event.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="border-t border-[#2d2d3d] py-3 flex flex-col gap-2">
            <div class="flex justify-between text-xs text-slate-500">
              <span>Subtotal ({{ cartStore.totalItems }} tiket)</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-xs text-slate-500">
              <span>Biaya Layanan (3%)</span>
              <span>{{ formatPrice(serviceFee) }}</span>
            </div>
          </div>
          <div class="border-t border-[#2d2d3d] pt-3 flex justify-between items-center mb-5">
            <span class="text-sm text-slate-400 font-semibold">Total Pembayaran</span>
            <span class="text-2xl font-extrabold text-indigo-400">{{ formatPrice(grandTotal) }}</span>
          </div>
          <button @click="handlePay" :disabled="isProcessing"
            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            :class="!isProcessing && 'hover:from-indigo-400 hover:to-purple-500 hover:-translate-y-0.5'">
            <span v-if="isProcessing">⏳ Memproses Pembayaran...</span>
            <span v-else>💳 Bayar {{ formatPrice(grandTotal) }}</span>
          </button>
          <p class="text-center text-[11px] text-slate-600 mt-2">🔒 Pembayaran aman &amp; terenkripsi SSL</p>
        </div>
      </div>
    </div>
  </div>
</template>
