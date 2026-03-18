<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appStore } from '@/store/cart'
import { generateHardwareId, encryptLicense } from '@/utils/license-crypto'

const router = useRouter()

if (!appStore.orderConfirmed) {
  router.push('/')
}

const orderId = computed(() => appStore.orderId)
const buyerName = computed(() => appStore.payment.name)
const buyerEmail = computed(() => appStore.payment.email)
const buyerCpuId = computed(() => appStore.payment.cpuId)
const buyerMacAddress = computed(() => appStore.payment.macAddress)
const buyerDiskSerial = computed(() => appStore.payment.diskSerial)
const buyerClientCount = computed(() => appStore.payment.clientCount)

const product = appStore.product
const serviceFee = computed(() => Math.round(product.price * 0.03))
const grandTotal = computed(() => product.price + serviceFee.value)

function formatPrice(v) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(v)
}

// License key
const licenseKey = computed(() => {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 4 }, () =>
    Array.from({ length: 5 }, () => c[Math.floor(Math.random() * c.length)]).join(''),
  ).join('-')
})

const copied = ref(false)
function copyKey() {
  navigator.clipboard.writeText(licenseKey.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

// Generate and download encrypted .lic license file
const isGeneratingLic = ref(false)
async function downloadLicenseFile() {
  isGeneratingLic.value = true
  try {
    // 1. Generate hardware_id hash from hardware components
    const hardwareId = await generateHardwareId(
      buyerCpuId.value || '',
      buyerMacAddress.value || '',
      buyerDiskSerial.value || '',
    )

    // 2. Build license payload (matches API response format)
    const licensePayload = {
      user_id: orderId.value || '',
      email: buyerEmail.value || '',
      license_key: licenseKey.value,
      hardware_id: hardwareId,
      max_client: buyerClientCount.value || 1,
      product: product.name,
      type: 'permanent',
      issued_at: new Date().toISOString(),
    }

    // 3. Encrypt the payload
    const encryptedBuffer = await encryptLicense(licensePayload)

    // 4. Download as .lic file
    const blob = new Blob([encryptedBuffer], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'SnapDesk-' + (orderId.value || 'license') + '.lic'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Failed to generate license file:', err)
    alert('Gagal membuat file lisensi. Silakan coba lagi.')
  } finally {
    isGeneratingLic.value = false
  }
}

// Download desktop app (placeholder link)
function downloadDesktopApp() {
  // Replace with actual download URL
  const downloadUrl = 'https://releases.snapdesk.id/latest/SnapDesk-Setup.exe'
  window.open(downloadUrl, '_blank')
}

// Floating particles
const particles = ref([])
onMounted(() => {
  const colors = ['#10b981', '#34d399', '#6ee7b7', '#fff', '#059669']
  for (let i = 0; i < 30; i++) {
    particles.value.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 4,
      dur: 3 + Math.random() * 4,
      size: 4 + Math.random() * 6,
    })
  }
})

function backToHome() {
  appStore.resetOrder()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#060a0c] pt-20 relative overflow-hidden">
    <!-- Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="p in particles"
        :key="p.id"
        class="absolute rounded-full animate-fall"
        :style="{
          left: p.left + '%',
          width: p.size + 'px',
          height: p.size + 'px',
          backgroundColor: p.color,
          animationDelay: p.delay + 's',
          animationDuration: p.dur + 's',
          opacity: 0.6,
        }"
      />
    </div>

    <!-- Main split layout -->
    <div
      class="relative z-10 max-w-5xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-0 min-h-[80vh]"
    >
      <!-- LEFT: Celebration panel -->
      <div
        class="lg:w-[42%] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <!-- Decorative rings -->
        <div
          class="absolute -top-20 -left-20 w-60 h-60 border border-emerald-500/20 rounded-full"
        />
        <div
          class="absolute -bottom-16 -right-16 w-48 h-48 border border-teal-400/15 rounded-full"
        />
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-emerald-400/10 rounded-full animate-pulse-glow"
        />

        <!-- Success icon -->
        <div class="relative mb-8">
          <div
            class="w-28 h-28 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pop"
          >
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/40"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <h1 class="text-3xl font-black text-white mb-2">Pembayaran Berhasil!</h1>
        <p class="text-emerald-200/70 text-sm mb-6">Terima kasih atas pembelian SnapDesk</p>

        <!-- Order ID badge -->
        <div
          class="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2"
        >
          <span class="text-emerald-300/70 text-xs">Order</span>
          <span class="text-white font-mono font-bold text-sm">{{ orderId }}</span>
        </div>
      </div>

      <!-- RIGHT: Details panel -->
      <div
        class="lg:w-[58%] rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none bg-[#10101c] border border-white/5 p-8 sm:p-10 flex flex-col justify-between"
      >
        <!-- License key card -->
        <div class="mb-8">
          <div
            class="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            License Key
          </div>
          <div
            class="bg-[#060a0c] rounded-2xl p-5 flex items-center justify-between gap-3 border border-emerald-500/20"
          >
            <span class="font-mono text-emerald-400 text-lg font-bold tracking-wider select-all">{{
              licenseKey
            }}</span>
            <button
              @click="copyKey"
              class="shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer"
              :class="
                copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              "
            >
              {{ copied ? '✓ Copied!' : 'Copy' }}
            </button>
          </div>
          <p class="text-gray-500 text-xs mt-2">Simpan license key ini untuk aktivasi SnapDesk.</p>
        </div>

        <!-- Timeline-style details -->
        <div class="mb-8 space-y-0">
          <div class="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4">
            Detail Pembelian
          </div>

          <div class="relative pl-6 border-l-2 border-emerald-500/30 space-y-5">
            <!-- Buyer -->
            <div class="relative">
              <div
                class="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#10101c]"
              />
              <p class="text-gray-500 text-xs mb-0.5">Pembeli</p>
              <p class="text-white text-sm font-medium">{{ buyerName }}</p>
            </div>
            <!-- Email -->
            <div class="relative">
              <div
                class="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-[#10101c]"
              />
              <p class="text-gray-500 text-xs mb-0.5">Email</p>
              <p class="text-white text-sm font-medium">{{ buyerEmail }}</p>
            </div>
            <!-- Hardware Info -->
            <div class="relative">
              <div
                class="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-[#10101c]"
              />
              <p class="text-gray-500 text-xs mb-0.5">Informasi Perangkat</p>
              <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
                <div>
                  <span class="text-gray-500 text-[10px]">CPU ID</span>
                  <p class="text-white text-xs font-mono">{{ buyerCpuId }}</p>
                </div>
                <div>
                  <span class="text-gray-500 text-[10px]">MAC Address</span>
                  <p class="text-white text-xs font-mono">{{ buyerMacAddress }}</p>
                </div>
                <div>
                  <span class="text-gray-500 text-[10px]">Disk Serial</span>
                  <p class="text-white text-xs font-mono">{{ buyerDiskSerial }}</p>
                </div>
                <div>
                  <span class="text-gray-500 text-[10px]">Jumlah Client</span>
                  <p class="text-white text-xs font-medium">{{ buyerClientCount }} perangkat</p>
                </div>
              </div>
            </div>
            <!-- Product -->
            <div class="relative">
              <div
                class="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-[#10101c]"
              />
              <p class="text-gray-500 text-xs mb-0.5">Produk</p>
              <p class="text-white text-sm font-medium">{{ product.name }} — Lifetime License</p>
            </div>
            <!-- Total -->
            <div class="relative">
              <div
                class="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-emerald-300 ring-4 ring-[#10101c]"
              />
              <p class="text-gray-500 text-xs mb-0.5">Total Dibayar</p>
              <p class="text-emerald-400 text-xl font-black">{{ formatPrice(grandTotal) }}</p>
            </div>
          </div>
        </div>

        <!-- Email notice -->
        <p class="text-gray-500 text-xs mb-6">
          License key & link download telah dikirim ke
          <span class="text-emerald-400">{{ buyerEmail }}</span
          >.
        </p>

        <!-- Action buttons -->
        <div class="flex flex-col gap-3 mb-8">
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="downloadDesktopApp"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download SnapDesk (.exe)
            </button>
            <button
              @click="downloadLicenseFile"
              :disabled="isGeneratingLic"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg shadow-cyan-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Lisensi (.lic)
            </button>
          </div>
          <button
            @click="backToHome"
            class="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border border-white/10 cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>

        <!-- System requirements mini -->
        <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
          <p class="text-emerald-400/80 font-bold text-xs mb-2">System Requirements</p>
          <div class="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-gray-400">
            <span>🪟 Windows 10+</span>
            <span>🍎 macOS 12+</span>
            <span>🐧 Ubuntu 20.04+</span>
            <span>💾 RAM 2 GB+</span>
            <span>📦 Storage 150 MB</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
