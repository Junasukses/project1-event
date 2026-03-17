const fs = require('fs')

const appVue = `<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { cartStore } from './store/cart.js'

const route = useRoute()
const isLanding = computed(() => route.name === 'landing')
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300"
    :class="isLanding ? 'bg-[#0a0a0f]/50 border-transparent' : 'bg-[#0a0a0f]/90 border-white/[0.06]'"
  >
    <div class="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="text-xl font-extrabold text-indigo-500 no-underline tracking-tight hover:text-indigo-400 transition-colors"
      >
        🎟️ TicketIn
      </RouterLink>
      <div class="flex items-center gap-6">
        <RouterLink
          to="/events"
          class="text-slate-400 no-underline text-sm font-semibold hover:text-white transition-colors"
          active-class="!text-white"
        >
          Event
        </RouterLink>
        <RouterLink
          to="/cart"
          class="relative text-slate-400 text-2xl leading-none hover:text-white transition-colors no-underline"
        >
          🛒
          <span
            v-if="cartStore.totalItems > 0"
            class="cart-badge absolute -top-2 -right-2 bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #0a0a0f;
  color: #f1f5f9;
  line-height: 1.5;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0f; }
::-webkit-scrollbar-thumb { background: #2d2d3d; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #6366f1; }
</style>

<style scoped>
@keyframes pop {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
.cart-badge {
  animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
`

fs.writeFileSync('f:/QL/eticket/project1/src/App.vue', appVue, 'utf8')
console.log('App.vue written successfully')
