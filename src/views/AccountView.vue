<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{text}}
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
    <h2>Bienvenido al panel de administración</h2>
    <v-row justify="center">
      <v-col class="col-12">
        <router-link to="/crear-producto"><v-btn class="primary my-8" x-large>Crear nuevo producto</v-btn></router-link>
      </v-col>
      <v-col class="col-12">
        <h3 class="mb-5">Productos publicados</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
               <th class="text-left">
                  Imagen
                </th>
                <th class="text-left">
                  Titulo
                </th>
                <th class="text-left">
                  Modelo
                </th>
                <th class="text-left">
                  Precio
                </th>
                <th class="text-left">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in products"
                :key="item.id"
                :class="index % 2 ? 'bg-else' : 'bg-beige'"
              >
                <td><img class="img-fluid" :src="item.image0url" :alt="item.titulo" /></td>
                <td>{{ item.titulo }}</td>
                <td>{{ item.modelo }}</td>
                <td class="price">{{ item.precio | arsCurrency }}</td>
                <td>
                  <router-link class="edit-btn" :to="'/editar-producto/'+item._id">
                    <v-btn class="warning">
                      Editar
                    </v-btn>
                  </router-link>
                  <v-btn class="error" @click="eliminarProducto(item._id)">
                    Eliminar
                  <v-progress-circular
                    indeterminate
                    :size="20"
                    color="white"
                    class="ml-3"
                    v-if="item._id == id"
                  ></v-progress-circular>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scope lang="scss">
  h3 {
    font-size: 1.5rem;
  }

  .img-fluid {
    width: 140px;
    padding: 1rem;
    height: auto;
  }

  .price {
    font-size: 1.25rem !important;
    color: #1a156b;
  }

  .bg-beige {
    background-color: #f5f5dcb0;
  }

  .bg-else {
    background-color: #1a156b14;
  }

  .edit-btn {
    margin-right: 1rem;
    @media (max-width: 1300px) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
</style>

<script>
import Swal from 'sweetalert2'
import { API } from '../api.js'

export default {
  name: 'AccountView',
  components: {},
  async created () {
    const data = await (await fetch(`${API}/products`)).json()
    this.products = data.products
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
    products: [],
    multiLine: true,
    id: null,
    snackbar: false,
    text: ''
  }),
  methods: {
    async eliminarProducto (id) {
      Swal.fire({
        title: '¿Estas seguro de eliminarlo?',
        text: 'No podras deshacer esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.id = id
          const url = `${API}/product/${id}`
          try {
            const response = await fetch(url, {
              method: 'DELETE'
            })
            const dataStatus = await response.json()
            if (dataStatus.status === 'Success') {
              this.snackbar = true
              this.text = 'Se ha eliminado el producto correctamente'
              window.location.reload()
            } else {
              this.snackbar = true
              this.text = 'Ha ocurrido un error al eliminar el producto'
            }
          } catch (err) {
            console.log(err)
            this.snackbar = true
            this.text = 'Ha ocurrido un error al eliminar el producto'
          }
        } else {
          this.snackbar = true
          this.text = 'El producto no se ha eliminado'
        }
      })
    }
  }
}
</script>
