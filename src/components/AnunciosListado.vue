<template>
  <div id="contenedor">
    <table>
      <tr>
        <td><label style="font-size:26px;">Pagina</label></td>
        <td>
          <NumberInputSpinner
          :min="1"
          :max="9"
          :step="1"
          :integerOnly="true"
          v-model="page"
        />
        </td>
      </tr>
      <tr>
        <td><label style="font-size:26px;">Longitud</label></td>
        <td>
          <input type="text" class="form-control" style="width: 250px;" v-model="size" />
        </td>
      </tr>
      <tr>
        <td colspan="2"><button type="button" class="btn btn-outline-primary btn-sm m-0 waves-effect" @click="obten">Go to selected page</button></td>
      </tr>
    </table>




    <br/>




    <table class="table table-striped table-responsive-md btn-table">
      <thead class="thead-dark">
        <tr>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Ver detalle</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="item in anuncios" :key="item.id">
            <td>{{item.titulo}}</td>
            <td><div v-html="item.descripcion" /></td>
            <td><button type="button" class="btn btn-outline-primary btn-sm m-0 waves-effect" @click="detalle(anuncio)">Detalle</button></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';
import NumberInputSpinner from 'vue-number-input-spinner'

export default {
  data() {
    return {
      anuncios: [],
      page:2,
      size:15,
      sort:1,
      order:0,
      pages: [5,10,15,20],
      currentUser: {},
      msgErr:''
    }
  },
  mounted () {
    this.obten();
  },
  methods: {
    obten: function() {
      axios
        .get(this.build())
        .then(response => {
          this.anuncios = response.data
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    build: function() {
      return '/api/anuncios2.json'
          + '?page=' + this.page 
          + '&size=' + this.size 
          + '&sort=' + this.sort 
          + '&order=' + this.order;
    },
    detalle: function() {
      alert('ok');
    }
  },
  components: { 
      NumberInputSpinner
  }
}
</script>


<style scoped>
  #contenedor {
    width: 720px;
    background-color: transparent;
    margin: auto;
  }
</style>
