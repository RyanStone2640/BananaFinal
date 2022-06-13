<template>
	<NavbarComponent></NavbarComponent>
	<SignupComponent></SignupComponent>
	<FooterComponent></FooterComponent>	
</template>

<script>
// @ is an alias to /src
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SignupComponent from '@/components/AccountComponents/SignupComponent.vue'

export default {
  name: 'LoginView',
  components: {
    NavbarComponent,
    FooterComponent,    	
    SignupComponent,
  }
}
</script>

	<style>
	</style>