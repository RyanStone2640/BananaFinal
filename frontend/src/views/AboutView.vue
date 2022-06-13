<template>
  <NavbarComponent></NavbarComponent>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-8">
        <h2>關於我們</h2>
        <p>Banana，起初是由三個養程班的同學突發其想，在某個小教室裡討論所誕生的。<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在這個與時俱進的時代裡，3C產品已經變成每個人生活中不可或缺的存在，想要跟上這個時代的洪流，在這樣的理念下，我們創造了最初的發想，首先嘗試做出了我們的第一個形象網站以及第一部智能手機Bphone，在積極推銷自家的產品理念後，很幸運的，我們得到了許多貴人的幫助以及贊助，才能有現在如此規模的成長，之後的幾年時間，也陸續推出了BananaBook、Banana Watch等智慧型商品，我們的未來展望，就如我們最初的發想理念，希望顧客們都可以躋身在這科技洪流之中，為此，我們會繼續研發並且精進自己，讓Banana的家庭更加壯大。</p>
      </div>
    </div>
    <img class="aboutImg" src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios14-memoji-hero.jpg" alt="">
  </div>
  <FooterComponent class="fixed-bottom"></FooterComponent>
</template>

<style>
  .aboutImg{
    max-width:50%
  }
</style>

<script>
// @ is an alias to /src
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'AboutView',
  components: {
    NavbarComponent,
    FooterComponent
  },
}
</script>
