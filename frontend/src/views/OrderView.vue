<template>
  <NavbarComponent></NavbarComponent>
	<OrderComponent class="content"></OrderComponent>
  <FooterComponent class="footer"></FooterComponent>
</template>


<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import OrderComponent from '@/components/OrderComponent.vue'

export default {
  name: 'OrderView',
  components: {
    NavbarComponent,
    FooterComponent,    
    OrderComponent,
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