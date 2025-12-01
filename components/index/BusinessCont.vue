<script lang="ts" setup>
import GlassCard from "~/components/GlassCard.vue";
</script>
<template>
  <GlassCard
    :displacement-scale="56"
    :blur-amount="0.09"
    :corner-radius="24"
    wrapper-class="p-1  rounded-3xl bg-white/5 border border-white/10 space-y-6 glass-card-hover"
  >
    <div class="w-full h-70 flex flex-row rounded-2xl gap-4">
      <a
        href="https://herqulez.com/"
        target="_blank"
        class="w-[50%] h-auto relative"
        ><div
          class="w-full h-full bg-[url(/assets/bg/herqulez-screenshot.png)] bg-cover rounded-2xl"
        ></div>
        <div class="absolute top-2 right-2 w-25 bg-zinc-900 rounded-full p-3">
          <img src="/assets/logo/herqulez/logo-sunrise-wtext.png" alt="" />
        </div>
        <h2
          class="absolute bottom-5 right-[30%] p-3 rounded-4xl bg-accent-400/40 ring-1 backdrop-blur-xs"
        >
          Go To the <b>Herqulez</b> Website
        </h2></a
      ><a
        href="https://eyeonidea.com/"
        target="_blank"
        class="w-[50%] h-auto relative"
        ><div
          class="w-full h-full bg-[url(/assets/bg/eoi-screenshot.png)] bg-cover rounded-2xl"
        ></div>
        <div class="absolute top-2 right-2 w-25">
          <img src="/assets/logo/EOI/Circle_logo.png" alt="" />
        </div>
        <h2
          class="absolute bottom-5 right-[30%] p-3 rounded-4xl bg-primary-400/40 ring-1 backdrop-blur-xs"
        >
          Go To the <b>Eye On Idea</b> Website
        </h2>
      </a>
    </div></GlassCard
  >
</template>

<style scoped lang="scss">
a {
  transition: all 0.2s ease-in-out;
  h2 {
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    transform: scale(1.02);
    div {
      &:nth-child(1) {
        filter: blur(1px) grayscale(70%);
      }
    }
    h2 {
      opacity: 1;
      font-size: 1rem;
    }
  }
}
</style>
