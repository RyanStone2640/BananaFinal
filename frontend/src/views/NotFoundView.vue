<template>
 <NavbarComponent></NavbarComponent>
  <h1>404 not found</h1>
  <FooterComponent></FooterComponent>
</template>

<style>
</style>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'NotFoundViewView',
  components: {
    NavbarComponent,
    FooterComponent
  },
}
</script>
