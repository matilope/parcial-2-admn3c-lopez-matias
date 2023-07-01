<template>
  <v-container>
    <h2 class="mb-5">Catálogo de productos</h2>
    <v-row>
      <v-col
        class="col-xs-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="product in products"
        :key="product.id"
      >
        <products-component :product="product"></products-component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductsComponent from '@/components/ProductsComponent.vue'
import API from '../api.js'

export default {
  name: 'ProductView',
  components: {
    ProductsComponent
  },
  async created () {
    const data = await (await fetch(`${API}/products`)).json()
    this.products = data.products
  },
  data: () => ({
    products: [],
    options: [
      {
        name: 'Precio',
        optionsLabel: [
          { name: 'Menor precio', method: 'priceOrder', order: true },
          { name: 'Mayor precio', method: 'priceOrder', order: false }
        ]
      },
      {
        name: 'Apertura',
        optionsLabel: [
          { name: 'Menor apertura', method: 'apertureOrder', order: true },
          { name: 'Mayor apertura', method: 'apertureOrder', order: false }
        ]
      }
    ],
    searchInput: '',
    searchProducts: null
  }),
  methods: {
    priceOrder (order) {
      this.resetValues()
      const newOrder = this.products.sort((a, b) => b.precio - a.precio)
      this.products = !order ? newOrder : newOrder.reverse()
    },
    apertureOrder (order) {
      this.resetValues()
      const newOrder = this.products.sort((a, b) => b.apertura - a.apertura)
      this.products = !order ? newOrder : newOrder.reverse()
    },
    search () {
      const newSearch = this.products.filter((item) =>
        item.titulo.toLowerCase().includes(this.searchInput.toLowerCase())
      )
      this.searchProducts = newSearch
      this.searchInput = ''
    },
    resetValues () {
      this.searchProducts = null
      this.searchInput = ''
    }
  }
}
</script>
