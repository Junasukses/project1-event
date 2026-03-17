<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const order = ref(null)

onMounted(() => {
  const raw = sessionStorage.getItem('lastOrder')
  if (raw) order.value = JSON.parse(raw)
})

function formatPrice(p) { return 'Rp ' + p.toLocaleString('id-ID') }

const pmLabels = { transfer: '🏦 Transfer Bank', ewallet: '📱 E-Wallet', qris: '📷 QRIS', cc: '💳 Kartu Kredit' }

const confettiItems = Array.from({ length: 20 }, (_, i) => ({
  i: i + 1,
  style: {
    left: ((i + 1) * 5) + '%',
    background: 'hsl(' + ((i + 1) * 18) + ',70%,60%)',
    animationDelay: ((i + 1) * 0.15) + 's',
    animationDuration: (2 + (i + 1) * 0.1) + 's',
    transform: 'rotate(' + ((i + 1) * 37) + 'deg)',
  }
}))
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0f] py-16 relative overflow-hidden">
    <!-- CONFETTI -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <span v-for="c in confettiItems" :key="c.i"
        class="absolute w-2.5 h-2.5 rounded-sm animate-fall top-[-20px]"
        :style="c.style"></span>
    </div>

    <div class="relative z-10 max-w-[700px] mx-auto px-6">
      <!-- SUCCESS CARD -->
      <div v-if="order" class="bg-[#1e1e2e] border border-[#2d2d3d] rounded-3xl p-8 sm:p-10 text-center shadow-[0_30px_80px_rgba(99,102,241,.15)]">
        <!-- icon -->
        <div class="relative w-24 h-24 mx-auto mb-6">
          <div class="animate-spin-ring absolute inset-[-8px] rounded-full border-[3px] border-transparent"
            style="background:linear-gradient(135deg,#10b981,#059669) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);-webkit-mask-composite:destination-out;mask-composite:exclude"></div>
          <div class="w-24 h-24 rounded-full flex items-center justify-center text-5xl" style="background:linear-gradient(135deg,#10b981,#059669)">✅</div>
        </div>

        <h1 class="text-3xl font-extrabold text-slate-100 mb-2">Pembayaran Berhasil!</h1>
        <p class="text-slate-500 mb-5">Terima kasih, <span class="text-indigo-300 font-semibold">{{ order.name }}</span>! Pesananmu telah dikonfirmasi.</p>

        <!-- order id -->
        <div class="inline-flex flex-col items-center bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-8 py-3 mb-6">
          <span class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">ID Pesanan</span>
          <span class="text-xl font-extrabold text-indigo-400 tracking-widest">{{ order.orderId }}</span>
        </div>

        <!-- tickets -->
        <div class="text-left mb-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-[#2d2d3d]">Detail Tiket</h3>
          <div class="flex flex-col gap-3">
            <div v-for="item in order.items" :key="item.event.id"
              class="flex gap-3 items-start bg-[#0a0a0f] rounded-xl p-3">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" :style="{ background: item.event.color }">{{ item.event.emoji }}</div>
              <div class="flex-1 min-w-0">
                <span class="block text-sm font-bold text-slate-200 truncate">{{ item.event.name }}</span>
                <span class="block text-xs text-slate-500">📅 {{ item.event.date }}</span>
                <span class="block text-xs text-slate-500">📍 {{ item.event.location }}</span>
                <span class="block text-xs text-indigo-400 font-semibold mt-1">{{ item.quantity }} tiket</span>
              </div>
              <span class="text-sm font-bold text-indigo-300 flex-shrink-0">{{ formatPrice(item.event.price * item.quantity) }}</span>
            </div>
          </div>
        </div>

        <!-- info grid -->
        <div class="grid grid-cols-2 gap-3 bg-[#0a0a0f] rounded-2xl p-4 text-left mb-4">
          <div v-for="row in [
            { label: 'Nama Pemesan', value: order.name },
            { label: 'Email', value: order.email },
            { label: 'No. HP', value: order.phone },
            { label: 'Metode Bayar', value: pmLabels[order.paymentMethod] },
            { label: 'Tanggal Transaksi', value: order.date },
            { label: 'Status', value: '✅ Lunas', green: true },
          ]" :key="row.label">
            <div>
              <span class="block text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{{ row.label }}</span>
              <span class="block text-sm font-semibold" :class="row.green ? 'text-emerald-400' : 'text-slate-200'">{{ row.value }}</span>
            </div>
          </div>
        </div>

        <!-- total -->
        <div class="flex justify-between items-center bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-5 py-4 mb-4">
          <span class="text-sm font-semibold text-slate-400">Total Dibayar</span>
          <span class="text-2xl font-extrabold text-indigo-400">{{ formatPrice(order.total) }}</span>
        </div>

        <!-- email notice -->
        <div class="flex gap-3 items-start bg-emerald-500/7 border border-emerald-500/25 rounded-xl p-4 mb-6 text-left">
          <span class="text-xl flex-shrink-0">📧</span>
          <p class="text-xs text-slate-400 leading-relaxed">E-tiket telah dikirimkan ke <span class="text-emerald-400 font-semibold">{{ order.email }}</span>. Cek inbox atau folder spam. Tunjukkan e-tiket saat memasuki venue.</p>
        </div>

        <!-- actions -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button @click="router.push('/events')"
            class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            🎫 Beli Tiket Lagi
          </button>
          <button @click="router.push('/')"
            class="border border-[#2d2d3d] hover:border-indigo-500 hover:text-indigo-300 text-slate-400 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 cursor-pointer">
            🏠 Kembali ke Beranda
          </button>
        </div>
      </div>

      <!-- NO ORDER -->
      <div v-else class="text-center py-20">
        <span class="text-5xl block mb-4">🤔</span>
        <h2 class="text-xl font-bold text-slate-100 mb-2">Tidak Ada Data Pesanan</h2>
        <p class="text-slate-500 mb-5">Halaman ini hanya bisa diakses setelah melakukan pembayaran.</p>
        <button @click="router.push('/')" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-7 py-3.5 rounded-xl cursor-pointer">Ke Beranda</button>
      </div>
    </div>
  </div>
</template>
