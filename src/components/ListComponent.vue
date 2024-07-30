<template>
  <!-- La lista que muestra los usuarios, "usuario" en usuario.nombre es como lo escribí en la fireStore database -->
  <div class="container">
    <ul class="list-container">
      <h3>Lista usuarios</h3>
      <!-- Enlista el nombre y el email del usuario nuevo agregado -->
      <li class="list-item" v-for="(usuario, index) in usuarios" :key="index">
        {{ usuario.nombre }} - {{ usuario.email }}
        <!-- Permite eliminar a un usuario agregado -->
        <button @click="deleteUsuario(usuario.id)" type="submit"
          class="button-eliminar btn btn-primary">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
// Importar las funciones de Firebase //
import { getFirestore, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../firebaseconfig';

export default {
  data() {
    return {
      // Se utiliza para almacenar los datos obtenidos de Firestore //
      usuarios: []
    };
  },
  // Para cargar la lista de usuarios de Firestore //
  mounted() {
    this.cargarUsuarios();
  },
  methods: {
    cargarUsuarios() {
      const database = getFirestore(firebaseApp);
      const usuariosRef = collection(database, 'usuarios');
      onSnapshot(usuariosRef, (snapshot) => {
        this.usuarios = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
      });
    },

    async deleteUsuario(usuarioId) {
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        try {
          const database = getFirestore(firebaseApp);
          const usuarioRef = doc(database, 'usuarios', usuarioId);
          await deleteDoc(usuarioRef);
          // Mostrar un mensaje de éxito al usuario
          alert('Usuario eliminado correctamente.');
        } catch (error) {
          // Mostrar un mensaje de error al usuario
          console.error('Error al eliminar usuario:', error);
          alert('Ocurrió un error al eliminar el usuario.');
        }
      }
    }
  }
}
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