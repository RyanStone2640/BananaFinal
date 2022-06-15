<template>
  <NavbarComponent></NavbarComponent>
	<ShopCartComponent class="content"></ShopCartComponent>
  <FooterComponent class="footer"></FooterComponent>
</template>


<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ShopCartComponent from '@/components/ShopCartComponent.vue'

export default {
  name: 'UserShopCartView',
  components: {
    NavbarComponent,
    FooterComponent,    
    ShopCartComponent,
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