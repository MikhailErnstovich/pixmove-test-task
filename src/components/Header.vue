<template>
<!--
  1 - template обычно прописывается в верху компонента
  2 - div .header лучше заменить на header или header .header с точки зрения семантики
  3 - Если заголовок на сайте только один, значит он будет заголовком первого уровня
    и должен быть h1 вместо h3.
-->
  <header class="header">
    <h1>Товаров в корзине на: {{ total }} {{ currency }}</h1>
  </header>
</template>

<script>
/*
  1 - Неправильная валидация props cart. И вообще корзину лучше сделать через store state,
    чтобы зафиксировать правила взаимодействия с ней. В таком случае и валидация не потребуется.
  2 - В случае реализации корзины через store, watcher заменяется на computed, который использует
    getter для вычисления суммы товаров.
  3 - Общая сумма товаров вычисляется не верно из-за ошибки округления дробных чисел.
*/
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      total: 'cartTotal',
    }),
    ...mapState({
      currency: 'currency'
    })
  },
}
</script>

<style scoped>
  .header {
    padding: 10px;
    background: #e5e5e5;
  }
</style>


