<template>
  <v-footer class="p-0">
    <v-card flat tile width="100%" class="card-footer primary text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon class="white--text" size="32px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        © Copyright - {{ new Date().getFullYear() }} — <strong>Cosmos</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style scope lang="scss">
footer {
  padding: 0 !important;
  margin-top: 1rem !important;

  .card-footer {
    padding: 1rem;
    background: linear-gradient(to top, #1a156b, #3e37a9) no-repeat;

    .v-card__text {
      font-size: 1.25rem;
    }

    i {
      &:hover {
        color: red !important;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'FooterComponent',
  data: () => ({
    icons: ['mdi-instagram', 'mdi-whatsapp', 'mdi-email'],
    variant: 'default'
  })
}
</script>
