<template>
  <v-card :loading="loading" class="mx-auto my-3">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="product.image0url"
    ></v-img>

    <v-card-title>{{ product.titulo }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="price">{{ product.precio | arsCurrency }}</div>

      <p class="description">{{ product.descripcion }}</p>
    </v-card-text>
    <v-card-actions>
      <router-link
        :to="'/producto/' + product._id"
        class="ver-mas primary"
        text
        @click="goToView"
      >
        Ver más
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<style scope lang="scss">
p {
  font-size: 1rem !important;
}
.price {
  margin: 1.75rem 0 1rem 0 !important;
  font-size: 1.5rem !important;
}
.description {
  display: -webkit-box;
  height: 81px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  margin: 0.5rem 0 0 0 !important;
}

.v-image__image--cover {
  background-size: contain;
}

.v-card__actions {
  padding: 0 1rem 1rem 1rem !important;

  .ver-mas {
    font-size: 1.25rem !important;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;

    a {
      padding: 2rem;
    }
  }
}
</style>

<script>
export default {
  name: 'ProductsComponent',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  filters: {
    arsCurrency: function (value) {
      return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    }
  },
  data: () => ({
    loading: false,
    selection: 1
  }),
  methods: {
    goToView () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  }
}
</script>
