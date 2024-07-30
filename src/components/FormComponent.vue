<template>
  <!-- Formulario para ingresar la información de nuevo usuario -->
  <div class="form-container">
    <form @submit.prevent="addUser">
      <div class="mb-3 mt-4 pt-4">
        <!-- Input nombre -->
        <label class="form-label">Nombre</label>
        <input type="text" v-model="nuevoUsuario.nombre" class="form-control" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <!-- Input email -->
        <label class="form-label">Email</label>
        <input type="email" v-model="nuevoUsuario.email" class="form-control">
      </div>
      <!-- Permite agregar a un nuevo usuario -->
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
  </div>
</template>

<script>
// Importar las funciones de Firebase //
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../firebaseconfig';

export default {
  data() {
    return {
      // Objeto que almacenara los nuevos datos nombre y email //
      nuevoUsuario:
      {
        nombre: '',
        email: ''
      }
    };
  },
  methods: {
    async addUser() {
      // Verifica si el campo nombre y email reciben un string, si alguno esta vacio termina de ejecutarse //
      if (this.nuevoUsuario.nombre === '' || this.nuevoUsuario.email === '')
        return;
      // Conecta con Firestore //
      const db = getFirestore(firebaseApp);
      // Referencia a la colección de Firestore que se llama usuarios //
      const usuarioRef = collection(db, 'usuarios');
      // addDoc como dice agrega un nuevo documento a la colección llamada usuarios //
      await addDoc(usuarioRef, { nombre: this.nuevoUsuario.nombre, email: this.nuevoUsuario.email });
      // Limpia los campos después de agregar un usuario nuevo //
      this.nuevoUsuario = { nombre: '', email: '' };

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
