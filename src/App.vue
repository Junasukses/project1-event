<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isLanding = computed(() => route.name === 'landing')
</script>

<template>
  <!-- NAVBAR -->
  <nav
    class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 backdrop-blur-xl"
    :class="
      isLanding ? 'bg-[#0a0a0f]/50 border-transparent' : 'bg-[#0a0a0f]/90 border-white/[0.06]'
    "
  >
    <div class="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="text-xl font-extrabold text-emerald-500 hover:text-emerald-400 tracking-tight no-underline"
      >
        🖥️ SnapDesk
      </RouterLink>
      <div class="flex items-center gap-6">
        <a
          href="/#features"
          class="text-slate-400 hover:text-white no-underline text-sm font-semibold transition-colors duration-200"
        >
          Fitur
        </a>
        <RouterLink
          to="/payment"
          class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-5 py-2 rounded-lg text-sm shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200 no-underline"
        >
          Beli Sekarang
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
