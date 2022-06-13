<template>
<div class="tableContent">
	<h1 class='mb-5'>{{userName}}的購物清單</h1> 
	<table class=" table table-bordered col-md-8 col-lg-6 p-3">
	<thead>
		<tr class="table-secondary">
		<th scope="col">商品名稱</th>
		<th scope="col">數量</th>
		<th scope="col">單價</th>
		<th scope="col">小計</th>
		</tr>
	</thead>
	<tbody v-for="(data, index) of userCartInfo">
		<tr >
		<th scope="row" class="align-middle" >{{data.title}}</th>
		<td class="align-middle">{{data.quantity}}</td>
		<td class="align-middle">{{data.price}}</td>
		<td class="align-middle">NT${{ data.quantity * data.price }}</td>
		</tr>
	</tbody>
		<tfoot>
		<tr class="table-secondary">
		<th scope="col">Total</th>
		<th scope="col">{{ totalNumber }}</th>
		<th scope="col"></th>
		<th scope="col">NT${{ totalPrice }}</th>
		</tr>
	</tfoot>
	</table>
</div>
<hr>

	<h2 class="orderTitle" style="text-align: center">訂單資料</h2>
	<hr class="order">

<div class="list">
	<div class="list1">
		<h3>收件資訊</h3>
		<hr>
		<input class="form-control mb-4" type="text" placeholder="收件人姓名" aria-label=".form-control-lg example">
		<input class="form-control mb-4" type="text" placeholder="Email" aria-label=".form-control-lg example">
		<input class="form-control mb-4" type="text" placeholder="Phone" aria-label=".form-control-lg example">
		<input class="form-control mb-4" type="text" placeholder="Address" aria-label=".form-control-lg example">
	</div>
	<div class="list2">
		<h3>付款方式</h3>
		<hr>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="cash" checked>
			<label class="form-check-label" for="cash">
				貨到付款
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="creditCard">
			<label class="form-check-label" for="creditCard">
				信用卡
			</label>
		</div>
		<div class="form-check mb-5">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="online">
			<label class="form-check-label" for="online">
				匯款
			</label>
		</div>

		<h3>備註</h3>
		<hr>
		<textarea class="textarea" rows="5"></textarea>
	</div>
</div>

<div class="btnGroup">
	<button class="btn1 btn btn-secondary" @click="toProducts()">繼續購物</button>
	<button class="btn2 btn btn-secondary">送出訂單</button>
</div>
	
</template>
<script type="text/javascript">
	import axios from "axios";

	export default {
	  name: 'CheckOutComponent',
	  data(){
	    return{
	      productentryIdQuantityArr:[],
	      userCartInfo: []
	    }
	  },
	  computed:{
	    userName(){
	      return this.$store.state.userName 
	    },	  	
	    totalNumber () {
	      let sum = 0
	      this.userCartInfo.forEach(function(item, index){
	        sum+=item.quantity
	      })
	      return sum
	    },
	    totalPrice() {
	      let total = 0
	      this.userCartInfo.forEach(function(item, index){
	        total+=Number(item.price)*item.quantity
	      })
	      return total     
	    }
	  },	  
	  mounted(){
    	const vm = this; // 取得vue實體
    	vm.getUserCart();
	  },	  
	  methods: {
	    getUserCart(){
	      let promises = [];
	      const vm = this;
	      axios.get("/userCartApi")
	      .then((res)=>{
	        for(let value of res.data){

	          //將productentryIdQuantit儲存，前者用來判斷商品，後者顯示數量
	          vm.productentryIdQuantityArr.push({
	            productId: value.productentryId,
	            productsId: value.bananaproductId,
	            quantity: value.quantity,
	            userCartItemId: value.id,

	          })

	          // bananaproductId用來使用api
	          let data = {
	            productsId: value.bananaproductId
	          }  
	           promises.push(axios.post('/productApi', data))     
	        }
	        Promise.all(promises)
	          .then((res) => {
	            for(let value of vm.productentryIdQuantityArr){
	              let userCartInfoItem = {}
	              userCartInfoItem.userCartItemId = value.userCartItemId
	              userCartInfoItem.quantity = value.quantity
	              for(let resValue of res){
	                if(resValue.data.id == value.productsId){
	                  userCartInfoItem.title = resValue.data.title
	                  userCartInfoItem.price = resValue.data.price  
	                }
	                for(let imgInfo of resValue.data.imgurls){
	                  if(imgInfo.id == value.productId){
	                    userCartInfoItem.url = imgInfo.url
	                  }
	                }               
	              }
	              vm.userCartInfo.push(userCartInfoItem)                      
	            }
	          })
	          // console.log(vm.userCartInfo)        
	        })
	    },	  	
	  	toProducts(){
	  		this.$router.push('/products')
	  	}
	  }
	
	} 
</script>

<style scoped>
.table {
	text-align: center;
	font-size: 1.2rem;
}
tbody, thead, tfoot {
	height:60px;
	line-height: 60px;
}
.orderTitle {
	margin-top: 5rem;
	margin-bottom: 1rem;
}
	.order {
		width:80%;
		margin: auto;
		margin-bottom: 1rem;
	}
	.list {
		display: flex;
	}
	.tableContent {
		padding: 4rem;
	}
	.list1 {
		display: inline-block;
		text-align: center;
		padding: 3rem;
		width: 50%;
	}
	.list1 input {
		height:60px;
	}
	.list2 {
		display: inline-block;
		text-align: center;
		padding: 3rem;
		width: 50%
	}
	.textarea{
		width:80%;
	}
	@media screen and (max-width: 768px) {
		.list{
			display: inline-block;
		}
		.list1, .list2{
			width: 100%
		}
	}
	.btnGroup {
		display: flex;
		justify-content: space-around;
		margin-bottom: 5rem;
	}
	.btn1 {
		margin-left: 30%;
		border-radius: 15%;
	}
	.btn2 {
		margin-right: 30%;
		border-radius: 15%;
	}
</style>