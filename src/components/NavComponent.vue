<template>
  <div>
    <v-container>
      <v-row class="py-5 px-3" align="center" justify="space-between">
        <a href="/" class="icon-shopping">
          <v-icon>mdi-shopping-outline</v-icon>
        </a>
        <v-btn class="menu-color" @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" class="primary" absolute temporary>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <template v-if="isAuth || item.title !== 'Mi cuenta'">
              <router-link :to="item.url">
                <v-list-item-icon>
                  <v-icon class="white--text">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
              </router-link>
           </template>
          </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2 log-container">
          <template v-if="isAuth">
            <v-btn block @click="logOut()">
              Cerrar sesión
            </v-btn>
          </template>
          <template v-else>
            <router-link class="incio-sesion-btn" to="/inicio-sesion">
              <v-btn block>
                Iniciar sesión
              </v-btn>
            </router-link>
          </template>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<style scope lang="scss">
a {
  color: white !important;
  text-decoration: none;
  display: inline-flex;
}

.incio-sesion-btn {
  width: 100%;
}

.v-navigation-drawer {
  height: 100svh !important;

  .log-container {
    text-align: center;
    background: #aeaeae17;
  }
}

.menu-color {
  padding: 1.5rem 1rem !important;

  i {
    color: #1a156b !important;
    font-size: 2rem !important;
  }
}

.icon-shopping {
  i {
    color: #1a156b !important;
    font-size: 3rem !important;
  }
}
</style>

<script>
export default {
  name: 'NavComponent',
  filters: {
    uppercase (texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    }
  },
  updated () {
    this.isAuthenticate()
  },
  data: () => ({
    drawer: false,
    isAuth: false,
    items: [
      {
        title: 'Inicio',
        url: '/',
        icon: 'mdi-view-dashboard'
      },
      {
        title: 'Productos',
        url: '/productos',
        icon: 'mdi-telescope'
      },
      {
        title: 'Carrito',
        url: '/carrito',
        icon: 'mdi-cart-outline'
      },
      {
        title: 'Mi cuenta',
        url: '/mi-cuenta',
        icon: 'mdi-account-box'
      }
    ]
  }),
  methods: {
    isAuthenticate () {
      const token = localStorage.getItem('token')
      if (token && token === 'Autenticado') {
        this.isAuth = true
      } else {
        this.isAuth = false
      }
    },
    logOut () {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
      this.$router.push('/productos').catch((err) => {
        if (err) {
          window.location.reload()
        }
      })
    }
  }
}
</script>
