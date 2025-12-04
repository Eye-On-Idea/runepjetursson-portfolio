<script setup lang="ts">
const { t } = useI18n();
const { variant, animationPresets } = useAccessibleMotion();

const form = reactive({
  name: "",
  email: "",
  project: "",
  message: "",
});

const formState = reactive({
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  errors: {
    name: false,
    email: false,
    message: false,
  },
});

// Shake animation variant for errors
const shakeVariant = variant(animationPresets.shake);

// Success pulse variant
const successVariant = variant(animationPresets.successPulse);

// Validate fields
const validateField = (field: keyof typeof formState.errors) => {
  switch (field) {
    case 'name':
      formState.errors.name = form.name.trim().length < 2;
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      formState.errors.email = !emailRegex.test(form.email);
      break;
    case 'message':
      formState.errors.message = form.message.trim().length < 10;
      break;
  }
};

// Handle form submission
const handleSubmit = async (event: Event) => {
  event.preventDefault();

  // Validate all required fields
  validateField('name');
  validateField('email');
  validateField('message');

  // Check if there are any errors
  const hasErrors = Object.values(formState.errors).some(error => error);

  if (hasErrors) {
    formState.isError = true;
    setTimeout(() => {
      formState.isError = false;
    }, 500);
    return;
  }

  // Set submitting state
  formState.isSubmitting = true;

  try {
    // Submit form using native FormData
    const formElement = event.target as HTMLFormElement;
    await fetch(formElement.action, {
      method: 'POST',
      body: new FormData(formElement),
      headers: {
        'Accept': 'application/json'
      }
    });

    // Success state
    formState.isSuccess = true;
    formState.isSubmitting = false;

    // Reset form after success animation
    setTimeout(() => {
      form.name = '';
      form.email = '';
      form.project = '';
      form.message = '';
      formState.isSuccess = false;
    }, 2000);
  } catch (error) {
    // Error state
    formState.isError = true;
    formState.isSubmitting = false;

    setTimeout(() => {
      formState.isError = false;
    }, 500);
  }
};
</script>

<template>
  <form
    class="space-y-5"
    action="https://formsubmit.co/hello@runepjetursson.com"
    method="POST"
    @submit="handleSubmit"
  >
    <!-- Name -->
    <label
      class="block space-y-2"
      v-motion
      :initial="{ opacity: 1, x: 0 }"
      :error="formState.errors.name ? shakeVariant.error : {}"
    >
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-user" class="w-4 h-4" />
        {{ t("portfolio.form.name") }}
      </span>
      <input
        v-model="form.name"
        type="text"
        name="name"
        autocomplete="name"
        required
        @blur="validateField('name')"
        :class="[
          'w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all',
          formState.errors.name
            ? 'border-red-500 focus:ring-red-400'
            : 'border-white/10 focus:ring-brand-400 focus:border-transparent'
        ]"
        :placeholder="t('portfolio.form.name')"
      />
      <p v-if="formState.errors.name" class="text-xs text-red-400 mt-1 animate-fadeIn">
        {{ t("portfolio.form.errors.nameRequired") || "Name must be at least 2 characters" }}
      </p>
    </label>
    <!-- Email -->
    <label
      class="block space-y-2"
      v-motion
      :initial="{ opacity: 1, x: 0 }"
      :error="formState.errors.email ? shakeVariant.error : {}"
    >
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-mail" class="w-4 h-4" />
        {{ t("portfolio.form.email") }}
      </span>
      <input
        v-model="form.email"
        type="email"
        name="email"
        autocomplete="email"
        required
        @blur="validateField('email')"
        :class="[
          'w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all',
          formState.errors.email
            ? 'border-red-500 focus:ring-red-400'
            : 'border-white/10 focus:ring-brand-400 focus:border-transparent'
        ]"
        placeholder="you@example.com"
      />
      <p v-if="formState.errors.email" class="text-xs text-red-400 mt-1 animate-fadeIn">
        {{ t("portfolio.form.errors.emailInvalid") || "Please enter a valid email address" }}
      </p>
    </label>
    <!-- Project -->
    <label class="block space-y-2">
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-briefcase" class="w-4 h-4" />
        {{ t("portfolio.form.project") }}
      </span>
      <input
        v-model="form.project"
        type="text"
        name="project"
        autocomplete="organization-title"
        class="w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
        :placeholder="t('portfolio.form.project')"
      />
    </label>
    <!-- Message -->
    <label
      class="block space-y-2"
      v-motion
      :initial="{ opacity: 1, x: 0 }"
      :error="formState.errors.message ? shakeVariant.error : {}"
    >
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-message-square" class="w-4 h-4" />
        {{ t("portfolio.form.message") }}
      </span>
      <textarea
        v-model="form.message"
        rows="5"
        name="message"
        autocomplete="off"
        required
        @blur="validateField('message')"
        :class="[
          'w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all resize-none',
          formState.errors.message
            ? 'border-red-500 focus:ring-red-400'
            : 'border-white/10 focus:ring-brand-400 focus:border-transparent'
        ]"
        :placeholder="t('portfolio.form.message')"
      ></textarea>
      <p v-if="formState.errors.message" class="text-xs text-red-400 mt-1 animate-fadeIn">
        {{ t("portfolio.form.errors.messageRequired") || "Message must be at least 10 characters" }}
      </p>
    </label>
    <!-- submit -->
    <button
      type="submit"
      :disabled="formState.isSubmitting"
      v-motion
      :initial="{ scale: 1 }"
      :success="formState.isSuccess ? successVariant.success : {}"
      :class="[
        'group w-full px-6 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2',
        formState.isSuccess
          ? 'bg-green-500 text-white shadow-green-500/30'
          : 'bg-brand-500 text-neutral-900 shadow-brand-500/30 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5',
        formState.isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
      ]"
    >
      <!-- Loading State -->
      <UIcon
        v-if="formState.isSubmitting"
        name="i-lucide-loader-2"
        class="w-5 h-5 animate-spin"
      />
      <!-- Success State -->
      <UIcon
        v-else-if="formState.isSuccess"
        name="i-lucide-check-circle"
        class="w-5 h-5"
      />
      <!-- Default State -->
      <template v-else>
        <span>{{ t("portfolio.form.submit") }}</span>
        <UIcon
          name="i-lucide-send"
          class="w-5 h-5 group-hover:translate-x-1 transition-transform"
        />
      </template>
      <!-- Success Message -->
      <span v-if="formState.isSuccess">
        {{ t("portfolio.form.success") || "Message sent successfully!" }}
      </span>
      <!-- Submitting Message -->
      <span v-else-if="formState.isSubmitting">
        {{ t("portfolio.form.sending") || "Sending..." }}
      </span>
    </button>
  </form>
</template>
