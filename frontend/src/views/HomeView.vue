<template>
  <NavbarComponent></NavbarComponent>
  <div class="phoneVideo">
    <iframe width="100%" height="580"
      src="https://www.youtube.com/embed/XKfgdkcIUxw?modestbranding=1&autohide=0&showinfo=0&controls=0&autoplay=1&mute=1&fs=0&iv_load_policy=3&loop=1&playlist=XKfgdkcIUxw&rel=0"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
  </div>
  <div class="phonePage">
    <br>
    <h1>Bphone 13 Pro</h1>
    <h3>就。很。Pro</h3>
    <router-link to="/">購買 ></router-link>
    <br>
    <img class="phoneImg"
      src="https://www.apple.com/v/iphone-13-pro/f/images/meta/iphone-13-pro_overview__f8jyv9tx1pe2_og.png" alt="">
  </div>
  <div class="macPage">
    <br>
    <h1>BananaBook Pro</h1>
    <h3>超Banana</h3>
    <router-link to="/">購買 ></router-link>
    <br>
    <img class="macImg"
      src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/10/19/0/14362405.png&s=Y&x=152&y=0&sw=855&sh=570&exp=3600"
      alt="">
  </div>
  <div class="homePageSection">
    <div class="block a">
      <img class="blockImg" src="../assets/img1.png" alt="">
    </div>
    <div class="block b">
      <img class="blockImg" src="../assets/img2.png" alt="">
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<style>
.phonePage,
.macPage {
  width: 100%;
  height: 580px;
}

.phoneImg,
.macImg {
  max-width: 100%;
  height: 400px;
}

.homePageSection {
  max-width: 100%;
  /* height: 600px; */
  box-sizing: border-box;
}

.block{
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  vertical-align: top;
}
.a,.b {
  width: 50%;
}

.blockImg{
  height: 50%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
}
@media screen and (max-width: 900px) {
  .a,.b{
    width: 100%;
  }
  .img{
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
    height: 100%;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
  }
}
</style>



<script>
// @ is an alias to /src
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'HomeView',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>
