<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <h1>Interfaz del administrador</h1>
          <h2>{{ salta }}</h2>
        </b-col>
       </b-row>
       <b-row align-h="center">
         <b-col cols="4">
          <b-button @click="goTabla" block variant="primary" size="lg">Anuncios pendientes</b-button>
         </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '../store'
export default {
  data() {
    return {
      salta: store.state.estado.roles
    }
  },
  methods:{
    goTabla() {
      this.$router.push({ name: "tabla" });
    },
  }
}
</script>
