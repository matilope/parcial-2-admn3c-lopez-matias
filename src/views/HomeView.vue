<template>
  <v-container>
    <v-row justify="center">
        <v-col class="col-12 col-lg-6 col-xl-7 align-self-center">
            <h2 class="mb-3">Explora nuestra tienda y prepárate para una experiencia astronómica inolvidable.</h2>
            <p>Sumérgete en el emocionante mundo de la astronomía y descubre las maravillas del universo. <strong>Nuestra tienda está repleta de telescopios de última generación, accesorios para que puedas explorar el cosmos.</strong><br />
            Ya seas un apasionado principiante o un astrónomo experimentado, encontrarás todo lo que necesitas para disfrutar de la observación astronómica. Con nuestros equipos podrás adentrarte en el cosmos y descubrir la belleza de las estrellas, planetas, galaxias y mucho más.
            </p>
        </v-col>
        <v-col class="col-12 col-lg-6 col-xl-5 adjust-image">
            <img class="img-fluid" src="../assets/images/home/home.jpg" alt="Nuestra tienda física en donde se ven varios modelos de telescopio" />
        </v-col>
        <v-col class="col-12 mt-5">
            <h2 class="mb-3">Nos encontramos en Palermo, CABA</h2>
            <p>Además, <strong>ofrecemos envíos sin cargo dentro de CABA y GBA, para que no tengas que moverte de tu casa.</strong><br />
            ¡No te pierdas la oportunidad de explorar el mundo astronómico con nosotros!</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3285.259218043788!2d-58.41897800000001!3d-34.572307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59e7a36a395%3A0x445f8d5b686ace85!2sAv.%20del%20Libertador%203604%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1684894929050!5m2!1ses-419!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </v-col>
      </v-row>
  </v-container>
</template>

<style scope lang="scss">
  .adjust-image {
    display:flex;
    justify-content: flex-end;

    @media (max-width:1264px) {
      justify-content: flex-start;
    }
  }

  iframe {
      width: 100%;
      height: 400px;
      max-width: 100%;
  }
</style>

<script>

export default {
  name: 'HomeView',
  components: {}
}
</script>
