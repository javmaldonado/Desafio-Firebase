import { createStore } from "vuex";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import firebaseApp from "../firebaseconfig";
// Implemente sweetAlert para darle estilo a las alertas //
import swal from "sweetalert";

const store = createStore({
  state: {
    usuarios: [],
    // Objeto que almacenara los nuevos datos nombre y email //
    nuevoUsuario: {
      nombre: "",
      email: "",
    },
  },
  mutations: {
    // Establece la lista de usuarios en el estado //
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
    // Agrega nuevos usuarios a la lista //
    addUsuario(state, usuario) {
      state.usuarios.push(usuario);
    },
    // Elimina usuarios a la lista //
    removeUsuario(state, usuarioId) {
      state.usuarios = state.usuarios.filter(
        (usuario) => usuario.id !== usuarioId
      );
    },
    // Actualiza los datos de los nuevos usuarios //
    updateNuevoUsuario(state, nuevoUsuario) {
      state.nuevoUsuario = nuevoUsuario;
    },
    // Limpia los valores ingresados //
    resetNuevoUsuario(state) {
      state.nuevoUsuario = { nombre: "", email: "" };
    },
  },
  actions: {
    // Carga la lista de usuarios desde Firestore //
    cargarUsuarios({ commit }) {
      const database = getFirestore(firebaseApp);
      const usuariosRef = collection(database, "usuarios");
      // Actualiza en tiempo real los combios de la colección "usuarios"//
      onSnapshot(usuariosRef, (snapshot) => {
        const usuarios = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit("setUsuarios", usuarios);
      });
    },
    // Muestra las alertas usando swal //
    async deleteUsuario({ commit }, usuarioId) {
      const deleteUser = await swal({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este usuario.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (deleteUser) {
        try {
          const database = getFirestore(firebaseApp);
          const usuarioRef = doc(database, "usuarios", usuarioId);
          await deleteDoc(usuarioRef);
          commit("removeUsuario", usuarioId);
          swal("Usuario eliminado correctamente.", { icon: "success" });
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          swal("Ocurrió un error al eliminar el usuario.", { icon: "error" });
        }
      }
    },

    // Agrega un usuario nuevo a Firestore  //
    async addUser({ state, commit }) {
      try {
        // Conecta con Firestore //
        const database = getFirestore(firebaseApp);
        // Referencia a la colección de Firestore que se llama usuarios //
        const usuarioRef = collection(database, "usuarios");
        await addDoc(usuarioRef, state.nuevoUsuario);
        swal("Usuario agregado correctamente.", { icon: "success" });
        commit("resetNuevoUsuario");
      } catch (error) {
        console.error("Error al agregar usuario:", error);
        swal("Ocurrió un error al agregar el usuario.", { icon: "error" });
      }
    },
    // Actualiza la lista //
    updateNuevoUsuario({ commit }, nuevoUsuario) {
      commit("updateNuevoUsuario", nuevoUsuario);
    },
  },
  getters: {
    usuarios: (state) => state.usuarios,
    nuevoUsuario: (state) => state.nuevoUsuario,
  },
});

export default store;
