<template>
        <div id="tope">
        <nav class="main-menu">
            <ul>
                <li>
                    <a href="#"  @click="goHome">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                            Home
                        </span>
                    </a>
                  
                </li>
                <li class="has-subnav">
                    <a href="#" @click="goLogin">
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                            Login
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#" @click="goForgot">
                       <i class="fa fa-info fa-2x"></i>
                        <span class="nav-text">
                            Forgot Password
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#" @click="goRegistro">
                       <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Registro
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#"  @click="goList">
                        <i class="fa fa-table fa-2x"></i>
                        <span class="nav-text">
                            Lista Usuarios
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#"  @click="goAviso">
                        <i class="fa fa-font fa-2x"></i>
                        <span class="nav-text">
                           Aviso Legal
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#"  @click="goPreguntas">
                       <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            Preguntas Frecuentes
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#" @click="goVideos">
                        <i class="fa fa-play-circle fa-2x"></i>
                        <span class="nav-text">
                            Videos
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#" @click="goUpload">
                       <i class="fa fa-map-marker fa-2x"></i>
                        <span class="nav-text">
                            Upload File
                        </span>
                    </a>
                </li>
            </ul>

            <ul class="logout">
                <li>
                   <a href="#" @click="goLogin">
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            {{ valor }}
                        </span>
                    </a>
                </li>  
            </ul>
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
      valor: function() {
        var estado= store.state.firmado;
        if(estado) {
          return "Salir del sistema (" + store.state.estado.usuarioDetalles.nombre + ")";
        } else {
          return "Ingresar al sistema ";
        }
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

@import url(https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);

@import url(https://fonts.googleapis.com/css?family=Titillium+Web:300);
.fa-2x {
font-size: 2em;
}
.fa {
position: relative;
display: table-cell;
width: 60px;
height: 36px;
text-align: center;
vertical-align: middle;
font-size:20px;
}


.main-menu:hover,nav.main-menu.expanded {
width:250px;
overflow:visible;
}

.main-menu {
background:#212121;
border-right:1px solid #e5e5e5;
position:fixed;
top:0;
bottom:0;
height:100%;
left:0;
width:60px;
overflow:hidden;
-webkit-transition:width .05s linear;
transition:width .05s linear;
-webkit-transform:translateZ(0) scale(1,1);
z-index:1000;
}

.main-menu>ul {
margin:7px 0;
}

.main-menu li {
position:relative;
display:block;
width:250px;
}

.main-menu li>a {
position:relative;
display:table;
border-collapse:collapse;
border-spacing:0;
color:#999;
 font-family: arial;
font-size: 14px;
text-decoration:none;
-webkit-transform:translateZ(0) scale(1,1);
-webkit-transition:all .1s linear;
transition:all .1s linear;
  
}

.main-menu .nav-icon {
position:relative;
display:table-cell;
width:60px;
height:36px;
text-align:center;
vertical-align:middle;
font-size:18px;
}

.main-menu .nav-text {
position:relative;
display:table-cell;
vertical-align:middle;
width:190px;
  font-family: 'Titillium Web', sans-serif;
}

.main-menu>ul.logout {
position:absolute;
left:0;
bottom:0;
}

.no-touch .scrollable.hover {
overflow-y:hidden;
}

.no-touch .scrollable.hover:hover {
overflow-y:auto;
overflow:visible;
}

a:hover,a:focus {
text-decoration:none;
}

nav {
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
-o-user-select:none;
user-select:none;
}

nav ul,nav li {
outline:0;
margin:0;
padding:0;
}
.main-menu li:hover>a,nav.main-menu li.active>a,.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus,.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,.dashboard-page nav.dashboard-menu ul li.active a {
color:#fff;
background-color:#5fa2db;
}
.area {
float: left;
background: #e2e2e2;
width: 100%;
height: 100%;
}
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 300;
  src: local('Titillium WebLight'), local('TitilliumWeb-Light'), url(https://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff) format('woff');
}

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


