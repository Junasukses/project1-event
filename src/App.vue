<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { cartStore } from './store/cart.js'

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
        class="text-xl font-extrabold text-indigo-500 hover:text-indigo-400 tracking-tight no-underline"
      >
        🎟️ TicketIn
      </RouterLink>
      <div class="flex items-center gap-6">
        <RouterLink
          to="/events"
          class="text-slate-400 hover:text-white no-underline text-sm font-semibold transition-colors duration-200 [&.router-link-active]:text-white"
        >
          Event
        </RouterLink>
        <RouterLink
          to="/cart"
          class="relative text-slate-400 hover:text-white no-underline text-xl leading-none transition-colors duration-200"
        >
          🛒
          <span
            v-if="cartStore.totalItems > 0"
            class="animate-pop absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[10px] font-black flex items-center justify-center"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
