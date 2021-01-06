<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <h2>Valida un anuncio</h2>
        </b-col>
      </b-row>
      <b-row class="mb-4 mt-4">
        <b-col cols="6" style="border-right: 1px solid black">
          <Gallery />
        </b-col>
        <b-col cols="6">
          <b-row>
            <b-col cols="12" class="text-left mb-2">
              <h6>Titulo del anuncio:</h6>
              <b-form-input
                v-model="text"
                placeholder="Nombre del anuncio"
                readonly
              ></b-form-input>
            </b-col>
            <b-col cols="12" class="text-left mb-2">
              <h6>Descripcion:</h6>
              <b-form-input
                v-model="text"
                placeholder="Descripcion"
                readonly
              ></b-form-input>
            </b-col>
            <b-col cols="12" class="text-left mb-2">
              <b-row>
                <b-col cols="6">
                  <h6>Delegacion</h6>
                  <b-form-input
                    v-model="text"
                    placeholder="Delegacion"
                    readonly
                  ></b-form-input>
                </b-col>
                <b-col cols="6">
                  <h6>Colonia</h6>
                  <b-form-input
                    v-model="text"
                    placeholder="Colonia"
                    readonly
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="text-left mb-2">
              <b-row>
                <b-col cols="6">
                  <h6>Categoria</h6>
                  <b-form-input
                    v-model="text"
                    placeholder="Categoria"
                    readonly
                  ></b-form-input>
                </b-col>
                <b-col cols="6">
                  <h6>Forma(s) de pago</h6>
                  <b-form-input
                    v-model="text"
                    placeholder="Formas de pago"
                    readonly
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="text-left mb-2">
              <h6>Vigencia:</h6>
              <b-form-input
                v-model="text"
                placeholder="Vigencia"
                readonly
              ></b-form-input>
            </b-col>
            <b-col cols="12" class="text-left mb-2">
              <h6>Datos de contacto:</h6>
              <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Datos personales"
                rows="3"
                max-rows="6"
                readonly
              ></b-form-textarea>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="mb-5">
      <b-row>
        <b-col cols="6">
          <b-button @click="showModal2" block variant="danger" size="lg"
            >Declinar</b-button
          >
        </b-col>
        <b-col cols="6">
          <b-button @click="showModal1" block variant="success" size="lg"
            >Publicar anuncio</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      ref="my-modal1"
      hide-footer
      title="Publicar anuncio"
      align="center"
    >
      <div class="d-block text-center">
        <b-row>
          <b-col class="mb-3" cols="12">
            <b-icon
              style="width: 50px; height: 85px"
              variant="success"
              icon="check-circle"
            ></b-icon>
          </b-col>
          <b-col class="mb-3" cols="12">
            <h3>¿Esta seguro de publicar el anuncio?</h3>
          </b-col>
          <b-col class="mb-3" cols="12">
            <b-card
              border-variant="secondary"
              header="User: Juan Perez"
              header-border-variant="secondary"
              align="center"
            >
              <b-card-text> Plomeria en menos de 30 </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
      <b-row>
        <b-col cols="6">
          <b-button class="mt-3" variant="danger" block @click="hideModal1"
            >Cancelar</b-button
          >
        </b-col>
        <b-col cols="6">
          <b-button class="mt-3" variant="success" block @click="goHome"
            >Aceptar</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="my-modal2"
      hide-footer
      title="Declinar anuncio"
      align="center"
      no-stacking
    >
      <div class="d-block text-center">
        <b-row>
          <b-col class="mb-3" cols="12">
            <b-icon
              style="width: 50px; height: 85px"
              variant="danger"
              icon="x-circle"
            ></b-icon>
          </b-col>
          <b-col class="mb-3" cols="12">
            <h3>¿Esta seguro de declinar el anuncio?</h3>
          </b-col>
          <b-col class="mb-3" cols="12">
            <b-card
              border-variant="secondary"
              header="User: Juan Perez"
              header-border-variant="secondary"
              align="center"
            >
              <b-card-text> Plomeria en menos de 30 </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
      <b-row>
        <b-col cols="6">
          <b-button class="mt-3" variant="danger" block @click="hideModal2"
            >Cancelar</b-button
          >
        </b-col>
        <b-col cols="6">
          <b-button class="mt-3" variant="success" block @click="showModal3"
            >Aceptar</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="my-modal3"
      hide-footer
      title="Declinar anuncio"
      align="center"
    >
      <div class="d-block text-center">
        <b-row>
          <b-col class="mb-3" cols="12">
            <h3>¿Porque se declino el anuncio?</h3>
          </b-col>
          <b-col class="mb-3" cols="12">
            <b-form-textarea
              id="textarea"
              v-model="text"
              placeholder="Escribe el comentario"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </div>
      <b-row>
        <b-col cols="6"> </b-col>
        <b-col cols="6">
          <b-button class="mt-3" block @click="goHome">Enviar</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Gallery from "./Carousel.vue";
export default {
  components: {
    Gallery,
  },
  data() {
    return {
      vigencia: "",
      images: [
        "http://lorempixel.com/1000/1000/business/1/",
        "http://lorempixel.com/1000/1000/business/2/",
        "http://lorempixel.com/1000/1000/business/3/",
      ],
    };
  },
  methods: {
    goHome() {
      //TODO: Codigo para mandar el registro
      this.$router.push({ name: "tabla" });
    },
    showModal1() {
      this.$refs["my-modal1"].show();
    },
    hideModal1() {
      this.$refs["my-modal1"].hide();
    },
    showModal2() {
      this.$refs["my-modal2"].show();
    },
    hideModal2() {
      this.$refs["my-modal2"].hide();
    },
    showModal3() {
      this.$refs["my-modal3"].show();
    },
    hideModal3() {
      this.$refs["my-modal3"].hide();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>