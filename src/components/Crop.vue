<template>
    <div id="contenedor">
    <div class="container">
          <a href="#" class="btn btn-outline-info my-2 my-sm-0" @click="$refs.FileInput.click()">Seleccione una imagen</a>

          <img
            v-if="cropedImage"
            :src="cropedImage"
            alt="Cropped Image"
            width="200px"
          />


          <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
        <div class="card" style="width: 380px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                        <label>Ingresar al sistema</label>
                    </div>
                    <div class="col-sm-6" style="text-align: right;">
                        <label>V. 1.2.3</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
              <div class="row">
              <VueCropper 
                v-show="selectedFile" 
                ref="cropper" 
                :src="selectedFile" 
                alt="Source Image">
              </VueCropper>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <a href="#" class="primary" @click="saveImage()">Corta la imagen</a>
                </div>
                <div class="col-sm-6">
                  <a href="#" color="primary" text @click="dialog = false">Tache</a>
                  <a href="#" color="primary" text @click="rota()">Rota</a>
                </div>
              </div>
            </div>
        </div>
        <div class="cropped-image">
          <img
            v-if="cropImg"
            :src="cropImg"
            alt="Cropped Image"
          />
          <div v-else class="crop-placeholder" />
        </div>
    </div>
    </div>
</template>



<script>
import { mapState } from 'vuex'
//import axios from 'axios'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
  props: ['image_name'],
  data() {
    return {
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',
      profile_photo: '',
      cropImg: '',
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    crop() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL(); 
    },
    rota() {
      this.$refs.cropper.rotate(45);
    },
    saveImage() {
      //const userId = this.$route.params.user_id
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('dinamico', blob, 'name.jpeg')
/*
        axios
          .post('/api/user/' + userId + '/profile-photo', formData)
          .then((response) => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
          */
      }, this.mime_type)
    },
    onFileSelect(e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      console.log(this.mime_type)
      if (typeof FileReader === 'function') {
        this.dialog = true
        const reader = new FileReader()
        reader.onload = (event) => {
          this.selectedFile = event.target.result
          this.$refs.cropper.replace(this.selectedFile)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
  },
}
</script>

<style scoped>
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
}

.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 14px;
  cursor: pointer;
}
</style>
