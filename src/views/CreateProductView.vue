<template>
  <v-container>
    <v-row justify="center">
      <v-col class="col-10 crear-producto">
        <h2 class="mb-8">Crear producto</h2>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="guardar"
          enctype="multipart/form-data"
        >
          <v-text-field v-model="titulo" label="Título" required></v-text-field>
          <v-textarea
            v-model="descripcion"
            label="Descripción"
            required
          ></v-textarea>
          <v-text-field v-model="marca" label="Marca" required></v-text-field>
          <v-text-field v-model="modelo" label="Modelo" required></v-text-field>
          <v-text-field
            v-model="precio"
            label="Precio"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="distancia_focal"
            label="Distancia focal"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="apertura"
            label="Apertura"
            type="number"
            required
          ></v-text-field>
          <v-file-input
            v-model="file"
            placeholder="Elegí una imagen"
            class="mt-5"
            prepend-icon="mdi-camera"
            label="Imagen del producto"
          ></v-file-input>
          <v-alert dense outlined class="mt-7" type="error" v-if="errorForm">
             Ha ocurrido un error, verifica de haber completado todos los campos
          </v-alert>
          <v-btn
            :disabled="!valid"
            x-large
            type="submit"
            color="success"
            class="mt-7"
          >
            Guardar
            <v-progress-circular
              indeterminate
              :size="25"
              color="white"
              class="ml-3"
              v-if="isNotLoaded"
            ></v-progress-circular>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scope lang="scss">
  .crear-producto {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 2rem;
    border-radius: 0.25rem;
  }
</style>

<script>
import { API } from '../api.js'

export default {
  name: 'CreateProductView',
  components: {},
  data: () => ({
    valid: true,
    failed: false,
    isNotLoaded: false,
    errorForm: false,
    text: '',
    titulo: '',
    descripcion: '',
    marca: '',
    modelo: '',
    precio: '',
    distancia_focal: '',
    apertura: '',
    file: null
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async guardar () {
      this.isNotLoaded = true
      const url = `${API}/product`
      const formData = new FormData()
      formData.append('titulo', this.titulo)
      formData.append('descripcion', this.descripcion)
      formData.append('marca', this.marca)
      formData.append('modelo', this.modelo)
      formData.append('precio', this.precio)
      formData.append('distancia_focal', this.distancia_focal)
      formData.append('apertura', this.apertura)
      formData.append('image0url', this.file)
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData
        })
        const dataStatus = await response.json()
        if (dataStatus.status === 'Success') {
          this.errorForm = false
          this.$router.push('/mi-cuenta')
        } else {
          this.isNotLoaded = false
          this.errorForm = true
          this.failed = true
          this.text = 'Ha ocurrido un error'
        }
      } catch (err) {
        console.log(err)
        this.isNotLoaded = false
        this.errorForm = true
        this.failed = true
        this.text = 'Ha ocurrido un error'
      }
    }
  }
}
</script>
