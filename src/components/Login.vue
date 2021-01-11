<template>
    <div class="ancho centra">

        <div class="card" style="width: 380px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                        <label>Ingresar al sistema</label>
                    </div>
                    <div class="col-sm-6" style="text-align: right;">
                        <label>V. {{ version }}</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="precioVenta">Usuario</label>
                            <input type="text" class="form-control" v-model="usr" />
                        </div>
                        <div class="form-group">
                            <label for="cantidadVenta">Password</label>
                            <input type="password" class="form-control" v-model="psw" />
                        </div>
                    </div>
                    <div class="col-sm-12" style="text-align: center;">
                        <button @click="checkCredentials" class="btn btn-warning">Ingresar al sistema</button>
                    </div>
                    <div class="col-sm-12" style="text-align: center;">
                        <hr/>
                        <a href="#" @click="openForgotPage" class="btn btn-outline-info my-2 my-sm-0">Olvidé mi clave de acceso</a>&nbsp;&nbsp;
                        <a href="#" @click="openRegistroPage" class="btn btn-outline-info my-2 my-sm-0">Registrarme al sistema</a>
                    </div>
                </div>
            </div>
        </div>

        <modal 
            name="mensaje-login" 
            :clickToClose="false" 
            :reset="true"
            :width="480"
            :height="260">
            <div class="card">
                <div class="card-header">Advertencia del sistema</div>
                <div class="card-body">
                    <h5 class="card-title">Error de ingreso al sistema</h5>
                    <p class="card-text">{{ msgErr }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal>
    </div>    
</template>

<script>
import axios from 'axios';
import router from '../router'
import store from '../store'

export default {
    data: function () {
        return {
          usr: "",
          psw: "",
          msgErr: "",
          url: process.env.VUE_APP_URL,
          version: process.env.VUE_APP_VERSION
        }
    },
    created() {
    },
    methods: {
        detecta: function(input) {
            if(store.state.destination.length>0) {
                var target = store.state.destination;
                store.commit('setDestination','');
                return target;
            }
            if (typeof input === 'string') {
                return '/ui/inicio';
            } else {
                for(var i=0; i<input.length; i++) {
                    switch(input[i].name) {
                        case 'admin': return '/ui/admin'; // rol 1 = administrador
                        case 'user': return '/ui/user'; // rol 2 = usuario comun y corriente
                        default: return '/ui/inicio'; // otro rol cualquiera
                    } 
                } // ends for cycle with switch inside
            }
        },
        closeModal: function() {
            this.$modal.hide('mensaje-login');
        },
        openRegistroPage: function() {
            router.push('/ui/registro');
        },
        openForgotPage: function() {
            router.push('/ui/forgot');
        },
        checkCredentials: function() {
            axios.post('api/login.json', 
            {
                usr: this.usr,
                pass: this.psw
            }, 
            {
                headers: {
                    'Content-type': 'application/json',
                    'crossDomain': true,
                    'Acces-Control-Allow-Origin': '*'
                }
            }
        ).catch(error => {
            this.msgErr = "Ha ocurrido un error de red: " + error;
            this.$modal.show('mensaje-login');
        }).then(response => {            
            if(response.status===200) {
                store.commit('setState', response.data);
                store.commit('setFirmado', true);
                const target = this.detecta(response.data.roles);
                //console.log(response.data);     
                router.push(target);
            } else {
                this.msgErr = response.data['desc-exception'];
                this.$modal.show('mensaje-login');
            }
          });
        }
    }
}

</script>

<style>
.ancho {
    max-width: 400px;
}
</style>