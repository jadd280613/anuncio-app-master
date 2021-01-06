<template>
  <div>
    <b-row align-h="center">
      <b-col cols="4"> </b-col>
      <b-col cols="8">
        <b-card
          border-variant="secondary"
          header="User"
          header-border-variant="secondary"
          align="center"
        >
          <b-card-text>
            <b-avatar
              style="float: left"
              src="https://placekitten.com/300/300"
              size="4rem"
            ></b-avatar>
            <p>Jhon Doe <br />test@test.com</p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="4">
        <b-button
          size="sm"
          variant="outline-primary"
          @click="$refs.vueperslides2.previous()"
          ><b-icon icon="arrow-up"></b-icon
        ></b-button>
        <vueper-slides
          class="no-shadow thumbnails"
          ref="vueperslides2"
          @slide="
            $refs.vueperslides1.goToSlide($event.currentSlide.index, {
              emit: false,
            })
          "
          :visible-slides="slides.length"
          fixed-height="200px"
          :slide-ratio="1 / 4"
          :touchable="false"
          :gap="2.5"
          arrows-outside
          bullets-outside
        >
          <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="slide.image"
            @click.native="$refs.vueperslides2.goToSlide(i)"
          >
          </vueper-slide>
        </vueper-slides>
        <b-button
          size="sm"
          variant="outline-primary"
          @click="$refs.vueperslides2.next()"
          ><b-icon icon="arrow-down"></b-icon
        ></b-button>
      </b-col>
      <b-col cols="8" class="mt-4">
        <vueper-slides
          ref="vueperslides1"
          :touchable="false"
          fade
          :autoplay="false"
          :bullets="false"
          @slide="
            $refs.vueperslides2.goToSlide($event.currentSlide.index, {
              emit: false,
            })
          "
          fixed-height="200px"
        >
          <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="slide.image"
          >
          </vueper-slide>
        </vueper-slides>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [
        {
          image:
            "https://2.bp.blogspot.com/-H9tAVcpt77c/VhPhnb1JGUI/AAAAAAAAH70/_qETVb9ATUs/s1600/aficheoreo.jpg",
        },
        {
          image:
            "https://mejoratucarrera.com/wp-content/uploads/2019/09/mejores-anuncios-publicitarios-historia.jpg",
        },
        {
          image:
            "https://vilmanunez.com/wp-content/uploads/2018/11/inspiracion-para-anuncios-de-instagram.png",
        },
        {
          image: "https://definicion.mx/wp-content/uploads/2014/04/anuncio.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.thumbnails {
  margin: auto;
  max-width: 300px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
}
::v-deep .vueperslides__track-inner {
  display: grid;
  flex-direction: column;
  width: 500px;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
  border-color: #000;
}
</style>