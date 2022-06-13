<template>
  <NavbarComponent></NavbarComponent>
  <CheckOutComponent></CheckOutComponent>
  <FooterComponent></FooterComponent>
</template>

<script>
// @ is an alias to /src
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CheckOutComponent from '@/components/CheckOutComponent.vue'

export default {
  name: 'CheckOutView',
  components: {
    NavbarComponent,
    FooterComponent,    
    CheckOutComponent
  }
}
</script>


<style>
</style>