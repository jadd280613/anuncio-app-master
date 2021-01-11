<template>
  
  <div class="ancho centra">
      <div class="loader" v-if="loading"></div>


        <div class="card" style="width: 480px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Confirma tu Registro</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <p>Por favor, para confirmar tu registro, captura el Token que te acabamos de enviar a tu correo e indícanos el resto de tus datos</p>
                <table>
                    <tr>
                        <td style="text-align: right;padding-right: 20px;"><label for="correo">Token</label></td>
                        <td><input type="text" class="form-control" style="width: 280px;" v-model="token" /></td>
                    </tr> 
                    <tr>
                        <td colspan="2" style="text-align: center;"><hr/></td>
                    </tr>

                    <tr>
                        <td style="text-align: right;padding-right: 20px;"><label style="width: 120px;" for="correo">Calle y número</label></td>
                        <td><input type="text" class="form-control" style="width: 280px;" v-model="calleNumero" /></td>
                    </tr> 
                    <tr>
                        <td style="text-align: right;padding-right: 20px;"><label for="correo">Estado</label></td>
                        <td>
                          <select class="browser-default custom-select" v-model="estado" @change="updateMunicipios">
                              <option v-for="edo in estados" :key="edo.id" :value="edo">
                                {{edo.nombre}}
                              </option>
                          </select>
                        </td>
                    </tr> 
                    <tr>
                        <td style="text-align: right;padding-right: 20px;"><label for="correo">Municipio</label></td>
                        <td>
                          <select class="browser-default custom-select" v-model="municipio" @change="xxx">
                              <option :value="0" selected>Selecciona un municipio</option>
                              <option v-for="mun in municipios" :key="mun.id" :value="mun">
                                {{ mun.nombre }}
                              </option>
                          </select>
                        </td>
                    </tr> 
                    <tr>
                        <td style="text-align: right;padding-right: 20px;"><label for="correo">F Nacimiento</label></td>
                        <td><datepicker v-model="fNacimiento" :inline="true"></datepicker></td>
                    </tr> 
                    <tr>
                        <td colspan="2" style="text-align: center;"><hr/></td>
                    </tr>



                    <tr>
                        <td colspan="2" style="text-align: center;"><a href="#" class="btn btn-success" @click="registrar">Confirmar</a></td>
                    </tr>
                </table>

            </div>
        </div>







      <modal 
          name="mensaje-confirm" 
          :clickToClose="false" 
          :reset="true"
          :width="480"
          :height="260">
          <div class="card">
              <div class="card-header">Advertencia del sistema</div>
              <div class="card-body">
                  <h5 class="card-title">Error de confirmación de clave</h5>
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
import Datepicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      colorSala: 0,
      usuario: {
        rol: "admin"
      },
      selectDrop : {
        id:0
      },
      token: '',
      calleNumero:'',
      msgErr: '',
      estado: {
        id:0,
        nombre:'ok'
      },
      estados: [],
      municipio: 0,
      municipios: [],
      fNacimiento:'',
      loading: false
    }
  },
  mounted () {
    this.updateEstados();
    this.estado.id=0;
  },
  methods: {
    xxx: function() {
      console.log(this.municipio.id);
    },
    updateEstados: function() {
      axios.get('/api/estados.json', 
      {}, 
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).catch(error => {
        alert(error)
      }).then(response => {
        console.log(response.data);
        this.estados = response.data;
      }).finally(() => {
          this.loading =  false
      });
    },
    updateMunicipios: function() {
      axios.get('/api/municipios.json?idEstado='+this.estado.id, 
      {
        idEstado: this.estado.id
      }, 
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).catch(error => {
        alert(error)
      }).then(response => {
        console.log(response.data);
        this.municipios = response.data;
      }).finally(() => {
          this.loading =  false
      });
    },
    registrar: function() {
        this.loading =  true;
        axios.post('/api/confirm-register.json', 
        {
            token: this.token,
            calleNumero: this.calleNumero,
            idEstado: this.estado.id,
            idMunicipio: this.municipio.id,
            fNacimiento: this.fNacimiento
        }, 
        {
            headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            this.msgErr = "Ha ocurrido un error de red: " + error;
            this.$modal.show('mensaje-confirm');
        }).then(response => {
            if(response.status===200) {
                router.push('/ui/login');
            } else {
                this.msgErr = response.data['desc-exception'];
                this.$modal.show('mensaje-confirm');
            }
        }).finally(() => {
            this.loading =  false
        });            
    },
    closeModal: function() {
        this.$modal.hide('mensaje-confirm');
    },
  },
  computed: {

  },
  created() {
    //console.log(this);
    //console.log(this.$store.state.distribuidorId);
  },
  name: 'ConfirmRegistro',
  props: {
    msg: String
  },
  components: {
    Datepicker
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ancho {
    max-width: 490px;
}
</style>
