<template>
	<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active" aria-current="page" to="/">首頁</router-link>
	    </li>
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active" to="/signup" v-show="!isLogin">註冊</router-link>
	    </li>
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active" to="/login" v-show="!isLogin">登入</router-link>
	        <button @click="logout()" v-show="isLogin" class="nav-link nonBtn ms-auto me-auto" active-class="active">登出</button>
	    </li>
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active" to="/about">關於我們</router-link>
	    </li>
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active"  to="/products">商品一覽</router-link>
	    </li>
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active" to="/shopcart">購物車</router-link>	        
	    </li>	    
	    <li class="nav-item">
	        <router-link class="nav-link" active-class="active" to="/member" v-show="isLogin"><i class="fa-solid fa-user">會員資訊</i></router-link>	        
	    </li>		    
	</ul>	
</template>

<script>
import Cookies from 'js-cookie';
import axios from "axios";// use axios

export default {
  name: 'MenuComponent',
  data(){
    return{
    }
  },
  computed:{
    isLogin(){
      return  Cookies.get("user") !== undefined ? true: false
    },      
  },
  methods:{
  	logout(){
  		const vm = this
  		//如何解決路由問題
	    axios.post("http://localhost:3000/logout")
	      .then((res)=>{
	      	if(res.data.status == 1){
						alert(`已經登出!`)
						Cookies.remove("user") 
	      		this.$router.push('/')
	      	}
	      })
	      .catch((err)=>{
	        console.log("err");
	      })  		
  	}
  }
}
</script>
<style type="text/css" scoped>
.nonBtn{
	border: none;
	background: transparent;
}
</style>