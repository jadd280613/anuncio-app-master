<template>
  <div>
    <h1>Interfaz del administrador</h1>
    <h2>{{ salta }}</h2>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      salta: store.state.estado.roles
    }
  }
}
</script>
