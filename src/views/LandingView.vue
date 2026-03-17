<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    icon: '⚡',
    title: 'Super Ringan',
    desc: 'Hanya 45 MB. Tidak membebani RAM dan CPU, bahkan di laptop lawas sekalipun.',
  },
  {
    icon: '📋',
    title: 'Clipboard Manager',
    desc: 'Simpan riwayat copy-paste tanpa batas. Cari, pin, dan paste kapan saja.',
  },
  {
    icon: '📸',
    title: 'Screenshot Instan',
    desc: 'Tangkap layar dengan shortcut, edit langsung, dan simpan atau share otomatis.',
  },
  {
    icon: '📝',
    title: 'Quick Notes',
    desc: 'Catat ide mendadak dengan floating note yang selalu di atas jendela lain.',
  },
  {
    icon: '🎨',
    title: 'Color Picker',
    desc: 'Ambil warna dari mana saja di layar. Salin kode HEX, RGB, atau HSL.',
  },
  {
    icon: '⌨️',
    title: 'Keyboard Shortcuts',
    desc: 'Atur hotkey custom untuk setiap fitur. Kerja tanpa sentuh mouse.',
  },
]

const stats = [
  { value: '35K+', label: 'Pengguna Aktif' },
  { value: '4.8/5', label: 'Rating' },
  { value: '45 MB', label: 'Ukuran App' },
  { value: '< 1s', label: 'Startup Time' },
]

const testimonials = [
  {
    name: 'Rizky Aditya',
    role: 'UI Designer',
    text: 'Color picker dan screenshot-nya game changer. Workflow desain saya jadi 2x lebih cepat.',
  },
  {
    name: 'Maya Sari',
    role: 'Content Writer',
    text: 'Quick Notes dan clipboard manager bikin saya nggak pernah kehilangan ide lagi!',
  },
  {
    name: 'Deni Firmansyah',
    role: 'Software Developer',
    text: 'Ringan banget. Berjalan di background tanpa terasa. Best productivity tool yang pernah saya pakai.',
  },
]

const platforms = [
  { name: 'Windows 10/11', icon: '🪟' },
  { name: 'macOS 12+', icon: '🍎' },
  { name: 'Linux', icon: '🐧' },
]

function formatPrice(p) {
  return 'Rp ' + p.toLocaleString('id-ID')
}
</script>

<template>
  <!-- HERO -->
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    style="background: linear-gradient(160deg, #022c22, #064e3b, #0f766e)"
  >
    <div
      class="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
      style="background: radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 70%)"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full"
      style="background: radial-gradient(circle, rgba(45, 212, 191, 0.15), transparent 70%)"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto animate-fade-up">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text -->
        <div class="text-center lg:text-left">
          <span
            class="inline-block bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold px-5 py-1.5 rounded-full mb-6 tracking-wide"
          >
            🖥️ Desktop Productivity Tool
          </span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Kerja Lebih Cepat<br />
            dengan
            <span
              class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
              >SnapDesk</span
            >
          </h1>
          <p class="text-slate-300 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            Clipboard manager, screenshot tool, quick notes, dan color picker — semua dalam satu
            aplikasi ringan yang selalu siap di taskbar-mu.
          </p>
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <button
              @click="router.push('/payment')"
              class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              💳 Beli Sekarang — Rp 499.000
            </button>
            <a
              href="#features"
              class="bg-transparent border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Lihat Fitur ↓
            </a>
          </div>
          <!-- Platforms -->
          <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
            <span
              v-for="p in platforms"
              :key="p.name"
              class="flex items-center gap-1.5 text-slate-400 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
            >
              {{ p.icon }} {{ p.name }}
            </span>
          </div>
        </div>

        <!-- Right: App mockup -->
        <div class="hidden lg:flex justify-center">
          <div
            class="relative w-[340px] h-[260px] rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
            style="background: linear-gradient(145deg, #1a1a2e, #0d1117)"
          >
            <!-- Fake title bar -->
            <div class="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-white/5">
              <span class="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500/70"></span>
              <span class="w-3 h-3 rounded-full bg-green-500/70"></span>
              <span class="text-xs text-slate-500 ml-2 font-mono">SnapDesk v2.0</span>
            </div>
            <!-- Fake content -->
            <div class="p-4 space-y-3">
              <div class="flex gap-2">
                <div
                  class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm"
                >
                  📋
                </div>
                <div class="flex-1">
                  <div class="h-2 w-24 bg-slate-700 rounded mb-1.5"></div>
                  <div class="h-2 w-40 bg-slate-800 rounded"></div>
                </div>
              </div>
              <div class="flex gap-2">
                <div
                  class="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm"
                >
                  📸
                </div>
                <div class="flex-1">
                  <div class="h-2 w-28 bg-slate-700 rounded mb-1.5"></div>
                  <div class="h-2 w-36 bg-slate-800 rounded"></div>
                </div>
              </div>
              <div class="flex gap-2">
                <div
                  class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm"
                >
                  📝
                </div>
                <div class="flex-1">
                  <div class="h-2 w-20 bg-slate-700 rounded mb-1.5"></div>
                  <div class="h-2 w-44 bg-slate-800 rounded"></div>
                </div>
              </div>
              <div class="flex gap-2">
                <div
                  class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm"
                >
                  🎨
                </div>
                <div class="flex-1">
                  <div class="h-2 w-32 bg-slate-700 rounded mb-1.5"></div>
                  <div class="h-2 w-28 bg-slate-800 rounded"></div>
                </div>
              </div>
            </div>
            <!-- Floating badge -->
            <div
              class="absolute -top-3 -right-3 bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-xs rotate-6 shadow-lg"
            >
              v2.0 🚀
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div
        class="flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-10 mt-10"
      >
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <span class="block text-3xl font-black text-white">{{ stat.value }}</span>
          <span class="block text-xs text-slate-400 uppercase tracking-widest mt-1">{{
            stat.label
          }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="py-20 bg-[#0a0a0f]">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="text-center mb-14">
        <span
          class="inline-block bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-emerald-500/20"
          >FITUR UTAMA</span
        >
        <h2 class="text-3xl font-extrabold text-slate-100 mb-3">
          Semua yang Kamu Butuhkan, Satu Aplikasi
        </h2>
        <p class="text-slate-500 max-w-lg mx-auto">
          Dirancang untuk pekerja kreatif, developer, dan siapapun yang ingin lebih produktif di
          desktop.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-[#1e1e2e] border border-[#2d2d3d] hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,185,129,.1)] group"
        >
          <span class="text-4xl block mb-4 group-hover:scale-110 transition-transform">{{
            feature.icon
          }}</span>
          <h3 class="text-slate-100 font-bold text-base mb-2">{{ feature.title }}</h3>
          <p class="text-slate-500 text-sm leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="py-20 bg-[#0d0d18]">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="text-center mb-14">
        <h2 class="text-3xl font-extrabold text-slate-100 mb-3">Cara Mendapatkan SnapDesk</h2>
        <p class="text-slate-500">Cuma 3 langkah, langsung pakai</p>
      </div>
      <div class="grid sm:grid-cols-3 gap-6">
        <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6 text-center">
          <div class="text-4xl font-black text-emerald-500/20 leading-none mb-2">01</div>
          <span class="text-4xl block mb-4">💳</span>
          <h4 class="text-slate-100 font-bold mb-2">Bayar Sekali</h4>
          <p class="text-slate-500 text-sm leading-relaxed">
            Lakukan pembayaran Rp 499.000. Tanpa langganan, tanpa biaya tersembunyi.
          </p>
        </div>
        <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6 text-center">
          <div class="text-4xl font-black text-emerald-500/20 leading-none mb-2">02</div>
          <span class="text-4xl block mb-4">🔑</span>
          <h4 class="text-slate-100 font-bold mb-2">Terima License Key</h4>
          <p class="text-slate-500 text-sm leading-relaxed">
            License key dan link download langsung dikirim ke email kamu.
          </p>
        </div>
        <div class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6 text-center">
          <div class="text-4xl font-black text-emerald-500/20 leading-none mb-2">03</div>
          <span class="text-4xl block mb-4">🖥️</span>
          <h4 class="text-slate-100 font-bold mb-2">Install & Pakai</h4>
          <p class="text-slate-500 text-sm leading-relaxed">
            Download, install, masukkan license key, dan mulai produktif!
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="py-20 bg-[#0a0a0f]">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="text-center mb-14">
        <h2 class="text-3xl font-extrabold text-slate-100 mb-3">Kata Mereka</h2>
        <p class="text-slate-500">Sudah dipercaya ribuan pengguna di Indonesia</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-2xl p-6"
        >
          <div class="flex gap-1 text-yellow-400 mb-3">
            <span v-for="i in 5" :key="i">★</span>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed mb-5 italic">"{{ t.text }}"</p>
          <div>
            <span class="block text-sm font-bold text-slate-200">{{ t.name }}</span>
            <span class="block text-xs text-slate-500">{{ t.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING CTA -->
  <section
    class="py-20 text-center border-t border-emerald-500/20"
    style="background: linear-gradient(135deg, #022c22, #064e3b)"
  >
    <div class="max-w-[600px] mx-auto px-6">
      <h2 class="text-3xl font-extrabold text-white mb-3">Satu Harga, Selamanya Milikmu</h2>
      <p class="text-emerald-200/70 mb-4">
        Tanpa langganan bulanan. Tanpa upsell. Tanpa paket berjenjang.
      </p>
      <div class="inline-block bg-[#1e1e2e] border border-emerald-500/30 rounded-2xl p-8 mb-6">
        <span class="block text-sm text-slate-400 mb-1">SnapDesk License</span>
        <span class="block text-5xl font-black text-emerald-400 mb-1">Rp 499.000</span>
        <span class="block text-xs text-slate-500"
          >Lisensi permanent • 2 perangkat • Update selamanya</span
        >
      </div>
      <div>
        <button
          @click="router.push('/payment')"
          class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          💳 Beli Sekarang
        </button>
        <p class="text-emerald-300/40 text-xs mt-4">🛡️ Garansi uang kembali 30 hari</p>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-[#050508] border-t border-[#1e1e2e] pt-14 pb-6">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <span class="block text-xl font-extrabold text-emerald-500 mb-3">🖥️ SnapDesk</span>
          <p class="text-slate-600 text-sm leading-relaxed">
            Aplikasi desktop ringan untuk produktivitas harian. Dibuat dengan cinta di Indonesia.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <strong class="text-slate-400 text-sm mb-1">Produk</strong>
          <a
            href="#features"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Fitur</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Changelog</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Dokumentasi</a
          >
        </div>
        <div class="flex flex-col gap-2">
          <strong class="text-slate-400 text-sm mb-1">Bantuan</strong>
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >FAQ</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Kontak</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Syarat &amp; Ketentuan</a
          >
        </div>
        <div class="flex flex-col gap-2">
          <strong class="text-slate-400 text-sm mb-1">Ikuti Kami</strong>
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Instagram</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >Twitter</a
          >
          <a
            href="#"
            class="text-slate-600 hover:text-emerald-400 text-sm no-underline transition-colors"
            >YouTube</a
          >
        </div>
      </div>
      <div class="border-t border-[#1e1e2e] pt-5 text-center text-xs text-[#2d2d3d]">
        © 2026 SnapDesk. All rights reserved.
      </div>
    </div>
  </footer>
</template>
