<template>
<!--
  1 - div .cart-list заменяем на ul .cart-list
  2 - Оборачиваем в section .cart-list-container
  3 - нет ключа у элементов списка
-->
  <section class="cart-list-container">
    <ul class="cart-list">
      <li class="cart-list-item" v-for="item in reversedCart" :key="item.id">
        <span>{{ item.title }} </span>
        <span>{{ item.amount }}кг </span>
        <span>{{ (item.price * 100) * item.amount / 100 }}{{ currency }}</span>
      </li>
    </ul>
  </section>

</template>

<script>
/*
  1 - Пошла кровь из глаз от названия spisok_dlya_rendera
  2 - Корзину достаём из store
  3 - Нет имени компонента
*/
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapState({
      currency: 'currency',
    }),
    ...mapGetters({
      reversedCart: 'reversedCart',
    })
  },
};
</script>

<style>
  .cart-list-container {
    padding: 10px;
  }
  .cart-list-item {
    display: flex;
    justify-content: space-between;
  }
</style>
