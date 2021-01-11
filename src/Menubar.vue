<template>
  <div id="tope">
    <!--
      https://getbootstrap.com/docs/4.0/components/navbar/
      https://getbootstrap.com/docs/4.0/getting-started/introduction/
    -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="https://unam.mx" target="_blank"><img src='/logo.png' width="64px;" /></a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" @click="goHome">Inicio <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goList">Lista</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Misceláneos
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click="goAviso">Aviso</a>
              <a class="dropdown-item" href="#" @click="goPreguntas">Preguntas Frecuentes</a>
              <a class="dropdown-item" href="#" @click="goPerfil">Editar mi perfil</a>
              <a class="dropdown-item" href="#" @click="goCambia">Cambiar mi clave</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click="goVideos">Multimedia</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Próximamente</a>
          </li>
        </ul>

        <div v-if="firmado">
          <div class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" @click="goLogin">Salir</button>
          </div>
        </div>
        <div v-else>
          <div class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="goRegistro">Registro</button>
            <h1 style="color: transparent;">..</h1>
            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" @click="goLogin">Ingresar</button>
          </div>
        </div>

      </div>

    </nav>
  </div>
</template>

<script>
import router from './router';
import store from './store'

export default {
    name: "Sidebar",
    data: function () {
        return {
          usr: ".",
          url: process.env.VUE_APP_URL,
          title: process.env.VUE_APP_TITLE
        }
    },
    computed: {
      firmado: function() {
        return store.state.firmado;
      },
      currentRouteName: function() {
         return this.$route.path;
      }
    },
    methods: {
      goHome: function() {router.push('/');},
      goLogin: function() {
        store.commit('setState', '');
        store.commit('setFirmado', false);
        this.checa('/ui/login');
      },
      goForgot: function() {this.checa('/ui/forgot');},
      goRegistro: function() {this.checa('/ui/registro');},
      goList: function() {this.checa('/ui/list');},

      goAviso: function() {this.checa('/ui/aviso');},
      goPreguntas: function() {this.checa('/ui/preguntas');},
      goVideos: function() {this.checa('/ui/video');},
      goUpload: function() {this.checa('/ui/upload');},
      goPerfil: function() {this.checa('/ui/perfil');},
      goCambia: function() {this.checa('/ui/cambiar-clave');},

      checa: function(url) {
        if(this.currentRouteName===url) {
          console.log('same place');
        } else {
          router.push(url);
        }
      }
    }
}

</script>

<style>
#tope {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 23px;
  background-color: #26262b;
  color:#ffffff;
  padding-bottom: 90px;
}
</style>

