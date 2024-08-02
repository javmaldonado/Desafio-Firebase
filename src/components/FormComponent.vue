<template>
  <!-- Formulario para ingresar la información de nuevo usuario -->
  <div class="form-container">
    <form @submit.prevent="addUser">
      <div class="mb-3 mt-4 pt-4">
        <!-- Input nombre -->
        <label class="form-label">Nombre</label>
        <input type="text" v-model="nuevoUsuario.nombre" @input="handleInput" name="nombre" class="form-control">
      </div>
      <div class="mb-3">
        <!-- Input email -->
        <label class="form-label">Email</label>
        <input type="email" v-model="nuevoUsuario.email" @input="handleInput" name="email" class="form-control">
      </div>
      <!-- Permite agregar a un nuevo usuario -->
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['nuevoUsuario'])
  },
  methods: {
    ...mapActions(['addUser', 'updateNuevoUsuario']),
    handleInput(event) {
      const { name, value } = event.target;
      this.updateNuevoUsuario({ ...this.nuevoUsuario, [name]: value });
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
