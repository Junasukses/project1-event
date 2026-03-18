<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { appStore } from '../store/cart.js'

const router = useRouter()
const errors = ref({})
const isProcessing = ref(false)
const currentStep = ref(1)

const paymentMethods = [
  { value: 'transfer', label: 'Transfer Bank', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
  { value: 'ewallet', label: 'E-Wallet', icon: '📱', desc: 'GoPay, OVO, DANA, ShopeePay' },
  { value: 'qris', label: 'QRIS', icon: '📷', desc: 'Scan QR universal' },
  { value: 'cc', label: 'Kartu Kredit', icon: '💳', desc: 'Visa, Mastercard, JCB' },
]

const serviceFee = computed(() => Math.round(appStore.product.price * 0.03))
const grandTotal = computed(() => appStore.product.price + serviceFee.value)

function formatPrice(p) {
  return 'Rp ' + p.toLocaleString('id-ID')
}

function validate() {
  const e = {}
  if (!appStore.payment.name.trim()) e.name = 'Nama lengkap wajib diisi'
  if (!appStore.payment.email.trim()) e.email = 'Email wajib diisi'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appStore.payment.email))
    e.email = 'Format email tidak valid'
  if (!appStore.payment.phone.trim()) e.phone = 'Nomor HP wajib diisi'
  else if (!/^[0-9+\-\s]{8,15}$/.test(appStore.payment.phone)) e.phone = 'Nomor HP tidak valid'
  errors.value = e
  return Object.keys(e).length === 0
}

function goStep(n) {
  if (n === 2 && currentStep.value === 1) {
    if (!validate()) return
  }
  currentStep.value = n
}

async function handlePay() {
  isProcessing.value = true
  await new Promise((r) => setTimeout(r, 2500))
  isProcessing.value = false
  appStore.confirmOrder()
  router.push('/success')
}

const stepsMeta = [
  { n: 1, icon: '👤', label: 'Data Diri' },
  { n: 2, icon: '💳', label: 'Bayar' },
  { n: 3, icon: '📋', label: 'Konfirmasi' },
]
</script>

<template>
  <div class="min-h-screen bg-[#060610] pb-20">
    <!-- HEADER — full-width gradient with grid pattern -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0"
        style="background: linear-gradient(160deg, #022c22 0%, #064e3b 40%, #0f766e 100%)"
      ></div>
      <div
        class="absolute inset-0 opacity-[.07]"
        style="
          background:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(255, 255, 255, 0.1) 60px,
              rgba(255, 255, 255, 0.1) 61px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(255, 255, 255, 0.1) 60px,
              rgba(255, 255, 255, 0.1) 61px
            );
        "
      ></div>
      <div class="relative z-10 text-center px-6 pt-28 pb-16">
        <span
          class="inline-flex items-center gap-2 bg-white/[.06] border border-white/[.08] text-emerald-300 text-[11px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase backdrop-blur-sm"
        >
          🔒 Checkout Aman
        </span>
        <h1 class="text-3xl sm:text-4xl font-black text-white mb-1.5 tracking-tight">Checkout</h1>
        <p class="text-emerald-200/40 text-sm">Selesaikan pembelian SnapDesk License</p>
      </div>
    </div>

    <!-- STEPPER — pill bar floating -->
    <div class="max-w-2xl mx-auto px-6 -mt-7 relative z-20">
      <div
        class="bg-[#10101c]/90 backdrop-blur-xl border border-white/[.06] rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-xl shadow-black/40"
      >
        <template v-for="(s, idx) in stepsMeta" :key="s.n">
          <button
            @click="s.n < currentStep ? goStep(s.n) : null"
            class="flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
            :class="s.n <= currentStep ? 'opacity-100' : 'opacity-30 pointer-events-none'"
          >
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all duration-300"
              :class="
                s.n === currentStep
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-110'
                  : s.n < currentStep
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/5 text-slate-600'
              "
            >
              <span v-if="s.n < currentStep" class="text-sm">✓</span>
              <span v-else class="text-sm">{{ s.icon }}</span>
            </div>
            <span
              class="text-xs font-semibold hidden sm:block"
              :class="s.n === currentStep ? 'text-emerald-400' : 'text-slate-500'"
              >{{ s.label }}</span
            >
          </button>
          <div v-if="idx < stepsMeta.length - 1" class="flex-1 mx-3">
            <div
              class="h-[2px] rounded-full transition-all duration-500"
              :class="s.n < currentStep ? 'bg-emerald-500' : 'bg-white/[.06]'"
            ></div>
          </div>
        </template>
      </div>
    </div>

    <!-- CONTENT — single column wizard -->
    <div class="max-w-2xl mx-auto px-6 mt-10">
      <!-- STEP 1: Data Diri -->
      <div v-show="currentStep === 1" class="animate-fade-up">
        <div
          class="bg-[#10101c]/70 backdrop-blur-xl border border-white/[.06] rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/30"
        >
          <div class="flex items-center gap-3.5 mb-7">
            <div
              class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center text-xl border border-emerald-500/10"
            >
              👤
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Informasi Pembeli</h2>
              <p class="text-[11px] text-slate-500">License key akan dikirim ke data ini</p>
            </div>
          </div>

          <div class="space-y-5">
            <div>
              <label class="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Nama Lengkap
              </label>
              <input
                v-model="appStore.payment.name"
                type="text"
                placeholder="Masukkan nama lengkap"
                class="w-full bg-white/[.03] border-2 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                :class="
                  errors.name
                    ? 'border-red-500/50'
                    : 'border-white/[.06] focus:border-emerald-500 focus:shadow-[0_0_24px_rgba(16,185,129,.08)]'
                "
              />
              <p v-if="errors.name" class="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {{ errors.name }}
              </p>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Email
                </label>
                <input
                  v-model="appStore.payment.email"
                  type="email"
                  placeholder="email@domain.com"
                  class="w-full bg-white/[.03] border-2 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  :class="
                    errors.email
                      ? 'border-red-500/50'
                      : 'border-white/[.06] focus:border-emerald-500 focus:shadow-[0_0_24px_rgba(16,185,129,.08)]'
                  "
                />
                <p v-if="errors.email" class="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {{ errors.email }}
                </p>
              </div>
              <div>
                <label class="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Nomor HP
                </label>
                <input
                  v-model="appStore.payment.phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  class="w-full bg-white/[.03] border-2 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                  :class="
                    errors.phone
                      ? 'border-red-500/50'
                      : 'border-white/[.06] focus:border-emerald-500 focus:shadow-[0_0_24px_rgba(16,185,129,.08)]'
                  "
                />
                <p v-if="errors.phone" class="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {{ errors.phone }}
                </p>
              </div>
            </div>
          </div>

          <button
            @click="goStep(2)"
            class="w-full mt-9 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Lanjut ke Pembayaran →
          </button>
        </div>
      </div>

      <!-- STEP 2: Payment Method — 2×2 card grid -->
      <div v-show="currentStep === 2" class="animate-fade-up">
        <div
          class="bg-[#10101c]/70 backdrop-blur-xl border border-white/[.06] rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/30"
        >
          <div class="flex items-center gap-3.5 mb-7">
            <div
              class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center text-xl border border-emerald-500/10"
            >
              💳
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Pilih Metode Pembayaran</h2>
              <p class="text-[11px] text-slate-500">Semua metode diproses secara instan</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <label
              v-for="m in paymentMethods"
              :key="m.value"
              class="relative flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group"
              :class="
                appStore.payment.method === m.value
                  ? 'border-emerald-500 bg-emerald-500/[.06] scale-[1.03] shadow-lg shadow-emerald-500/10'
                  : 'border-white/[.06] bg-white/[.02] hover:border-white/[.12] hover:bg-white/[.04]'
              "
            >
              <input
                type="radio"
                v-model="appStore.payment.method"
                :value="m.value"
                class="hidden"
              />
              <span class="text-3xl group-hover:scale-110 transition-transform duration-200">{{
                m.icon
              }}</span>
              <span class="text-sm font-bold text-slate-100 text-center">{{ m.label }}</span>
              <span class="text-[10px] text-slate-500 text-center leading-tight">{{ m.desc }}</span>
              <div
                v-if="appStore.payment.method === m.value"
                class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/30"
              >
                <span class="text-white text-[10px] font-black">✓</span>
              </div>
            </label>
          </div>

          <div class="flex gap-3 mt-9">
            <button
              @click="goStep(1)"
              class="flex-1 bg-transparent border-2 border-white/[.06] hover:border-emerald-500/40 text-slate-400 hover:text-emerald-300 font-semibold py-4 rounded-xl transition-all duration-200 cursor-pointer"
            >
              ← Kembali
            </button>
            <button
              @click="goStep(3)"
              class="flex-[2] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Konfirmasi →
            </button>
          </div>
        </div>
      </div>

      <!-- STEP 3: Confirmation — receipt style -->
      <div v-show="currentStep === 3" class="animate-fade-up">
        <div
          class="bg-[#10101c]/70 backdrop-blur-xl border border-white/[.06] rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/30"
        >
          <div class="flex items-center gap-3.5 mb-7">
            <div
              class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center text-xl border border-emerald-500/10"
            >
              📋
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Konfirmasi Pesanan</h2>
              <p class="text-[11px] text-slate-500">Pastikan semua data sudah benar</p>
            </div>
          </div>

          <!-- Receipt card -->
          <div class="bg-white/[.02] rounded-2xl border border-white/[.06] overflow-hidden">
            <div class="flex items-center gap-4 p-5 border-b border-white/[.04]">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ring-2 ring-emerald-500/20"
                style="background: linear-gradient(145deg, #022c22, #064e3b)"
              >
                🖥️
              </div>
              <div class="flex-1 min-w-0">
                <span class="block text-sm font-bold text-white">{{ appStore.product.name }}</span>
                <span class="block text-[11px] text-slate-500 mt-0.5">{{
                  appStore.product.tagline
                }}</span>
              </div>
              <span class="text-base font-extrabold text-emerald-400 shrink-0">{{
                formatPrice(appStore.product.price)
              }}</span>
            </div>
            <div class="p-5 border-b border-white/[.04] space-y-3">
              <div
                v-for="row in [
                  { ico: '👤', lbl: 'Nama', val: appStore.payment.name },
                  { ico: '📧', lbl: 'Email', val: appStore.payment.email },
                  { ico: '📞', lbl: 'Telepon', val: appStore.payment.phone },
                  {
                    ico: '💳',
                    lbl: 'Bayar via',
                    val: paymentMethods.find((m) => m.value === appStore.payment.method)?.label,
                  },
                ]"
                :key="row.lbl"
                class="flex items-center gap-3 text-sm"
              >
                <span class="text-base w-5 text-center shrink-0 opacity-60">{{ row.ico }}</span>
                <span class="text-slate-500 w-16 shrink-0">{{ row.lbl }}</span>
                <span class="text-white font-medium truncate">{{ row.val }}</span>
              </div>
            </div>
            <div class="p-5 space-y-2.5">
              <div class="flex justify-between text-xs text-slate-500">
                <span>Subtotal</span><span>{{ formatPrice(appStore.product.price) }}</span>
              </div>
              <div class="flex justify-between text-xs text-slate-500">
                <span>Biaya Layanan (3%)</span><span>{{ formatPrice(serviceFee) }}</span>
              </div>
              <div class="flex justify-between items-center pt-3 mt-1 border-t border-white/[.06]">
                <span class="text-sm font-bold text-white">Total</span>
                <span class="text-2xl font-black text-emerald-400">{{
                  formatPrice(grandTotal)
                }}</span>
              </div>
            </div>
          </div>

          <div
            class="flex gap-3 bg-emerald-500/[.04] border border-emerald-500/10 rounded-xl p-4 mt-6"
          >
            <span class="text-base mt-0.5 shrink-0">ℹ️</span>
            <p class="text-xs text-slate-400 leading-relaxed">
              License key dan link download dikirim ke
              <strong class="text-emerald-400">{{ appStore.payment.email }}</strong> dalam 5 menit
              setelah pembayaran.
            </p>
          </div>

          <div class="flex gap-3 mt-9">
            <button
              @click="goStep(2)"
              class="flex-1 bg-transparent border-2 border-white/[.06] hover:border-emerald-500/40 text-slate-400 hover:text-emerald-300 font-semibold py-4 rounded-xl transition-all duration-200 cursor-pointer"
            >
              ← Ubah
            </button>
            <button
              @click="handlePay"
              :disabled="isProcessing"
              class="flex-[2] bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              :class="
                !isProcessing && 'hover:from-emerald-400 hover:to-teal-500 hover:-translate-y-0.5'
              "
            >
              <span v-if="isProcessing" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Memproses...
              </span>
              <span v-else>💳 Bayar {{ formatPrice(grandTotal) }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Trust badges -->
      <div class="flex items-center justify-center gap-3 mt-8 flex-wrap">
        <span
          class="flex items-center gap-1.5 text-[10px] text-slate-600 bg-white/[.02] px-3 py-1.5 rounded-full border border-white/[.05]"
          >🔒 SSL Encrypted</span
        >
        <span
          class="flex items-center gap-1.5 text-[10px] text-slate-600 bg-white/[.02] px-3 py-1.5 rounded-full border border-white/[.05]"
          >🛡️ 30 Hari Garansi</span
        >
        <span
          class="flex items-center gap-1.5 text-[10px] text-slate-600 bg-white/[.02] px-3 py-1.5 rounded-full border border-white/[.05]"
          >⚡ Instant Delivery</span
        >
      </div>
    </div>
  </div>
</template>
