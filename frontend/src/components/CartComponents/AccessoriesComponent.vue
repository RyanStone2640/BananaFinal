<template>
	<div class="cartBoxContainer">
		<CartComponent v-for="(product,index) of products" :parent-product="product" :products-id="product.id" parent-name="Accessories" class="cartBox">
		</CartComponent>	
	</div>
</template>

<script type="text/javascript">
import CartComponent from '@/components/baseComponents/CartComponent'

// use axios
import axios from "axios";

export default {
  	name: 'NotebookCartComponent',
  	components: {
    	CartComponent
 	 },
  	data(){
			return{
			  products: [],
			}
	},
	methods: {
		changeImg(index){
			this.changeImgIndex = index
		}
	},
  mounted(){
  	const vm = this; // 取得vue實體
  	let data = {
  		categoryId: 4
  	}
  	axios.post("/productsAllApi", data)
  	.then((res)=>{
  		// console.log(res.data)
  		this.products = res.data
  	}) 
  },	
}
</script>


<style type="text/css" scoped>

.cartBoxContainer{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.cartBox{
  margin: 0.5rem;
}	
</style>

