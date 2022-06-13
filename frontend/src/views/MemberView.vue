<template>
  <NavbarComponent></NavbarComponent>
  <MemberComponent></MemberComponent>
  <FooterComponent></FooterComponent>   
</template>


<script>
import  NavbarComponent from '@/components/NavbarComponent'
import  MemberComponent from '@/components/MemberComponent'
import  FooterComponent from '@/components/FooterComponent'

// use axios
import axios from "axios";

export default {
  name: 'MenberVieww',
  components: {
    NavbarComponent,
    MemberComponent,
    FooterComponent
  },
  data(){
    return{
    }
  },
  computed:{
    userId(){
    }
  },
  methods:{
  },
  mounted(){
  },
}
</script>


<style type="text/css" scoped>
</style>