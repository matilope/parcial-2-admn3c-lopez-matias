<template>
  <div class="banner">
    <v-icon class="white--text">mdi-earth</v-icon>
    <h1>Explora el cosmos</h1>
  </div>
</template>

<style scope lang="scss">
.banner {
  background: url(../assets/images/banner/milky-way.jpg) no-repeat center;
  background-size: cover;
  height: calc(50vh - 88px);
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }

  h1,
  i {
    font-size: 3.5rem !important;
    font-weight: bold;
    text-shadow: 2px 2px 6px black;
    text-align: center;
    font-weight: normal !important;

    @media screen and (max-width: 575px) {
      font-size: 2.5rem !important;
    }

    @media screen and (max-width: 340px) {
      font-size: 2rem !important;
    }
  }
}
</style>

<script>
export default {
  name: 'BannerComponent',
  data: () => ({})
}
</script>
