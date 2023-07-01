<template>
  <div class="product-section my-8">
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      Se ha agregado un producto nuevo al carrito
      <template v-slot:action="{ attrs }">
        <v-btn
          color="success"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <article class="product-unique" v-if="productUnique">
      <div class="products-images">
        <img
          class="img-fluid"
          :src="productUnique.image0url"
          :alt="productUnique.titulo"
        />
      </div>
      <div class="products-body">
        <h2 class="my-3">{{ productUnique.titulo }}</h2>
        <span>{{ productUnique.marca }}</span>
        <p>{{ productUnique.descripcion }}</p>
        <span class="distancia-focal"
          ><b>Distancia focal</b> {{ productUnique.distancia_focal }}mm</span
        >
        <span class="apertura"
          ><b>Apertura</b> {{ productUnique.apertura }}mm</span
        >
        <span class="price text-success mt-2">{{
          productUnique.precio | arsCurrency
        }}</span>
        <div class="my-2">
          <v-btn
            @click="agregarCarrito()"
            :disabled="isTooMany"
            :class="
              'd-block mt-4' +
              (isTooMany ? ' warning' : ' success')
            "
            color="success"
            x-large
          >
            Agregar al carrito
          </v-btn>
        </div>
        <v-alert class="mt-4" dense outlined type="error" v-if="isTooMany">
         Ya agregaste el producto al <router-link class="a-carrito" to="/carrito">carrito</router-link>
        </v-alert>
      </div>
    </article>
    <div v-else>
      <h2 class="mb-4">El id solicitado no existe</h2>
      <p>Vuelva a productos y seleccione un producto válido</p>
      <router-link to="/productos">Ir a productos</router-link>
    </div>
  </div>
</template>

<style scope lang="scss">
.product-section {
  max-width: 1200px;
  margin: auto;

  .product-unique {
    display: flex;
    justify-content: center;
    background: linear-gradient(to top, rgb(226, 226, 226), rgb(216 216 216));
    padding: 1rem;
    border-radius: 0.25rem;

    @media (max-width: 767px) {
      flex-direction: column;
    }

    .a-carrito {
      color: #f44336 !important;
      text-decoration: underline;
    }

    .products-body {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 60%;
      @media (max-width: 767px) {
        width: 100%;
        padding: 1rem;
      }

      .distancia-focal,
      .apertura {
        display: block;
        margin: 0.75rem 0;
      }

      .price {
        font-size: 2.5rem;

        @media (max-width: 575px) {
          font-size: 2rem;
        }

        @media (max-width: 360px) {
          font-size: 1.75rem;
        }
      }

      p {
        margin: 1rem 0 0 0;
      }
    }

    .products-images {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 40%;

      @media (max-width: 767px) {
        width: 100%;
      }

      img {
        border: none;
        background: rgb(245, 245, 245);
        height: 100%;
        width: 100%;
        border-radius: 0.25rem;
        object-fit: contain;

        @media (max-width: 991px) {
          height: 100%;
        }
      }
    }
  }
}
</style>

<script>
import API from '../api.js'

export default {
  name: 'ProductView',
  components: {},
  filters: {
    arsCurrency: function (value) {
      return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    }
  },
  async created () {
    const data = await (await fetch(`${API}/product/${this.$route.params.id}`)).json()
    this.productUnique = data.product
  },
  data: () => ({
    productUnique: null,
    local: null,
    isTooMany: false,
    multiLine: true,
    snackbar: false
  }),
  updated () {
    const data = this.refreshLocal()?.filter(
      (item) => item.id === this.productUnique.id
    )[0]
    if (data) {
      this.isTooMany = true
    }
  },
  methods: {
    agregarCarrito () {
      this.snackbar = true
      this.local = this.refreshLocal()
      if (!this.local) {
        this.productUnique.cantidad = 1
        localStorage.setItem('carrito', JSON.stringify([this.productUnique]))
      } else {
        if (!this.local.some((item) => item.id === this.productUnique.id)) {
          this.productUnique.cantidad = 1
          this.local.push(this.productUnique)
        } else {
          const data = this.local.filter(
            (item) => item.id === this.productUnique.id
          )[0]
          if (data) {
            this.isTooMany = true
            return
          }
          const index = this.local.indexOf(data)
          data.cantidad += 1
          this.local.splice(index, 1)
          this.local.push(data)
        }
        localStorage.setItem('carrito', JSON.stringify(this.local))
      }
      this.local = this.refreshLocal()
    },
    refreshLocal () {
      this.local = JSON.parse(localStorage.getItem('carrito'))
      this.local?.sort((a, b) => a.id - b.id)
      return this.local
    }
  }
}
</script>
