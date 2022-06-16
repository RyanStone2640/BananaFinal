<template>
  <NavbarComponent></NavbarComponent>
  <div class="btn-group mt-3 mb-3 d-flex flex-wrap m-auto" role="group" aria-label="Basic example"  style="max-width: 80%">
    <button type="button" class="btn btn-secondary me-3 rounded-3 btnRwd"  v-for="(data, index) of category" @click="changeCart(data.type)">{{ data.type }}</button>
  </div>
  <keep-alive>
    <component :is="currentTab"></component>
  </keep-alive>
  <FooterComponent></FooterComponent>   
</template>


<script>
import NotebookCartComponent from '@/components/CartComponents/NotebookCartComponent'
import SmartphoneCartComponent from '@/components/CartComponents/SmartphoneCartComponent'
import TabletCartComponent from '@/components/CartComponents/TabletCartComponent'
import AccessoriesComponent from '@/components/CartComponents/AccessoriesComponent'

import  NavbarComponent from '@/components/NavbarComponent'
import  FooterComponent from '@/components/FooterComponent'

// use axios
import axios from "axios";

export default {
  name: 'ShoppingCartView',
  components: {
    NotebookCartComponent,
    SmartphoneCartComponent,
    TabletCartComponent,
    AccessoriesComponent,
    NavbarComponent,
    FooterComponent
  },
  data(){
    return{
      category: [],
      currentTab: 'NotebookCartComponent',
    }
  },
  methods:{
    changeCart(data){
      this.currentTab = `${data}Component`;
    }
  },
  mounted(){
    axios.get('/categoryApi')
      .then((res)=>{
        this.category = res.data
      })
      .catch((err)=>{
        console.log(err);
      })     
  },
}
</script>


<style type="text/css" scoped>
@media screen and (max-width: 768px){
  .btnRwd {
    max-width: 50%;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 576px){
  .btnRwd {
    max-width: 100%;
    margin-bottom: 10px;
  }
}
</style>