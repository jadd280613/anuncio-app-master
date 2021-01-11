<template>
    <div id="contenedor">
    <div class="container">
        <div class="card" style="width: 380px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Edición de mi Perfil</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table>
                  <tr>
                    <td>ID</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="user.id" maxlength="25"/></td>
                  </tr>
                  <tr>
                    <td>Nombre</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="userDetalles.nombre" maxlength="25"/></td>
                  </tr>
                  <tr>
                    <td>Correo</td>
                    <td>{{ user.mail }}</td>
                  </tr>
                  <tr>
                    <td>Direccion</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="userDetalles.direccion" maxlength="25"/></td>
                  </tr>
                  <tr>
                    <td>Telefono</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="userDetalles.telefono" maxlength="25"/></td>
                  </tr>
                  <tr>
                    <td>Fecha</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="userDetalles.fechaNacimiento" maxlength="25"/></td>
                  </tr>
                </table>

                <div class="col-sm-12" style="text-align: center;">
                    <hr/>
                </div>

                <table>
                  <tr>
                    <td><button @click="guardar" class="btn btn-success">Guardar cambios</button></td>
                  </tr>
                </table>

            </div>
        </div>

        <modal 
            name="mensaje-perfil" 
            :clickToClose="false" 
            :reset="true"
            :width="480"
            :height="260">
            <div class="card">
                <div class="card-header">Aviso del sistema</div>
                <div class="card-body">
                    <h5 class="card-title">Edición de perfil</h5>
                    <p class="card-text">{{ msg }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal>



    </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '../store'

export default {
  data() {
    return {
      userDetalles: store.state.estado.usuarioDetalles,
      user: store.state.estado.usuario,
      msg:''
    }
  },
  mounted () {
    this.obten();
  },
  methods: {
    guardar: function() {
      
        axios.post('/api/user-detail.json', 
        {
            idUsuario: this.user.id,
            nombre: this.userDetalles.nombre,
            telefono: this.userDetalles.telefono,
            direccion: this.userDetalles.direccion,
            fechaNacimiento: this.userDetalles.fechaNacimiento
        }, 
        {
          headers: {
            'Content-type': 'application/json',
            'crossDomain': true,
            'Acces-Control-Allow-Origin': '*',
            "X-CSRFToken": store.state.jwt 
        }
        }).catch(error => {
            this.msgErr = "Ha ocurrido un error de red: " + error;
            this.$modal.show('mensaje-login');
        }).then(response => {            
            if(response.status===200) {
                store.commit('setDetalles', {
                  'idUsuario':this.user.id,
                  'nombre':this.userDetalles.nombre,
                  'telefono':this.userDetalles.telefono,
                  'direccion':this.userDetalles.direccion,
                  'fechaNacimiento':this.userDetalles.fechaNacimiento
                  });
                  this.msg = "Los datos se han actualizado exitosamente";
            } else {
                this.msg = response.data['desc-exception'];
            }
             this.$modal.show('mensaje-perfil');
        });
        
    },
    closeModal: function() {
      this.$modal.hide('mensaje-perfil');
    },
    obten: function() {
      /*
      axios
        .get('/api/detail.json?mail='+this.userMail)
        .then(response => {
          this.user = response.data
        })
        .catch(function (error) {
          console.log(error);
        })*/
    }
  }
}
</script>