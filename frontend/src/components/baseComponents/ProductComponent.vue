<template>
	<NavbarComponent></NavbarComponent>
	<div class="container">
	    <div class="row justify-content-center">
	        <div class="col-10">
	            <div class="block A">
	            	<!-- 治標不治本 -->
	                <img class="productItemImg" :src="`http://localhost:3000/${productInfo.url}`" alt="">
	            </div>
	            <div class="block B">
	                <div class="productItemName">
	                    <h1>{{ productInfo.title }}</h1>
	                    <hr>
	                    <h4>價格: NT${{ productInfo.price }}</h4>
	                    <h5>存貨：{{ productInfo.number }}</h5>
	                </div>
	                <div class="productItemCart">
	                    <h2>add cart</h2>
	                    <div class="qty-button">
	                        <div class="input-group qty">
	                            <button class="btn btn-outline-secondary" @click="removeNubmer()"> - </button>
	                            <input type="text" class="form-control text-center" v-model= "number"  readonly="readonly">
	                            <button class="btn btn-outline-secondary" @click="addNumber()"> + </button>
	                        </div>
	                        <button class="btn btn-outline-success mt-2 w-100" @click="addToCart(productsId, productId)"> 加入購物車</button>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <hr>
	        <div class="col-10 col-lg-6 mt-5 mb-5">
	            <h3>商品資訊</h3>
	            <p>{{ productInfo.description }}</p>
	        </div>
	    </div>
	</div>
	<FooterComponent></FooterComponent>
</template>

<script type="text/javascript">
	import  NavbarComponent from '@/components/NavbarComponent'
	import  FooterComponent from '@/components/FooterComponent'

	// use axios
	import axios from "axios";

	export default {
	  name: 'ShoppingCart',
	  components: {
	    NavbarComponent,
	    FooterComponent
	  },
	  data(){
	  	return{
	  		productsId: this.$route.params.productsId,
	  		productId: this.$route.params.productId,
	  		productInfo: [],
	  		number: 1
	  	}
	  },
	  computed:{
	    cart(){
	      return this.$store.state.cart 
	    },
	  },	
	  mounted(){
	  	const vm = this; // 取得vue實體
	  	let data = {
	  		productsId: vm.productsId
	  	}
	  	axios.post("/productApi", data)
	  	.then(async(res)=>{
	  		vm.productInfo.description = res.data.description
	  		vm.productInfo.price = res.data.price
	  		vm.productInfo.title = res.data.title
	  		await res.data.imgurls.forEach(function(item, index){
	  			if(item.id == vm.productId){
	  				vm.productInfo.number = item.productentry.number
	  				vm.productInfo.url = item.url
	  			}
	  		})
	  	}) 
	  },
	  methods:{
	  	addNumber(){
	  		if(this.number < 10){
				this.number++;
	  		}
	  	},
	  	removeNubmer(){
	  		if(this.number > 1){
				this.number--;
	  		}
	  	},
	    addToCart(productsId, productId){
	      let data = {
	        productsId,
	        productId,
	        number: 1,
	      }

	      if(this.number > 1){
	      	data.number = this.number
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

<style>
    .block{
        display:inline-block;
        box-sizing: border-box;
        text-align: center;
        padding: 10px;
        vertical-align: middle;
    }
    .A,.B{
        width:50%;
    }
    .productItemName,.productItemCart{
        height: 50%;
        padding:50px;
    }
    .productItemImg{
        width: 100%;
        margin: auto;
    }
@media screen and (max-width: 990px) {
  .A,.B{
    width: 100%;
  }
}
</style>