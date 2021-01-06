<template>
  <div>
    <h1>Forbidden</h1>
    <ul>
      <li><a href='#' @click='goLogin'>Login</a></li>
      <li><a href='#' @click='goRegistro'>Registro</a></li>
    </ul>
  </div>
</template>

<script>
import router from '../router'

export default {
  data() {
    return {
      salta: 'ok'
    }
  },
  methods: {
    goLogin: function() {
      router.push('/ui/login');
    },
    goRegistro: function() {
      router.push('/ui/registro');
    }
  }
}
</script>