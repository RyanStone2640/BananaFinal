<template>
<div>
  <div class="card" style="width: 18rem; height: 30rem;"> 
      <router-link :to="`/producs/${productsId}/product/${parentProduct.imgurls[changeImgIndex].id}`">
        <img  class="card-img-top" v-for="(img, index) of parentProduct.imgurls" :src="img.url" v-show="index == changeImgIndex">
      </router-link>    
      <div class="card-body">
        <h5 class="card-title">{{ parentProduct.title }}</h5>
        <p class="card-text">NT${{ parentProduct.price }}</p>
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-center">
            <button  class="btnColor" v-for="(item, index) of parentProduct.colors" :style="{background: item.Colorcode}" @click="changeImg(index)" >
            </button>         
          </div>
          <button class="btn btn-primary" @click="addToCart(productsId, parentProduct.imgurls[changeImgIndex].id)">加入購物車</button>            
        </div>
      </div>
  </div>
</div>    
</template>


<script>
export default {
  name: 'CartComponent',
  props:['parentProduct', 'productsId'],
  data(){
    return{ 
      changeImgIndex: 0
    }
  },
  computed:{
    cart(){
      return this.$store.state.cart 
    },
  },
  methods:{
    changeImg(index){
      this.changeImgIndex = index
    },
    addToCart(productsId, productId){
      let data = {
        productsId,
        productId,
        number: 1,
      }

      // 判斷有沒有加入，有了就將數量加一
      for(let i = 0; i <= this.cart.length - 1; i++){
        if((this.cart[i].productId == data.productId) &&  this.cart[i].number < 10) {
          this.$store.commit('addNumber', data)
          alert(`此商品已經購買${this.cart[i].number}件`)
          return false
        }
        else if(this.cart[i].productId == data.productId &&  this.cart[i].number == 10) {
          alert(`最多只能購買10件!`)
          return false
        }
      }
      this.$store.commit('addCart', data)
      alert(`成功加入購物車!`)
    }
  }
}
</script>

<style type="text/css" scoped>

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;   
}   
.cartContainer{
  position: relative;
}

/* btn color*/
.btnColor{
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 5px;
  border: none;
}

</style>