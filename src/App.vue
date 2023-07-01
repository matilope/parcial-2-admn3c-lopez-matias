<template>
  <v-app>
    <NavComponent />
    <BannerComponent />
    <v-main class="my-8">
      <router-view />
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<style lang="scss">
  h2 {
    font-size: 2rem;

    @media (max-width:420px) {
      font-size: 1.5rem;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  .img-fluid {
    width: 100%;
    height: auto;
  }

  @media (min-width: 1904px) {
    .container {
        max-width: 1400px !important;
    }
  }

  .v-btn--disabled {
    opacity: 0.5 !important;
    color: white !important;
  }
</style>

<script>
// @ is an alias to /src
import NavComponent from '@/components/NavComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    NavComponent,
    BannerComponent,
    FooterComponent
  },
  data: () => ({
    //
  })
}
</script>
