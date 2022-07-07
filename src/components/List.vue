<template>
<!--
  1 - div .product-list лучше заменить на section, div .card на article .card.
    p .card-title исходя из названия класса заменяем на заголовок h2 .card-title.
  2 - в атрибус alt изображения прописываем назание товара
  3 - Ширину карточек товаров лучше задавать через media запросы, а не генерировать
    инлайн. Так как перерасчёт стилей происходит только при перезагрузке страницы.
    media запросы позволят реагировать на изменение размера окна и не засорять код 
    инлайн стилями
  4 - В карточках не хватает :key   
  5 - Нет отступов между карточками
  6 - Поля ввода не валидированы, можно вводить отрицательные числа. Можно ли вводить дробные числа?
-->
  <section class="product-list">
    <article class="card" 
      v-for="product in products" 
      :key="product.id"
    >
      <h2 class="card-title">{{ product.title }}</h2>
      <img class="card-image" :src="product.image" :alt="product.title">
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>

      <div>
        <input type="number" min="0" step="1" @keypress="isInteger" ref="amount" :id="product.id">
        <span>кг</span>
      </div>

      <button @click="addToCart(product)"> В корзину </button>
    </article>
  </section>
</template>

<script>
/*
  1 - cardsWidth не работает, потому что сравнивает width со строкой.
    Лучше сделать эту функциональность в стилях, через media 
  2 - Интервал обновления списка задан равным 1с в startPriceMonitoring, по ТЗ - 2с
  3 - startPriceMonitoring переписан. Теперь задержка 2с начинает отсчитываться после
    завершения запроса.
  4 - нет имени компонента
  5 - addToCart добавляет отдельные объекты в корзину, логиченее было бы проверять
    наличие товара в корзине и увеличивать его количество.
*/
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'List',
  computed: {
    ...mapState({
      products: 'products',
      currency: 'currency',
    }),
  },
  methods: {
    ...mapActions({
      getProductsList: 'getProductsList',
      saveToCart: 'addToCart',
    }),
    isInteger(e) {
      if ('0123456789'.indexOf(e.key) === -1) {
        e.preventDefault();
      }
    },
    addToCart(product) {
      const amount = +this.$refs.amount.find((input) => input.id === product.id).value;
      if (!amount) {
        return;
      }
      const payload = { 
        id: product.id,
        title: product.title,
        price: product.price,
        amount: amount
      }
      this.saveToCart(payload);
    },
    async startPricesMonitoring() {
      await this.getProductsList();
      await new Promise((res, rej) => setTimeout(res, 2000));
      await this.startPricesMonitoring();
    },
  },
  async created() {
    try {
      await this.startPricesMonitoring();
    }
    catch (err) {
      throw err;
    }
  },
};
</script>

<style>
  .product-list {
    padding: 10px;
  }
  .card {
    display: inline-block;
    width: 100%;
    border: 1px solid #908888;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    margin-bottom: 10px;
  }
  .card-image {
    width: 100%;
  }
  button {
    padding: 5px;
    margin: 5px;
  }
  @media only screen and (min-width: 420px) {
    .card {
      width: calc(50% - 5px);
    }
    .card:nth-child(2n) {
      margin-left: 10px;
    }
  }
  @media only screen and (min-width: 840px) {
    .card {
      width: calc(100% / 3 - 20px / 3);
    }
    .card:nth-child(2n) {
      margin-right: 10px;
    }
  }
</style>
