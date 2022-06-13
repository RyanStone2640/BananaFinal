<template>
  <NavbarComponent></NavbarComponent>
  <LoginComponent></LoginComponent>
  <FooterComponent></FooterComponent>
</template>

<script>
// @ is an alias to /src
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LoginComponent from '@/components/AccountComponents/LoginComponent.vue'

export default {
  name: 'LoginView',
  components: {
    NavbarComponent,
    FooterComponent,    
    LoginComponent,
  }
}
</script>


<style>
	.mid1 {
		margin: auto;
	}
</style>