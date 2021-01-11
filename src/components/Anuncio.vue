<template>
    
    <div class="ancho centra">
        <div class="loader" v-if="loading">
        </div>

        <div class="card" style="width: 650px;">
            
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Publicación de un anuncio nuevo</label>
                    </div>
                </div>
            </div>

            <div class="card-body">

                <table>
                    <tr>
                        <td align ="right">Titulo</td>
                        <td ><input type="text" class="form-control" style="width: 474px;" v-model="titulo" maxlength="25"/></td>
                    </tr>
                    <tr>
                        <td align ="right" style="padding-top: 1px;">Descripción</td>
                        <td>
                            <div style="height: 280px">
                              <quill-editor style="height: 200px"
                                ref="myQuillEditor"
                                v-model="descripcion"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)"
                            />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align ="right" style="padding-top: 1px;">Duración</td>
                        <td>
                            <select class="browser-default custom-select" v-model="duracion">
                                <option value="1">1 dia</option>
                                <option value="2">3 dias</option>
                                <option value="3">1 semana</option>
                                <option value="4">2 semanas</option>
                                <option value="5">3 semanas</option>
                                <option value="6">1 mes</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <vue-dropzone 
                                :options="dropzoneOptions" 
                                :useCustomSlot=true
                                ref="myVueDropzone"
                                id="myVueDropzone"
                                v-on:vdropzone-sending="sendingEvent"
                                >
                            <div class="dropzone-custom-content">
                                <h3 class="dropzone-custom-title">Carga Contenido con 'Drag & Drop'</h3>
                                <div class="subtitle">...o has click para seleccionar un archivo desde el equipo local</div>
                            </div>
                            </vue-dropzone>        
                            <!--
                                Adding style: https://www.digitalocean.com/community/tutorials/vuejs-vue-dropzone
                                https://stackoverflow.com/questions/20391134/how-to-add-text-input-to-dropzone-upload
                                https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/events
                            -->                    
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr/></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button @click="subeInfo" class="btn btn-success">Publicar anuncio</button></td>
                    </tr>
                </table>

<label v-html="contenido" />

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
import router from '../router'
// import VueQuillEditor from 'vue-quill-editor'
import { quillEditor } from 'vue-quill-editor'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

export default {
    data: function () {
        return {
          titulo:"",
          descripcion:"",
          duracion:"",          
          loading: false,
          msgErr:'',
          editorOption: {
            modules: {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],   
                 // Bold, italic, underline, strikethrough
                ['blockquote', 'code-block'],     
                // Reference, code block

                [{'header': 1}, {'header': 2}],       
                 // Title, the form of key-value pairs; 1, 2 represents the font size
                [{'list': 'ordered'}, {'list': 'bullet'}],    
                 // list
                [{'script': 'sub'}, {'script': 'super'}],   
                 // superscript and subscript
                [{'indent': '-1'}, {'indent': '+1'},    
                 // indent
                {'direction': 'rtl'}, {'align': []}],             
                 // text direction


                //[{'size': ['small', false, 'large', 'huge']}],
                // font size
                //[{'header': [1, 2, 3, 4, 5, 6, false]}],    
                // Several levels of title


                [{'header': [1, 2, 3, 4, 5, 6, false]}, {'font': []}, {'color': []}, {'background': []}],     
                // font color, font background color
                //[{'font': []}],     
                // font, 
                //[{'align': []}],   
                // alignment
                ['clean']
              ]
            }
          },
          // https://quilljs.com/docs/modules/toolbar/
          dropzoneOptions: {
            url: 'http://192.168.100.99:9999/api/UploadPictures',
            thumbnailWidth: 150,
            maxFilesize: 2.5,
            addRemoveLinks: true,
            uploadMultiple: true,
            parallelUploads: 20,
            autoProcessQueue: false,
            headers: { "My-Awesome-Header": "header value" }
          },
          contenido: '<p>Este <u style="color: rgb(153, 51, 255);">texto</u> es de <strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"><em>ejemplo</em></strong> y va  a estar <span style="background-color: rgb(153, 51, 255);">chido</span></p>'
        }
    },
    created() {
    },
    methods: {
        onEditorBlur: function() {
            console.log('onEditorBlur');            
        },
        onEditorFocus: function() {
            console.log('onEditorFocus');
        },
        onEditorReady: function() {
            console.log('onEditorReady');
        },
        subeInfo: function() {
          this.$refs.myVueDropzone.processQueue();
        },
        sendingEvent(file, xhr, formData) {
          //console.log(formData);
          formData.append("descripcion", this.descripcion);
          formData.append("titulo", this.titulo);
          formData.append("duracion", this.duracion);
        },
        closeModal: function() {
            this.$modal.hide('mensaje-login');
        },
        pba: function() {
            this.loading = true;
            router.push('/ui/confirma-registro');
        }
    },
    components: { 
        quillEditor, 
        vueDropzone: vue2Dropzone
    },
    // https://www.digitalocean.com/community/tutorials/vuejs-vue-dropzone
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],   
            // Bold, italic, underline, strikethrough
            ['blockquote', 'code-block'],     
            // Reference, code block


            [{'header': 1}, {'header': 2}],       
            // Title, the form of key-value pairs; 1, 2 represents the font size
            [{'list': 'ordered'}, {'list': 'bullet'}],    
            // list
            [{'script': 'sub'}, {'script': 'super'}],   
            // superscript and subscript
            [{'indent': '-1'}, {'indent': '+1'}],    
            // indent
            [{'direction': 'rtl'}],             
            // text direction


            [{'size': ['small', false, 'large', 'huge']}],
            // font size
            [{'header': [1, 2, 3, 4, 5, 6, false]}],    
            // Several levels of title


            [{'color': []}, {'background': []}],     
            // font color, font background color
            [{'font': []}],     
            // font
            [{'align': []}],   
            // alignment


            ['clean'],   
            // Clear font style
            ['image', 'video']   
            // Upload pictures, upload videos

        ]
    } 
}

</script>


<style scoped>
td {
    padding-right: 10px;
}
.ancho {
    max-width: 650px;
}
.dropzone-custom-title {
    color: #009900;
}
</style>