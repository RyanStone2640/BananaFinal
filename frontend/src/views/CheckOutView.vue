<template>
  <NavbarComponent></NavbarComponent>
  <CheckOutComponent class="content"></CheckOutComponent>
  <FooterComponent  class="footer"></FooterComponent>
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

<style type="text/css" scoped>
.content{
  height: 80%;
}

.footer{
height:  20%
}
</style>