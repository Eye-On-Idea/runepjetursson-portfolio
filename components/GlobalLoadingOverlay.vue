<script setup lang="ts">
const { loadingState } = useLoadingState();
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loadingState.isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm"
    >
      <LoadingState
        :type="loadingState.type"
        :message="loadingState.message"
        size="lg"
      />
    </div>
  </Transition>
</template>
