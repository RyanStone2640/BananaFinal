import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';
import axios from "axios";// use axios

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ProductView from '../views/ProductView.vue'
import MemberView from '../views/MemberView.vue'
import CheckOutView from '../views/CheckOutView.vue'
import UserShopCartView from '../views/UserShopCartView.vue'
import OrderView from '../views/OrderView.vue'

// import ShoppingCart from '@/components/ShopCartComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }, 
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/products',
    name: 'products',
    component: ShoppingCartView,
  },
  {
    path: '/producs/:productsId/product/:productId',
    name: 'product',
    component: ProductView
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: UserShopCartView,
  }, 
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOutView ,
  },     
  {
    path: '/member',
    name: 'member',
    component: MemberView,
  },  
  {
    path: '/order',
    name: 'order',
    component: OrderView,
  },   
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFoundView 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// title
router.beforeEach((to, from, next) => {
  document.title = "banana"
  next()
})

//  需登入才能顯示的路徑
router.beforeEach(async function(to, from, next){

  if (to.path == '/shopcart' || to.path == '/member' || to.path == '/checkout'  || to.path == '/order') {
    axios.get('/authApi')
      .then((res)=>{
        if(res.data.status == 1){
          next()
        }
        else if(res.data.status == 0){
          alert('尚未登入');  
          next('/login')
        }
      })
      .catch((err)=>{
        console.log("err");
       next('/login')
      })
  } 
  else {
    next()
  }
})
export default router
