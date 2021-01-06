<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mb-4 mt-4">
        <b-col cols="6">
          <h2>Selecciona un anuncio</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-table
            id="my-table"
            striped
            hover
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            @row-clicked="myRowClickHandler"
          >
            <template #cell(Vista_Previa)="data">
              <!-- <src class="text-info">{{ data.value }}</src> -->
              <b-img
                v-bind="imagenTable"
                :src="data.value"
                alt="Fluid image"
              ></b-img>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="12">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
            align="center"
          ></b-pagination>
          <p class="mt-3">Current Page: {{ currentPage }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagenTable: { width: 100, height: 60, class: "m1" },
      perPage: 5,
      currentPage: 1,
      items: [
        {
          id: 1,
          Vista_Previa:
            "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
          Titulo_Del_Anuncio: "titulo",
          Usuario: "user",
          Descripcion: "descripcion",
          Fecha_De_Recepcion: "dd/mm/aaaa",
        },
        {
          id: 2,
          Vista_Previa:
            "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
          Titulo_Del_Anuncio: "titulo",
          Usuario: "user",
          Descripcion: "descripcion",
          Fecha_De_Recepcion: "dd/mm/aaaa",
        },
        {
          id: 3,
          Vista_Previa:
            "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
          Titulo_Del_Anuncio: "titulo",
          Usuario: "user",
          Descripcion: "descripcion",
          Fecha_De_Recepcion: "dd/mm/aaaa",
        },
        {
          id: 4,
          Vista_Previa:
            "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
          Titulo_Del_Anuncio: "titulo",
          Usuario: "user",
          Descripcion: "descripcion",
          Fecha_De_Recepcion: "dd/mm/aaaa",
        },
        {
          id: 5,
          Vista_Previa:
            "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
          Titulo_Del_Anuncio: "titulo",
          Usuario: "user",
          Descripcion: "descripcion",
          Fecha_De_Recepcion: "dd/mm/aaaa",
        },
        {
          id: 6,
          Vista_Previa:
            "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
          Titulo_Del_Anuncio: "titulo",
          Usuario: "user",
          Descripcion: "descripcion",
          Fecha_De_Recepcion: "dd/mm/aaaa",
        },
      ],
    };
  },
  methods: {
    myRowClickHandler() {
      this.$router.push({ name: "validar-anuncio"});
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>