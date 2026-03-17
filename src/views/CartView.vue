<script setup>
import { useRouter } from 'vue-router'
import { cartStore } from '../store/cart.js'

const router = useRouter()

function formatPrice(p) { return 'Rp ' + p.toLocaleString('id-ID') }
function increase(item) { cartStore.updateQuantity(item.event.id, item.quantity + 1) }
function decrease(item) { cartStore.updateQuantity(item.event.id, item.quantity - 1) }
function remove(id)     { cartStore.removeItem(id) }
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0f] pb-16">
    <!-- HEADER -->
    <div class="text-center px-6 pt-24 pb-10" style="background:linear-gradient(135deg,#0f0c29,#302b63)">
      <h1 class="text-4xl font-extrabold text-white mb-2">🛒 Keranjang Tiket</h1>
      <p class="text-slate-400">Review tiket pilihanmu sebelum melanjutkan</p>
    </div>

    <div class="max-w-[1100px] mx-auto px-6 mt-8">
      <!-- EMPTY -->
      <div v-if="cartStore.items.length === 0" class="text-center py-24">
        <span class="text-6xl block mb-4">🛒</span>
        <h2 class="text-xl font-bold text-slate-100 mb-2">Keranjang Kosong</h2>
        <p class="text-slate-500 mb-6">Kamu belum menambahkan tiket apapun. Yuk cari event seru!</p>
        <button @click="router.push('/events')"
          class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          🎫 Jelajahi Event
        </button>
      </div>

      <!-- CART CONTENT -->
      <div v-else class="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <!-- ITEMS -->
        <div class="flex flex-col gap-4">
          <div v-for="item in cartStore.items" :key="item.event.id"
            class="bg-[#1e1e2e] border border-[#2d2d3d] hover:border-indigo-500 rounded-2xl p-4 flex gap-4 transition-colors duration-200">
            <div class="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0" :style="{ background: item.event.color }">
              {{ item.event.emoji }}
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-[11px] text-indigo-400 font-bold uppercase tracking-wide">{{ item.event.category }}</span>
              <h3 class="text-sm font-bold text-slate-100 mt-0.5 mb-1 truncate">{{ item.event.name }}</h3>
              <div class="flex flex-wrap gap-x-4 gap-y-0.5 mb-2">
                <span class="text-xs text-slate-500">📅 {{ item.event.date }}</span>
                <span class="text-xs text-slate-500">📍 {{ item.event.location }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-500">{{ formatPrice(item.event.price) }} / tiket</span>
                <span class="text-base font-bold text-indigo-400">{{ formatPrice(item.event.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end justify-between gap-3 flex-shrink-0">
              <!-- qty -->
              <div class="flex items-center gap-2 bg-[#0a0a0f] border border-[#2d2d3d] rounded-xl px-2 py-1">
                <button @click="decrease(item)" class="w-7 h-7 flex items-center justify-center text-indigo-300 hover:bg-indigo-500/20 rounded-lg font-bold text-lg transition-colors cursor-pointer">−</button>
                <span class="text-sm font-bold text-white min-w-[20px] text-center">{{ item.quantity }}</span>
                <button @click="increase(item)" class="w-7 h-7 flex items-center justify-center text-indigo-300 hover:bg-indigo-500/20 rounded-lg font-bold text-lg transition-colors cursor-pointer">+</button>
              </div>
              <button @click="remove(item.event.id)"
                class="text-red-500 border border-slate-700 hover:bg-red-500/10 hover:border-red-500 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer">
                🗑️ Hapus
              </button>
            </div>
          </div>
        </div>

        <!-- SUMMARY -->
        <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6 sticky top-20">
          <h3 class="text-base font-bold text-slate-100 mb-4 pb-3 border-b border-[#2d2d3d]">Ringkasan Pesanan</h3>
          <div class="flex flex-col gap-3 mb-4">
            <div v-for="item in cartStore.items" :key="item.event.id">
              <span class="block text-xs font-semibold text-slate-400 mb-1">{{ item.event.name }}</span>
              <div class="flex justify-between text-xs text-slate-500">
                <span>{{ item.quantity }} tiket × {{ formatPrice(item.event.price) }}</span>
                <span class="text-indigo-300 font-semibold">{{ formatPrice(item.event.price * item.quantity) }}</span>
              </div>
            </div>
          </div>
          <div class="border-t border-[#2d2d3d] pt-3 mb-2">
            <div class="flex justify-between text-sm text-slate-400 mb-1">
              <span>Total Tiket</span>
              <strong class="text-white">{{ cartStore.totalItems }} tiket</strong>
            </div>
          </div>
          <div class="border-t border-[#2d2d3d] pt-3 flex justify-between items-center mb-5">
            <span class="text-sm text-slate-400">Total Pembayaran</span>
            <span class="text-2xl font-extrabold text-indigo-400">{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>
          <button @click="router.push('/checkout')"
            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            Lanjut ke Checkout →
          </button>
          <button @click="router.push('/events')"
            class="w-full mt-3 bg-transparent border border-[#2d2d3d] hover:border-indigo-500 hover:text-indigo-300 text-slate-500 font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm">
            ← Tambah Event Lain
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
