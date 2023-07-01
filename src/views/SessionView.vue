<template>
  <v-container>
    <v-row justify="center">
      <v-col class="col-xs-12 col-sm-10 col-md-8 col-xl-6 form-container">
        <h2 class="mb-5">Inicio de sesión</h2>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="logIn"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Correo"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="12"
            :rules="passwordRules"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>
          <v-alert class="mt-5" dense outlined type="error" v-if="failed">
               {{text}}
          </v-alert>
          <v-alert class="mt-5" dense outlined type="warning" v-if="isLoggedIn">
               {{text}}
          </v-alert>
          <v-btn
            :disabled="!valid"
            large
            type="submit"
            color="success"
            class="mt-5"
          >
            Entrar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scope lang="scss">
  .form-container {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 2rem;
  }
</style>

<script>
export default {
  name: 'SessionView',
  components: {},
  mounted () {
    if (localStorage.getItem('token') === 'Autenticado') {
      this.isLoggedIn = true
      this.text = 'Usted ya se encuentra logueado'
    }
  },
  data: () => ({
    valid: true,
    failed: false,
    isLoggedIn: false,
    text: '',
    email: '',
    emailRules: [
      v => !!v || 'El correo es requerido',
      v => /.+@.+\..+/.test(v) || 'Tiene que ser un correo electrónico válido'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'La contraseña es requerida',
      v => (v && v.length >= 6) || 'La contraseña debe tener 6 o más caracteres',
      v => (v && v.length <= 12) || 'La contraseña no puede tener más de 12 caracteres'
    ]
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async logIn () {
      const url = 'http://localhost:3001/api/user/login'
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const dataMessage = await response.json()
        if (dataMessage.message === 'Autenticado') {
          localStorage.setItem('token', dataMessage.message)
          this.$router.push('/mi-cuenta')
        } else if (dataMessage.message === 'Contraseña inválida') {
          this.failed = true
          this.text = 'La contraseña es inválida'
        } else {
          this.failed = true
          this.text = 'Usuario no encontrado'
        }
      } catch (err) {
        console.log(err)
        this.failed = true
        this.text = 'Ha ocurrido un problema'
      }
    }
  }
}
</script>
