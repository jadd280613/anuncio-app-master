//import Vue from 'vue'
import http from '@/helpers/http.js'
//import router from '@/router'

export default {
  /* eslint-disbale no-unused-vars */
	getAnuncios({ commit }) {
      http.get('/api/anuncios.json').then(res => {
        commit('setAnuncios', res.data)
        console.log(res)
      }, err => {
        console.table(err)
      })
    },
    getAnuncio({ commit }, id) {
      http.get('/api/anuncio.json?id=' + id).then(res => {
        commit('setAnuncio', res.data)
        console.log(res)
      }, err => {
        console.table(err)
      })
    },
    aprobarAnuncio({commit},param) { // eslint-disable-line no-unused-vars
      http.post('/api/apruebaAnuncio.json', param).then(res => {
        console.log('Aprobado',res.status)
      }, err => {
        console.log('no aprobado',err)
        console.table(err)
      })
    },
    declinarAnuncio({commit},param) { // eslint-disable-line no-unused-vars
      http.post('/api/declinaAnuncio.json', param).then(res => {
        console.log('Declinado',res.status)
      }, err => {
        console.log('no declinado',err)
        console.table(err)
      })
    },
    /* eslint-enable no-unused-vars */
};