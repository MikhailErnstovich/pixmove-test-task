import api from '../../api/products.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
/*
  1 - Добавлены корзина, каталог и валюта.
*/

export default new Vuex.Store({
  state() {
    return {
      currency: 'VGTB',
      products: [],
      cart: [],
    }
  },
  actions: {
    async getProductsList({ commit }) {
      try {
        const data = await api.getProductsList();
        commit('setProductList', data);
      }
      catch (err) { 
        throw err;
      }
    },
    addToCart({ commit }, data) {
      commit('addToCart', data);
    }
  },
  mutations: {
    setProductList(state, data) {
      state.products = data;
    },
    addToCart(state, data) {
      const { id, title, amount, price } = data;
      const product = state.cart.find(el => el.id === id);
      if (!product) {
        state.cart.push({ id, title, price, amount });
      } else {
        product.amount += amount;
      }
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((acc, cur) => acc = (acc * 100 + cur.amount * (cur.price * 100)) / 100, 0);
    },
    reversedCart(state) {
      return state.cart.slice().reverse();
    }
  }
});
