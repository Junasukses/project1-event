<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  { icon: '🎵', name: 'Konser' },
  { icon: '🎭', name: 'Teater' },
  { icon: '🎨', name: 'Pameran' },
  { icon: '🏆', name: 'Olahraga' },
  { icon: '🎪', name: 'Festival' },
  { icon: '📚', name: 'Seminar' },
  { icon: '🎬', name: 'Film' },
  { icon: '🍜', name: 'Kuliner' },
]

const featuredEvents = [
  {
    id: 1,
    name: 'Java Jazz Festival 2026',
    category: 'Konser & Musik',
    date: '22 April 2026',
    location: 'JIExpo Kemayoran, Jakarta',
    price: 350000,
    emoji: '🎷',
    color: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    badge: '🔥 Hot',
  },
  {
    id: 2,
    name: 'Tech Summit Indonesia',
    category: 'Seminar & Konferensi',
    date: '10 Mei 2026',
    location: 'Bali Nusa Dua Convention Center',
    price: 500000,
    emoji: '💻',
    color: 'linear-gradient(135deg,#0f3460,#533483)',
    badge: '⭐ Featured',
  },
  {
    id: 3,
    name: 'Pekan Seni Nusantara',
    category: 'Pameran Seni',
    date: '5 Juni 2026',
    location: 'Taman Ismail Marzuki, Jakarta',
    price: 150000,
    emoji: '🎨',
    color: 'linear-gradient(135deg,#c94b4b,#4b134f)',
    badge: '🎨 Seni',
  },
]

const steps = [
  {
    step: '01',
    icon: '🔍',
    title: 'Pilih Event',
    desc: 'Jelajahi ratusan event pilihan dari berbagai kategori sesuai minatmu.',
  },
  {
    step: '02',
    icon: '🛒',
    title: 'Tambah ke Keranjang',
    desc: 'Pilih jumlah tiket yang kamu inginkan dan tambahkan ke keranjang.',
  },
  {
    step: '03',
    icon: '📝',
    title: 'Isi Data Diri',
    desc: 'Lengkapi nama, email, dan nomor HP untuk konfirmasi tiket.',
  },
  {
    step: '04',
    icon: '✅',
    title: 'Pembayaran Selesai',
    desc: 'Selesaikan pembayaran dan tiket langsung dikirim ke emailmu.',
  },
]

function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID')
}
</script>

<template>
  <!-- HERO -->
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    style="background: linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
  >
    <div
      class="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full"
      style="background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-12 -left-12 w-[400px] h-[400px] rounded-full"
      style="background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%)"
    ></div>
    <div class="relative z-10 text-center max-w-2xl mx-auto animate-fade-up">
      <span
        class="inline-block bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-sm font-semibold px-5 py-1.5 rounded-full mb-6 tracking-wide"
      >
        🎟️ Platform Tiket #1 Indonesia
      </span>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
        Temukan &amp; Pesan<br />
        <span class="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
          >Event Terbaik</span
        ><br />
        di Sekitarmu
      </h1>
      <p class="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
        Nikmati berbagai konser, festival, seminar, dan pameran seni terpilih. Pesan tiket online
        dengan mudah, aman, dan cepat.
      </p>
      <div class="flex flex-wrap gap-4 justify-center mb-12">
        <button
          @click="router.push('/events')"
          class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          🎫 Jelajahi Event
        </button>
        <button
          @click="router.push('/events')"
          class="bg-transparent border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
        >
          Lihat Semua Event →
        </button>
      </div>
      <div class="flex items-center justify-center gap-8 border-t border-white/10 pt-8">
        <div class="text-center">
          <span class="block text-3xl font-black text-white">120+</span
          ><span class="block text-xs text-slate-400 uppercase tracking-widest mt-1"
            >Event Aktif</span
          >
        </div>
        <div class="w-px h-10 bg-white/10"></div>
        <div class="text-center">
          <span class="block text-3xl font-black text-white">50K+</span
          ><span class="block text-xs text-slate-400 uppercase tracking-widest mt-1"
            >Tiket Terjual</span
          >
        </div>
        <div class="w-px h-10 bg-white/10"></div>
        <div class="text-center">
          <span class="block text-3xl font-black text-white">200+</span
          ><span class="block text-xs text-slate-400 uppercase tracking-widest mt-1">Kota</span>
        </div>
      </div>
    </div>
  </section>

  <!-- KATEGORI -->
  <section class="py-20 bg-[#0a0a0f]">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-slate-100 mb-2">Kategori Event</h2>
        <p class="text-slate-500">Pilih sesuai minat dan passionmu</p>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-8 gap-3">
        <button
          v-for="cat in categories"
          :key="cat.icon"
          @click="router.push('/events')"
          class="flex flex-col items-center gap-2 bg-[#1e1e2e] border border-[#2d2d3d] hover:border-indigo-500 hover:bg-indigo-950/40 rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-1"
        >
          <span class="text-3xl">{{ cat.icon }}</span>
          <span class="text-xs font-semibold text-slate-300">{{ cat.name }}</span>
        </button>
      </div>
    </div>
  </section>

  <!-- FEATURED EVENTS -->
  <section class="py-20 bg-[#0d0d18]">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-slate-100 mb-2">Event Unggulan</h2>
        <p class="text-slate-500">Jangan sampai kehabisan tiket!</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in featuredEvents"
          :key="event.id"
          class="bg-[#1e1e2e] border border-[#2d2d3d] hover:border-indigo-500 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,.15)] transition-all duration-200"
        >
          <div
            class="h-40 flex items-center justify-center relative"
            :style="{ background: event.color }"
          >
            <span class="text-6xl">{{ event.emoji }}</span>
            <span
              class="absolute top-3 right-3 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full"
              >{{ event.badge }}</span
            >
          </div>
          <div class="p-5">
            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wide">{{
              event.category
            }}</span>
            <h3 class="text-base font-bold text-slate-100 mt-1 mb-2">{{ event.name }}</h3>
            <p class="text-xs text-slate-500 mb-4">
              📅 {{ event.date }} &nbsp; 📍 {{ event.location }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-indigo-400 font-bold">{{ formatPrice(event.price) }}</span>
              <button
                @click="router.push('/events')"
                class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <button
          @click="router.push('/events')"
          class="border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 cursor-pointer"
        >
          Lihat Semua Event →
        </button>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="py-20 bg-[#0a0a0f]">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-slate-100 mb-2">Cara Pesan Tiket</h2>
        <p class="text-slate-500">Mudah, cepat, hanya 4 langkah</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="step in steps"
          :key="step.step"
          class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6 text-center"
        >
          <div class="text-4xl font-black text-indigo-500/20 leading-none mb-2">
            {{ step.step }}
          </div>
          <span class="text-4xl block mb-4">{{ step.icon }}</span>
          <h4 class="text-slate-100 font-bold mb-2">{{ step.title }}</h4>
          <p class="text-slate-500 text-sm leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section
    class="py-20 text-center border-t border-indigo-500/20"
    style="background: linear-gradient(135deg, #1e1b4b, #312e81)"
  >
    <div class="max-w-[1100px] mx-auto px-6">
      <h2 class="text-3xl font-extrabold text-white mb-4">Siap Merasakan Pengalaman Terbaik?</h2>
      <p class="text-indigo-300 mb-8 max-w-md mx-auto">
        Bergabung dengan jutaan pengguna yang sudah mempercayakan pemesanan tiket mereka kepada
        kami.
      </p>
      <button
        @click="router.push('/events')"
        class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        🎟️ Mulai Pesan Sekarang
      </button>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-[#050508] border-t border-[#1e1e2e] pt-14 pb-6">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <span class="block text-xl font-extrabold text-indigo-500 mb-3">🎟️ TicketIn</span>
          <p class="text-slate-600 text-sm leading-relaxed">
            Platform pemesanan tiket event terpercaya di Indonesia.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <strong class="text-slate-400 text-sm mb-1">Perusahaan</strong>
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Tentang Kami</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Karir</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Blog</a
          >
        </div>
        <div class="flex flex-col gap-2">
          <strong class="text-slate-400 text-sm mb-1">Bantuan</strong>
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >FAQ</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Kontak</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Syarat &amp; Ketentuan</a
          >
        </div>
        <div class="flex flex-col gap-2">
          <strong class="text-slate-400 text-sm mb-1">Ikuti Kami</strong>
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Instagram</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >Twitter</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-indigo-400 text-sm no-underline transition-colors"
            >TikTok</a
          >
        </div>
      </div>
      <div class="border-t border-[#1e1e2e] pt-5 text-center text-xs text-[#2d2d3d]">
        © 2026 TicketIn. All rights reserved.
      </div>
    </div>
  </footer>
</template>
