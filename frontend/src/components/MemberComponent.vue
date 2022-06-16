<template>
<main>

	<div class="mainTitle">
		<h1 class="mb-5">{{user.name}}的會員資訊</h1>
	</div>
	
	<div class="mainContent mb-4">
		<div class="input">
			<div class="input-group mb-3">
				<input type="text" class="form-control"  aria-label="Name" aria-describedby="basic-addon1"  v-model="user.name"  v-bind:class="{ 'is-invalid': nameError }">
				<span class="input-group-text" id="basic-addon1">name</span>
				<div class="invalid-feedback">{{nameErrMsg}}</div>
			</div>
			<div class="input-group mb-3">
				<input type="text" class="form-control" aria-label="Phone" aria-describedby="basic-addon3"  v-model="user.phone" v-bind:class="{ 'is-invalid': phoneError }" maxlength="10">
				<span class="input-group-text" id="basic-addon3">phone</span>
				<div class="invalid-feedback">{{phoneErrMsg}}</div>
			</div>

			<div class="input-group mb-3">
				<input type="text" class="form-control"  aria-label="Email Address" aria-describedby="basic-addon2" v-model="user.email" v-bind:class="{ 'is-invalid': emailError }">
				<span class="input-group-text" id="basic-addon2">email</span>
				<div class="invalid-feedback">{{emailErrMsg}}</div>
			</div>
		</div>
	</div>
	<button  class="btn btn-secondary" @click="editUser()">修改個人資訊</button>
</main>
	<div class="order">
		<div class="orderContent">
			<div class="orderCard card1">
				<h3 class="mb-3">您的訂單</h3>
				<p>追蹤、修改或取消訂單，或進行退貨。</p>
				<router-link to="/order">查看你的訂單記錄</router-link>
			</div>
			<div class="orderCard card2">
				<h3 class="mb-3">聯絡客服</h3>
				<p>客服電話: (02)XXXX-XXXX</p>
				<p>地址: 台灣的某一個地方</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import axios from "axios";

export default {
  name: 'MemberComponent',
  components:{
  },
  data(){
  	return{
  		user: {},
		  nameError: false,
		  nameErrMsg: '',
		  phoneError: false,
		  phoneErrMsg: '',
		  emailError: false,
		  emailErrMsg: '',
  	}
  },
  watch:{
		"user.name": function () {
      const re =/^[a-zA-Z0-9]+$/;
      if (this.user.name == '') {
				this.nameError = true;
          this.nameErrMsg = '請填入使用者名稱!'            	
        } 
			else if(!re.test(this.user.name)){
				this.nameError = true;
            this.nameErrMsg = '請勿包含特殊字元！'
      }
			else {
				this.nameError = false
			}
		},
		"user.phone": function () {
			const re = /^09\d{8}$/;

			if (this.user.phone == '') {
				this.phoneError = true;
				this.phoneErrMsg = '請填入手機號碼!'            	
			}             
			else if (!re.test(this.user.phone)) {
				this.phoneError = true;
				this.phoneErrMsg = '手機格式錯誤！'
			} 
			else {
				this.phoneError = false
			}
		},
		"user.email": function () {
			const re = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
			if (this.user.email == '') {
				this.emailError = true;
				this.emailErrMsg = '請填入信箱!'            	
			}               
			else if (!re.test(this.user.email)) {
				this.emailError = true;
				this.emailErrMsg = '格式錯誤！'
			} 
			else {
				this.emailError = false
			}
		},  	
	},  
  computed:{
    userId(){
      return this.$store.state.userId
    }
  },
  methods:{
  	editUser(){
			if(this.nameError=== true || this.phoneError===true || this.emailError===true) {
			  alert('輸入格式有錯！');
			  return false
		  }
		  else{
	  		axios.post("/editUserInfo", this.user)
	  		.then((res)=>{
	  			if(res.data.status == 1){
	  				alert("資料更新成功")
	  			}
	  			else if(res.data.status == 2){
	  				alert("該email已經註冊過!")
	  			}
	  			else{
	  				alert("資料更新失敗")
	  			}
	  		})
	  		.catch((err)=>{
	  			console.log(err)
	  			alert("資料更新失敗")
	  		})
		  } 
  	}
  },
  mounted(){
  	let data = {
			userId: this.userId
  	}
    axios.post("/userInfomationApi", data)
    .then((res)=>{
    	let {name, email, phone} = res.data
    	this.user.id = this.userId
    	this.user.name = name
    	this.user.email = email
    	this.user.phone = phone
    })
    .catch((err)=>{
    	console.log(err)
    })
  },
}  		
</script>

<style scoped>
	main {
		padding: 2rem
	}
	img {
		height: 100%;
		width:100%
	}
	.input {
		width: 40%;
		margin: auto;
	}
	.orderContent {
		background-color: rgba(223, 223, 223, 0.688);
		width:100%;
		height:300px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.orderCard {
		background-color: white;
		height: 200px;
		width: 40%;
		padding: 2.5rem;
	}
	.card1 {
		margin-left: 5rem;
	}
	.card2 {
		margin-right: 5rem;
	}
</style>