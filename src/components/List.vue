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
        <td colspan="2"><button type="button" class="btn btn-outline-primary btn-sm m-0 waves-effect" @click="ok">Go to selected page</button></td>
      </tr>
    </table>




    <br/>




    <table class="table table-striped table-responsive-md btn-table">
      <thead class="thead-dark">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Direccion</th>
            <th>Telefon</th>
            <th>Fecha Nacimiento</th>
            <th>Editar</th>
            <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.nombre}}</td>
            <td>{{user.mail}}</td>
            <td>{{user.direccion}}</td>
            <td>{{user.telefono}}</td>
            <td>{{user.fechaNacimiento}}</td>
            <td><button type="button" class="btn btn-outline-primary btn-sm m-0 waves-effect" @click="edita(user)">Editar</button></td>
            <td><button type="button" class="btn btn-outline-danger btn-sm m-0 waves-effect">Borrar</button></td>
        </tr>
      </tbody>
    </table>


        <modal 
            name="editar" 
            :clickToClose="false" 
            :reset="true"
            :width="380"
            :height="400">

        <div class="card" style="width: 380px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Edición de usuarios</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table>
                  <tr>
                    <td>Nombre</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="currentUser.nombre" maxlength="25"/></td>
                  </tr>
                  <tr>
                    <td>Correo</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="currentUser.mail" maxlength="25"/></td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                    <td style="color:red;">{{ msgErr }}</td>
                  </tr>

                  <tr>
                    <td>Direccion</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="currentUser.direccion" maxlength="25"/></td>
                  </tr>
                  <tr>
                    <td>Telefono</td>
                    <td><input type="text" class="form-control" style="width: 250px;" v-model="currentUser.telefono" maxlength="25"/></td>
                  </tr>
                  <tr>
                      <td align ="right" style="padding-top: 1px;">Fecha de Nacimiento</td>
                      <td><datepicker v-model="currentUser.fechaNacimiento"></datepicker></td>
                  </tr>  
                </table>
                <div class="col-sm-12" style="text-align: center;">
                    <hr/>
                </div>

                <table>
                  <tr>
                    <td><button @click="registrar" class="btn btn-success">Guardar cambios</button></td>
                    <td><button @click="cerrar" class="btn btn-danger">Cerrar sin guardar</button></td>
                  </tr>
                </table>

            </div>
        </div>

        </modal>


  </div>
</template>

<script>
import axios from 'axios';
import store from '../store'
import NumberInputSpinner from 'vue-number-input-spinner'
import Datepicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      users: [],
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
    registrar: function() {
        axios.post('/api/update-user-detail.json', 
        {
            id: this.currentUser.id,
            nombre: this.currentUser.nombre,
            mail: this.currentUser.mail,
            direccion: this.currentUser.direccion,
            telefono: this.currentUser.telefono,
            fechaNacimiento: this.currentUser.fechaNacimiento
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
                this.obten();
                this.$modal.hide('editar');
            } else {
                this.msgErr = response.data['desc-exception'];
                console.log(this.msgErr);
                //this.$modal.show('mensaje-login');
            }
        });
    },
    cerrar: function() {
      this.msgErr='';
      this.obten();
      this.$modal.hide('editar');
    },
    edita: function(user) {
      this.currentUser = user;
      this.$modal.show('editar');
    },
    obten: function() {
      axios
        .get(this.build())
        .then(response => {
          this.users = response.data
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    build: function() {
      return '/api/user-detail.json'
          + '?page=' + this.page 
          + '&size=' + this.size 
          + '&sort=' + this.sort 
          + '&order=' + this.order;
    },
    ok: function() {
      this.obten();
    }
  },
  components: { 
      Datepicker,
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
