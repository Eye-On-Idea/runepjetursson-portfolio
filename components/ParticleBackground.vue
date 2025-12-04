<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const props = defineProps<{
  particleCount?: number
  particleColor?: string
  particleSize?: number
  speed?: number
  interactive?: boolean // Particles respond to cursor
  connectionLines?: boolean // Draw lines between close particles
  connectionDistance?: number
}>();

const reducedMotionPreference = usePreferredReducedMotion()
const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let particles: Particle[] = []
let mouseX = 0
let mouseY = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

const createParticle = (width: number, height: number): Particle => {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * (props.speed || 0.5),
    vy: (Math.random() - 0.5) * (props.speed || 0.5),
    size: Math.random() * (props.particleSize || 3) + 1,
    opacity: Math.random() * 0.5 + 0.3,
  }
}

const drawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle
) => {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.fillStyle = `${props.particleColor || 'rgba(204, 31, 53, '}${particle.opacity})`
  ctx.fill()
}

const drawConnection = (
  ctx: CanvasRenderingContext2D,
  p1: Particle,
  p2: Particle,
  distance: number,
  maxDistance: number
) => {
  const opacity = (1 - distance / maxDistance) * 0.3
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.strokeStyle = `rgba(83, 124, 255, ${opacity})`
  ctx.lineWidth = 1
  ctx.stroke()
}

const updateParticle = (
  particle: Particle,
  width: number,
  height: number
) => {
  // Update position
  particle.x += particle.vx
  particle.y += particle.vy

  // Interactive mode - particles attracted to mouse
  if (props.interactive) {
    const dx = mouseX - particle.x
    const dy = mouseY - particle.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 150) {
      const force = (150 - distance) / 150
      particle.vx += (dx / distance) * force * 0.1
      particle.vy += (dy / distance) * force * 0.1
    }
  }

  // Apply friction
  particle.vx *= 0.99
  particle.vy *= 0.99

  // Wrap around edges
  if (particle.x < 0) particle.x = width
  if (particle.x > width) particle.x = 0
  if (particle.y < 0) particle.y = height
  if (particle.y > height) particle.y = 0
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update and draw particles
  particles.forEach((particle) => {
    updateParticle(particle, canvas.width, canvas.height)
    drawParticle(ctx, particle)
  })

  // Draw connection lines
  if (props.connectionLines) {
    const maxDistance = props.connectionDistance || 120
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          drawConnection(ctx, particles[i], particles[j], distance, maxDistance)
        }
      }
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Recreate particles on resize
  particles = []
  for (let i = 0; i < (props.particleCount || 50); i++) {
    particles.push(createParticle(canvas.width, canvas.height))
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!props.interactive) return
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  if (prefersReducedMotion.value) return

  const canvas = canvasRef.value
  if (!canvas) return

  // Set canvas size
  handleResize()

  // Create particles
  for (let i = 0; i < (props.particleCount || 50); i++) {
    particles.push(createParticle(canvas.width, canvas.height))
  }

  // Start animation
  animate()

  // Event listeners
  window.addEventListener('resize', handleResize)
  if (props.interactive) {
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  window.removeEventListener('resize', handleResize)
  if (props.interactive) {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <canvas
    v-if="!prefersReducedMotion"
    ref="canvasRef"
    class="particle-background fixed inset-0 pointer-events-none"
    :style="{ opacity: 0.6, zIndex: 0 }"
  ></canvas>
</template>

<style scoped>
.particle-background {
  mix-blend-mode: screen;
}
</style>
