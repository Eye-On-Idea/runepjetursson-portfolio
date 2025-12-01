<script setup lang="ts">
const { getPersonal } = useRuneContent();
const personal = getPersonal();

useSeo({
  title: `${personal.full_name} – Privatliv`,
  description: "Information om håndtering af data på runepjetursson.com",
  type: "website",
});
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
    <div class="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-6">
      <h1 class="text-4xl font-extrabold">Privatliv</h1>
      <p class="text-lg text-zinc-700 dark:text-zinc-300">
        Denne portfolio-side samler ingen analytics- eller trackingdata udover tekniske logs, som din browser automatisk sender ved sideindlæsning. Hvis du kontakter mig, gemmes din henvendelse kun for at kunne svare dig.
      </p>
      <p class="text-lg text-zinc-700 dark:text-zinc-300">
        Har du spørgsmål til privatliv eller databehandling, kan du skrive til <a class="text-brand-600 dark:text-brand-300 font-semibold" href="mailto:hello@runepjetursson.com">hello@runepjetursson.com</a>.
      </p>
    </div>
  </div>
</template>
