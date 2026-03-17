<script setup>
import { ref, computed } from 'vue'
import { cartStore } from '../store/cart.js'

const searchQuery = ref('')
const selectedCategory = ref('Semua')
const addedMap = ref({})

const categories = ['Semua', 'Konser', 'Festival', 'Seminar', 'Pameran', 'Olahraga', 'Teater']

const events = [
  { id: 1, name: 'Java Jazz Festival 2026', category: 'Konser', date: '22 April 2026', time: '16.00 – 23.00 WIB', location: 'JIExpo Kemayoran, Jakarta', price: 350000, emoji: '🎷', color: 'linear-gradient(135deg,#1a1a2e,#16213e)', desc: 'Festival jazz terbesar di Asia Tenggara dengan ratusan musisi dari dalam dan luar negeri.', stock: 80, badge: '🔥 Hot' },
  { id: 2, name: 'Djakarta Warehouse Project', category: 'Festival', date: '14 Mei 2026', time: '18.00 – 04.00 WIB', location: 'Pulau D, Ancol, Jakarta', price: 550000, emoji: '🎧', color: 'linear-gradient(135deg,#000000,#434343)', desc: 'Festival musik elektronik terbesar di Asia dengan lineup DJ kelas dunia.', stock: 120, badge: '⚡ Trending' },
  { id: 3, name: 'Tech Summit Indonesia 2026', category: 'Seminar', date: '10 Mei 2026', time: '09.00 – 17.00 WIB', location: 'Bali Nusa Dua Convention Center', price: 500000, emoji: '💻', color: 'linear-gradient(135deg,#0f3460,#533483)', desc: 'Konferensi teknologi terbesar di Indonesia dengan pembicara dari perusahaan Fortune 500.', stock: 200, badge: '⭐ Featured' },
  { id: 4, name: 'Pekan Seni Nusantara', category: 'Pameran', date: '5 Juni 2026', time: '10.00 – 20.00 WIB', location: 'Taman Ismail Marzuki, Jakarta', price: 150000, emoji: '🎨', color: 'linear-gradient(135deg,#c94b4b,#4b134f)', desc: 'Pameran seni kontemporer menampilkan karya seniman lokal terbaik dari seluruh nusantara.', stock: 350, badge: '🎨 Seni' },
  { id: 5, name: 'BNI Liga 1 – Persija vs Persib', category: 'Olahraga', date: '30 April 2026', time: '19.30 WIB', location: 'Stadion GBK, Jakarta', price: 125000, emoji: '⚽', color: 'linear-gradient(135deg,#11998e,#38ef7d)', desc: 'Derby panas antara Persija Jakarta vs Persib Bandung di panggung Liga 1!', stock: 1500, badge: '🏆 Sport' },
  { id: 6, name: 'Teater Opera Cinderella', category: 'Teater', date: '18 Mei 2026', time: '19.00 – 21.30 WIB', location: 'Gedung Kesenian Jakarta', price: 250000, emoji: '🎭', color: 'linear-gradient(135deg,#8e2de2,#4a00e0)', desc: 'Pertunjukan teater musikal Cinderella dengan kostum mewah dan musik orkestra live.', stock: 60, badge: '✨ Eksklusif' },
  { id: 7, name: 'Bandung Food & Music Fest', category: 'Festival', date: '7 Juni 2026', time: '11.00 – 22.00 WIB', location: 'Lapangan Gasibu, Bandung', price: 75000, emoji: '🍜', color: 'linear-gradient(135deg,#f7971e,#ffd200)', desc: 'Festival kuliner dan musik dengan ratusan stand makanan dan band indie lokal terbaik.', stock: 500, badge: '🍜 Kuliner' },
  { id: 8, name: 'Seminar Nasional Startup 2026', category: 'Seminar', date: '25 Mei 2026', time: '08.00 – 16.00 WIB', location: 'Hotel Mulia, Jakarta', price: 300000, emoji: '🚀', color: 'linear-gradient(135deg,#141e30,#243b55)', desc: 'Seminar intensif bagi para founder dan calon entrepreneur. Insight dari unicorn Indonesia.', stock: 150, badge: '🚀 Startup' },
]

const filteredEvents = computed(() =>
  events.filter((e) => {
    const matchCat = selectedCategory.value === 'Semua' || e.category === selectedCategory.value
    const matchSearch = searchQuery.value === '' || e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCat && matchSearch
  })
)

function addToCart(event) {
  cartStore.addItem(event)
  addedMap.value[event.id] = true
  setTimeout(() => { addedMap.value[event.id] = false }, 1500)
}

function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID')
}
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0f] pb-16">
    <!-- PAGE HEADER -->
    <div class="text-center px-6 pt-24 pb-10" style="background:linear-gradient(135deg,#0f0c29,#302b63)">
      <h1 class="text-4xl font-extrabold text-white mb-2">🎫 Semua Event</h1>
      <p class="text-slate-400 mb-6">Temukan event impianmu dari ratusan pilihan terbaik</p>
      <div class="relative max-w-md mx-auto">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
        <input v-model="searchQuery" type="text" placeholder="Cari event atau lokasi..."
          class="w-full bg-white/10 border border-white/20 focus:border-indigo-500 focus:bg-indigo-500/10 rounded-full pl-11 pr-5 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200" />
      </div>
    </div>

    <div class="max-w-[1100px] mx-auto px-6 mt-8">
      <!-- FILTER -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
          class="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer"
          :class="selectedCategory === cat
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'bg-[#1e1e2e] border-[#2d2d3d] text-slate-400 hover:border-indigo-500 hover:text-indigo-300'">
          {{ cat }}
        </button>
      </div>

      <p class="text-slate-500 text-sm mb-5">
        Menampilkan <span class="text-indigo-400 font-semibold">{{ filteredEvents.length }}</span> event
      </p>

      <!-- GRID -->
      <div v-if="filteredEvents.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="event in filteredEvents" :key="event.id"
          class="bg-[#1e1e2e] border border-[#2d2d3d] hover:border-indigo-500 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,.15)] transition-all duration-200">
          <!-- image -->
          <div class="h-36 flex items-center justify-center relative" :style="{ background: event.color }">
            <span class="text-5xl">{{ event.emoji }}</span>
            <span class="absolute top-3 right-3 bg-black/55 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded-full">{{ event.badge }}</span>
          </div>
          <!-- body -->
          <div class="p-5 flex flex-col flex-1">
            <span class="text-[11px] text-indigo-400 font-bold uppercase tracking-wide">{{ event.category }}</span>
            <h3 class="text-sm font-bold text-slate-100 mt-1 mb-2">{{ event.name }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{{ event.desc }}</p>
            <div class="flex flex-col gap-1 mb-4">
              <span class="text-xs text-slate-500">📅 {{ event.date }}</span>
              <span class="text-xs text-slate-500">🕐 {{ event.time }}</span>
              <span class="text-xs text-slate-500">📍 {{ event.location }}</span>
            </div>
            <div class="flex items-center justify-between mt-auto">
              <div>
                <span class="block text-[10px] text-slate-500">Mulai dari</span>
                <span class="block text-base font-bold text-indigo-400">{{ formatPrice(event.price) }}</span>
              </div>
              <button @click="addToCart(event)"
                class="text-sm font-bold px-4 py-2 rounded-xl text-white transition-all duration-200 cursor-pointer"
                :class="addedMap[event.id]
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40'">
                {{ addedMap[event.id] ? '✅ Ditambahkan!' : '🛒 Tambah' }}
              </button>
            </div>
            <span class="text-[10px] text-slate-600 text-right mt-2">🎟️ {{ event.stock }} tiket tersisa</span>
          </div>
        </div>
      </div>

      <!-- EMPTY -->
      <div v-else class="text-center py-20">
        <span class="text-5xl block mb-4">😕</span>
        <p class="text-slate-500 mb-4">Tidak ada event untuk "<strong class="text-slate-300">{{ searchQuery }}</strong>"</p>
        <button @click="searchQuery = ''; selectedCategory = 'Semua'"
          class="border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 cursor-pointer">
          Reset Filter
        </button>
      </div>
    </div>
  </div>
</template>
