<template>
  <div class="tableContent">
    <h1>{{userName}}的訂單</h1>
    <template v-if="userOrderInfo.length == 0">
      <h1 class="nocart">
        目前沒有訂單喔!!!
      </h1>      
    </template>

    <template v-else>
      <template v-for="(data, index) of userOrderInfo">
        <div class="d-flex justify-content-between">
          <h5>
            訂單編碼:{{data[0].userOrderId}}
          </h5>
          <h5>
            刪除該筆訂單
            <i class="fa-solid fa-trash trashSize btnPointer" @click="removeOrder(data[0].userOrderId)"></i>
          </h5>        
        </div>
        <table class="table table-bordered col-md-8 col-lg-6 ">
          <thead>
            <tr class="table-secondary">
              <th scope="col">商品名稱</th>
              <th scope="col">圖片</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orderItem, index) of data">
              <th scope="row" class="align-middle" >{{orderItem.title}}</th>
              <td class="imgSize">
                <img :src="`http://localhost:3000/${orderItem.url}`" class="imgSize">
              </td>
              <td class="align-middle">{{orderItem.quantity}}</td>
              <td class="align-middle">NT${{orderItem.price}}</td>
              <td class="align-middle">NT${{orderItem.quantity * orderItem.price}}</td>
            </tr>
          </tbody>
            <tfoot>
            <tr class="table-secondary">
              <th scope="col">Total</th>
              <th scope="col"></th>
              <th scope="col">{{totalNumber[index]}}</th>
              <th scope="col"></th>
              <th scope="col">NT${{totalPrice[index]}}</th>
            </tr>
          </tfoot>
        </table>        
      </template>        
    </template>  
  </div>
  
  <div class="btn-group mt-3 mb-3" role="group" aria-label="Basic example">
    <router-link to='/shopcart' class="btn btn-secondary me-3 rounded-3">回到購物車</router-link>
  </div>
</template>

<script type="text/javascript">
import axios from "axios";

export default {
  name: 'OrderComponent',
  inject:['reload'],
  data(){
    return{
      userOrderInfo: [],
    }
  },
  computed:{
    userName(){
      return this.$store.state.userName 
    },
    totalNumber () {
      let totalNumberArr= []

      for(let value of this.userOrderInfo){
        let sum = 0
        for(let innerValue of value ){
          sum += innerValue.quantity 
        }
        totalNumberArr.push(sum)
      }
      return totalNumberArr
    },
    totalPrice() {
      let totalPriceArr = []
      for(let value of this.userOrderInfo){
        let sum = 0
        for(let innerValue of value ){
          sum += Number(innerValue.price)* innerValue.quantity 
        }
        totalPriceArr.push(sum)
      }
      return totalPriceArr
    }
  },
  mounted(){
    const vm = this; // 取得vue實體
    // 從後端獲得使用者order 資訊，並且顯示在畫面上
    vm.getUserOrder();
  },
  methods:{
      getUserOrder(){
      let promises = [];
      const vm = this;
      axios.get("/userOrderApi")
      .then((res)=>{
        // console.log(res)
        // 從後端獲得的該名使用者的訂單明細: [[], [], [], []]
        for(let orderArr of res.data){
          let productentryIdQuantityArr = []
          // 為訂單明細的內部arr
          let userOderArr = []

          for(let value of orderArr){
            productentryIdQuantityArr.push({
              productId: value.productentryId,
              productsId: value.bananaproductId,
              quantity: value.quantity,
              userOrderItemId: value.id,
              userOrderId: value.orderId           
            })
            let data = {
              productsId: value.bananaproductId
            }        
            promises.push(axios.post('/productApi', data))                    
          }
          Promise.all(promises)
          .then((res)=>{
            for(let value of productentryIdQuantityArr){
              let userOrderInfoItem = {}
              userOrderInfoItem.userOrderItemId = value.userOrderItemId
              userOrderInfoItem.userOrderId = value.userOrderId
              userOrderInfoItem.quantity = value.quantity
              for(let resValue of res){
                if(resValue.data.id == value.productsId){
                  userOrderInfoItem.title = resValue.data.title
                  userOrderInfoItem.price = resValue.data.price  
                }
                for(let imgInfo of resValue.data.imgurls){
                  if(imgInfo.id == value.productId){
                    userOrderInfoItem.url = imgInfo.url
                  }
                }               
              }
              userOderArr.push(userOrderInfoItem)                   
            }  
            return   userOderArr      
          })
          .then((res)=>{
            vm.userOrderInfo.push(res)     
          }) 
        }
        // console.log(vm.userOrderInfo)
      })
    },
    removeOrder(orderId){
      let vm = this        
      const yes = confirm('確定要整個刪除該筆訂單嗎？！');
      if(yes){
        let data = {
          orderId
        }
        axios.post("/removeOrder", data)
        .then((res)=>{
          if(res.data.status == 1){
            alert("已經刪除該筆訂單")
            vm.reload();
          }
          else{
            alert("發生錯誤")
          }
        })
        .catch((err)=>{
          console.log(err)
        }) 
      }         
    }
  }
}  	

</script>

<style type="text/css">
  
  .nocart{
    min-height: 80vh;
  }

  .imgSize{
    /*max-height: 25vh;*/
    max-width: 200px;
  }
  .trashSize{
    font-size: 1.5rem
  }
  .btnPointer{
    cursor: pointer;
  }
  .tableContent {
    padding: 4rem;
  }  
</style>