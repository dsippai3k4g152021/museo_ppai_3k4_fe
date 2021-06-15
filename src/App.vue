<template>
  <Header/>
  <FormVentas/> 
</template>

<script>
import Header from './components/header.vue';
import FormVentas from './components/FormVentas.vue';

export default {
  name: 'App',
  components: {
    Header,
    FormVentas
  }
}
</script>

<style >
#app{
  background-image: url('./assets/background.jpg');
  background-size: cover;
  height: 100vh;
}
</style>
