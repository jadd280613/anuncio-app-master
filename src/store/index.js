import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        estado: '',
        firmado: false,
        destination: '/ui/upload'
    },
    mutations: {
        setState(state, estado) {
            state.estado = estado;
        },
        setDetalles(state, detalle) {
            state.estado.usuarioDetalles = detalle;
        },
        setFirmado(state, firmado) {
            state.firmado = firmado;
        },
        setDestination(state, destination) {
            state.destination = destination;
        }
    },
    plugins: [createPersistedState()]
})
export default store

