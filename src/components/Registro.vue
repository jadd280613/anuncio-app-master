<template>
    
    <div class="ancho centra">
        <div class="loader" v-if="loading">
        </div>

        <div class="card" style="width: 380px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Registro al sistema</label>
                    </div>
                </div>
            </div>
            <div class="card-body">

                <table>
                    <tr>
                        <td align ="right">Nombre</td>
                        <td ><input type="text" class="form-control" style="width: 200px;" v-model="nombre" maxlength="25"/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align ="left" style="color:red;">{{ errorsMsg[0] }}</td>
                    </tr>
                    <tr>
                        <td align ="right" style="padding-top: 1px;">Correo</td>
                        <td><input type="text" class="form-control" style="width: 230px;" v-model="correo" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align ="left" style="color:red;">{{ errorsMsg[2] }}</td>
                    </tr>
                    <tr>
                        <td align ="right" style="padding-top: 1px;">Clave</td>
                        <td><input type="password" class="form-control" style="width: 150px;" v-model="clave" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align ="left" style="color:red;">{{ errorsMsg[1] }}</td>
                    </tr>
                    <tr>
                        <td align ="right" style="padding-top: 1px;">Confirmación</td>
                        <td><input type="password" class="form-control" style="width: 150px;" v-model="clave2" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align ="left" style="color:red;">{{ confError }}</td>
                    </tr>
                    <tr>
                        <td align ="right" style="padding-top: 1px;">Teléfono</td>
                        <td><input type="text" class="form-control"  style="width: 180px;"  v-model="telefono" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align ="left" style="color:red;">{{ errorsMsg[4] }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            
                        <vue-recaptcha 
                            ref="recaptcha"
                            sitekey="6LeyXssSAAAAAEuw62GOHmwzBtbX9Iz4He01Zk8_"
                            @verify="onCaptchaVerified"
                            @expired="onCaptchaExpired">
                        </vue-recaptcha>
                        
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr/></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button @click="registrar" class="btn btn-success">Registrarme</button></td>
                    </tr>
                </table>

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
                    <h5 class="card-title">Error de registro al sistema</h5>
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
import VueRecaptcha from 'vue-recaptcha';

export default {
    data: function () {
        return {
          nombre: "",
          clave: "",
          clave2: "",
          correo: "", 
          telefono: "",

          errorsMsg: [], 
          confError:" ",
          msgErr: "",
          loading: false,
          status: "",
          sucessfulServerResponse: "",
          serverError: "",
          captchaOk: false
        }
    },
    created() {
    },
    methods: {
        closeModal: function() {
            this.$modal.hide('mensaje-login');
        },
        pba: function() {
            this.loading = true;
        },
        registrar: function() {
            // lipmia todos los errores
            this.confError = '';
            this.errorsMsg=[];

            // Checa que el captcha se haya resuelto
            if(!this.captchaOk) {
                this.msgErr = 'El Captcha es incorrecto';
                this.$modal.show('mensaje-login');
                return;
            }

            // verifica que la clave y su confrmación sean iguales
            if(this.clave != this.clave2) {
                this.confError = 'La clave y su confirmación no coinciden';
                //this.msgErr = 'La clave y su confirmación no coinciden';
                //this.$modal.show('mensaje-login');
                return;
            }

            // prende el bloqueador de pantalla
            this.loading = true;

            // manda la petición de registro
            axios.post('api/register.json', 
            {
                nombre: this.nombre,
                clave: this.clave,
                correo: this.correo,
                telefono: this.telefono
            }, 
            {
                headers: {
                    'Content-type': 'application/json',
                    'crossDomain': true,
                    'Acces-Control-Allow-Origin': '*'
                }
            }).catch(error => {
                this.msgErr = "Ha ocurrido un error GRAVE: " + error;
                this.$modal.show('mensaje-login');
            }).then(response => {
                if(response.status===200) {
                    router.push('/ui/confirma-registro');
                } else {
                    if(response.data.TipoError && response.data.TipoError=="1777") {
                        const len=response.data.errors.length;
                        for(var i=0; i<len; i++) {
                            var err = response.data.errors[i];
                            this.errorsMsg[err.index] = err.description;
                        }
                    } else {
                        this.msgErr = response.data['desc-exception'];
                        this.$modal.show('mensaje-login');
                    }
                }
            }).finally(() => {
                this.loading =  false
            });            
        },
        onCaptchaVerified: function (recaptchaToken) {
            axios.post('api/check-captcha.json', 
            {
                response: recaptchaToken,
                ip: '127.0.0.1'
            }, 
            {
                headers: {
                    'Content-type': 'application/json',
                    'crossDomain': true,
                    'Acces-Control-Allow-Origin': '*'
                }
            }).catch(error => {
                this.msgErr = "Ha ocurrido un error de red: " + error;
                this.$modal.show('mensaje-login');
            }).then(response => {
                if(response.status===200) {
                    this.captchaOk = response.data.success;
                } else {
                    this.msgErr = 'Regreso con un estatus: '+response.status;
                    this.$modal.show('mensaje-login');
                }
            }).finally(() => {
                console.log('Ya acabo el chequeo del captcha');
            });
        },
        onCaptchaExpired: function () {
            this.captchaOk = false;
            this.$refs.recaptcha.reset();
        }
    },
    components: { 
        VueRecaptcha
    }
}

</script>


<style scoped>
td {
    padding-right: 10px;
}
.ancho {
    max-width: 400px;
}
</style>