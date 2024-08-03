<template>
  <div class="container">
    <ul class="list-container">
      <h3>Lista usuarios</h3>
      <li class="list-item" v-for="(usuario, index) in usuarios" :key="index">
        {{ usuario.nombre }} - {{ usuario.email }}
        <button @click="deleteUsuario(usuario.id)" type="submit"
          class="button-eliminar btn btn-primary">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
// Importar funciones de vuex //
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['usuarios'])
  },
  mounted() {
    this.cargarUsuarios();
  },
  methods: {
    ...mapActions(['cargarUsuarios', 'deleteUsuario'])
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

}

.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  background-color: #f9f9f9dd;
  border-radius: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  width: 100%;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ff1a1a;
}

@media (max-width: 600px) {
  .list-item {
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    align-self: flex-end;
  }
}
</style>