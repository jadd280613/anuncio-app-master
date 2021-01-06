<template>
  <div class="hello">
    <h1>{{ otro }}</h1>
    <p>Interfaz para el ROL 2</p>
    <!-- FROM: https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md -->
    
    <a href="#" class="btn btn-primary" @click="regresa">Ve a 'segunda'</a>

    <br/><br/>

    <div class="marco">
      <div class="upload">
        <VueSlickCarousel 
          :arrows="true" 
          :dots="true"
          :centerMode="true"
          :variableWidth="true">
          <div v-for="(img, index) in images" :key="index"> 
            <img height="300px" :src="img.url" /> 
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <hr/>
        
    <h1>Videos</h1>
    <br/>

    <div class="marco2">
      <video width="500px" height="auto" controls muted="">
         <source src="https://aws-multimedia-bucket.s3.us-east-2.amazonaws.com/videos-clases/20200930_1700.mp4" type="video/mp4">
         Your browser does not support the video tag.
			</video>
      <br/>
      <video width=500px height=auto controls>
         <source src="https://aws-multimedia-bucket.s3.us-east-2.amazonaws.com/videos-clases/20200930_1700.mp4" type="video/mp4">
         Your browser does not support the video tag.
			</video>
      <br/>
      <video width=500px height=auto controls>
         <source src="https://aws-multimedia-bucket.s3.us-east-2.amazonaws.com/videos-clases/20200930_1700.mp4" type="video/mp4">
         Your browser does not support the video tag.
			</video>
      <br/>
      <video width=500px height=auto controls>
         <source src="https://aws-multimedia-bucket.s3.us-east-2.amazonaws.com/videos-clases/20200930_1700.mp4" type="video/mp4">
         Your browser does not support the video tag.
			</video>
    </div>

  </div>
</template>

<script>
import router from '../router'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data() {
    return {
      colorSala: 0,
      usuario: {
        rol: "admin"
      },
      otro: this.$store.state.distribuidorId,
      ultimo: 2,
      images: [
        {url: 'https://www.okchicas.com/wp-content/uploads/2015/10/Los-perros-aman-sin-importar-el-dinero-21.jpg'},
        {url: 'https://www.okchicas.com/wp-content/uploads/2015/10/Los-perros-aman-sin-importar-el-dinero-7.jpg'},
        {url: 'https://www.okchicas.com/wp-content/uploads/2015/10/Los-perros-aman-sin-importar-el-dinero-2.jpg'},
        {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSemDEVoA_yvWCwioW6DXKq6VdtQ3wogehG7Q&usqp=CAU'},
        {url: 'https://4.bp.blogspot.com/-r8Q_oriJxQc/XegdxY1xPfI/AAAAAAABCrg/3UOuL8Z2masjpVY8LDdjru7s68kCllsEQCLcBGAsYHQ/s400/Fondo%2Bcel%2Bmujer%2B%25283%2529.jpg'}
      ]
    }
  },
  components: { VueSlickCarousel },
  methods: {
    regresa: function() {
      router.push('/ui/segunda');
    },
    pba() {
      console.log('pba');
    }
  },
  computed: {

  },
  created() {
    //console.log(this);
    //console.log(this.$store.state.distribuidorId);
  },
  name: 'Tercera',
  props: {
    msg: String
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
.upload {
  width: 500px;
  margin: auto;
  background-color: #060606;
}
.marco {
  margin: auto;
  width: 560px;
  background-color: #060606;
  padding-top: 6px;
}

.marco2 {
  margin: auto;
  width: 560px;
  height: 400px;
  background-color: #ff0000;
  padding-top: 6px;
  overflow-y: scroll;
  margin-bottom: 40px;
}

</style>

