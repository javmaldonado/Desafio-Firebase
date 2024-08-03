<template>
  <div class="form-container">
    <form @submit.prevent="handleAddUser">
      <div class="mb-3 mt-4 pt-4">
        <label class="form-label">Nombre</label>
        <input type="text" v-model="nuevoUsuario.nombre" class="form-control" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="nuevoUsuario.email" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['nuevoUsuario'])
  },
  methods: {
    ...mapActions(['addUser', 'updateNuevoUsuario']),
    async handleAddUser() {
      await this.addUser();
      this.updateNuevoUsuario({ nombre: '', email: '' });
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
