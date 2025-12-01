<script setup lang="ts">
const { getPersonal } = useRuneContent();
const personal = getPersonal();

useSeo({
  title: `${personal.full_name} – Vilkår`,
  description: "Brugsbetingelser for runepjetursson.com",
  type: "website",
});
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
    <div class="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-6">
      <h1 class="text-4xl font-extrabold">Vilkår for brug</h1>
      <p class="text-lg text-zinc-700 dark:text-zinc-300">
        Denne side er et personligt portfolio-site for Rune Pjetursson. Indholdet er til information, og du må gerne linke til det. Der er ingen brugerprofiler eller betalinger tilknyttet.
      </p>
      <p class="text-lg text-zinc-700 dark:text-zinc-300">
        Hvis du har spørgsmål til indhold eller ønsker at samarbejde, kontakt mig på
        <a class="text-brand-600 dark:text-brand-300 font-semibold" href="mailto:hello@runepjetursson.com">hello@runepjetursson.com</a>.
      </p>
    </div>
  </div>
</template>
