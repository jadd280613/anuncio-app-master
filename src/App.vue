<template>
  <div id="app">
    <router-view></router-view>
    <Menubar/>
    <Footer/>
  </div>
</template>

<script>
import store from './store';
import router from './router';
import Menubar from './Menubar.vue';
import Footer from './Footer.vue';

export default {
    name: "App",
    data: function () {
        return {
          usr: ".",
          url: process.env.VUE_APP_URL, 
          title: process.env.VUE_APP_TITLE 
        }
    },
    computed: {
      indicador: function() {
        if(store.state.firmado) {
          return "Salir del sistema (" + store.state.estado.usuarioDetalles.nombre + ")";
        } else {
          return "Ingresar al sistema ";
        }
      }
    },    
    methods: {
       goLogin: function() { 
        store.commit('setState', '');
        store.commit('setFirmado', false);
        router.push('/ui/login');
       }
    },
    components: {
      'Menubar': Menubar,
      'Footer': Footer
    }
}
</script>

<style>
#app {
    position: relative;
    padding-top: 100px;
    padding-bottom: 26px;
    color: #2c3e50;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#contenedor {
  width: 100%;
  background-color: transparent;
  padding-bottom: 60px;
  padding-top: 20px;
}
.centra {
    margin: auto;
    padding-top: 40px;
    padding-bottom: 40px;
}
.loader {
    position: fixed;
    top:0px;
    right:0px;
    width:100%;
    height:100%;
    background-color:#ffffff;
    background-image: url('assets/logo2.gif');
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}
</style>

