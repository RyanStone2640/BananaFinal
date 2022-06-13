import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    cart:[],
    userId: '',
    userName: ''
  },
  getters: {
    totalNumber(state, data){
      let totalNumber = 0;
      state.cart.forEach(function(item, index){
        totalNumber+=item.number
      })
      return totalNumber
    },
  },
  mutations: {
    addCart(state, data){
      state.cart.push(data)
      return state.cart
    },
    removeCart(state, data){
      return state.cart.splice(data, 1);
    },
    emptyCart(state){
      state.cart = []
      return state.cart
    },   
    addNumber(state, data){
      for(let i = 0; i <= state.cart.length - 1; i++){
        if(state.cart[i].productId == data.productId){
          if(state.cart[i].number + data.number > 10){
            state.cart[i].number = 10
          }
          else{
            state.cart[i].number+=data.number
          }
          return state.cart
        }
      }
    },
    addUserName(state, data){
      state.userName = data
    },
    addUserId(state, data){
      state.userId = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]  
})
