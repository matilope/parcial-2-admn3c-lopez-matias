import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1a156b',
        secondary: '#3D3D3D',
        accent: '#009688',
        error: '#f44336',
        warning: '#ff9800',
        info: '#00bcd4',
        success: '#198754',
        text: 'white'
      }
    }
  }
})
