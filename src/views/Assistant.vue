<template>
  <!-- Botón para abrir el modal -->
  <button class="btn btn-primary my-3" @click="showModal = true">Agregar Asistente</button>

  <!-- Modal para ingresar los datos -->
  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Nuevo Asistente</h5>
          <button type="button" class="btn-close" @click="resetFormData"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="first_name" class="form-label">Nombres</label>
              <input v-model="formData.first_name" type="text" class="form-control" id="first_name">
              <template v-if="errors.first_name.length > 0">
                <b :key="e" v-for="e in errors.first_name" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="last_name" class="form-label">Apellidos</label>
              <input v-model="formData.last_name" type="text" class="form-control" id="last_name">
              <template v-if="errors.last_name.length > 0">
                <b :key="e" v-for="e in errors.last_name" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="birthdate" class="form-label">Fecha de Nacimiento</label>
              <input v-model="formData.birthdate" type="date" class="form-control" id="birthdate">
              <template v-if="errors.birthdate.length > 0">
                <b :key="e" v-for="e in errors.birthdate" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email" class="form-label">Correo</label>
              <input v-model="formData.email" type="email" class="form-control" id="email">
              <template v-if="errors.email.length > 0">
                <b :key="e" v-for="e in errors.email" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="phone" class="form-label">Teléfono</label>
              <input v-model="formData.phone" type="text" class="form-control" id="phone">
              <template v-if="errors.phone.length > 0">
                <b :key="e" v-for="e in errors.phone" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetFormData">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="saveAssistant">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para editar los datos -->
  <div v-if="showModalEdit" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Asistente</h5>
          <button type="button" class="btn-close" @click="resetFormData"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="first_name" class="form-label">Nombres</label>
              <input v-model="formData.first_name" type="text" class="form-control" id="first_name">
              <template v-if="errors.first_name.length > 0">
                <b :key="e" v-for="e in errors.first_name" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="last_name" class="form-label">Apellidos</label>
              <input v-model="formData.last_name" type="text" class="form-control" id="last_name">
              <template v-if="errors.last_name.length > 0">
                <b :key="e" v-for="e in errors.last_name" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="birthdate" class="form-label">Fecha de Nacimiento</label>
              <input v-model="formData.birthdate" type="date" class="form-control" id="birthdate">
              <template v-if="errors.birthdate.length > 0">
                <b :key="e" v-for="e in errors.birthdate" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email" class="form-label">Correo</label>
              <input v-model="formData.email" type="email" class="form-control" id="email">
              <template v-if="errors.email.length > 0">
                <b :key="e" v-for="e in errors.email" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="phone" class="form-label">Teléfono</label>
              <input v-model="formData.phone" type="text" class="form-control" id="phone">
              <template v-if="errors.phone.length > 0">
                <b :key="e" v-for="e in errors.phone" class="text-danger">
                    {{ e }}
                </b>
            </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button ref="discardButton" type="button" class="btn btn-secondary" @click="resetFormData">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="editAssistant">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabla de asistentes -->
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered" id="sampleTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha Nacimiento</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                  <td>{{ row.name }}</td>
                  <td>{{ row.birthdate }}</td>
                  <td>{{ row.email }}</td>
                  <td>{{ row.phone }}</td>
                  <td>
                    <button class="btn btn-primary m-1" type="button" @click="viewAssistant(row)">Editar</button>
                    <button class="btn btn-danger m-1" type="button" @click="deleteAssistant(row)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useApi } from '../composables/use-api';
import { useMeta } from '../composables/use-meta';
import Swal from 'sweetalert2';

useMeta({ title: 'Assistant' });

const showModal = ref(false); // Controla la visibilidad del modal
const showModalEdit = ref(false); // Controla la visibilidad del modal

const tableData = ref([]);

const formData = ref({
  first_name: '',
  last_name: '',
  birthdate: '',
  email: '',
  phone: ''
});

const errors = ref({
  first_name: [],
  last_name: [],
  birthdate: [],
  email: [],
  phone: []
})

const errorsClear = () => {
  errors.value = {
    first_name: [],
    last_name: [],
    birthdate: [],
    email: [],
    phone: []
  }
}

const resetFormData = () => {
  formData.value = {
    first_name: '',
    last_name: '',
    birthdate: '',
    email: '',
    phone: ''
  }
  errorsClear();
  showModal.value = false;
  showModalEdit.value = false;
}

const discardButton = ref(null);

const dataTableApi = async () => {
  try {
    const data = await useApi('assistant');
    tableData.value = data.map((item) => ({
      id: item.id,
      name: item.assistants,
      birthdate: item.birthdate,
      email: item.email,
      phone: item.phone
    }));

    await nextTick();
    $('#sampleTable').DataTable();
    
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
};

const saveAssistant = async () => {
  errorsClear()

  let has_error = false;
  Object.entries(formData.value).forEach(f => {
    const elemento = f[0]
    const value = f[1]
    if (value === '') {
      has_error = true
      errors.value[elemento] = "Este campo es obligatorio"
    }
  })
  if(has_error){
    return
  }

  try {
    await useApi("assistant", "POST", formData.value)
    Swal.fire({
      title: 'Exito',
      text: 'Asistente agregado con exito',
      icon: 'success',
      confirmButtonText: '¡Entendido!'
    }).then(() => {
      if(discardButton.value){
        discardButton.value.click();
      }
      resetFormData()
    })
  } catch (error) {
    const errors_api = error.errors
    Object.entries(errors_api).forEach(e => {
      const elemento = e[0]
      const mensaje = e[1]
      errors.value[elemento] = mensaje
    })
  }

  $('#sampleTable').DataTable().destroy();

  await dataTableApi()
  showModal.value = false; 

}

let id; 

const viewAssistant = async (user) => {
  try {
    const response = await useApi("assistant/" + user.id);

    if (response.message === "Assistant found") {
      id = user.id;
      formData.value = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        birthdate: response.data.birthdate,
        email: response.data.email,
        phone: response.data.phone
      };
      showModalEdit.value = true; // Abre el modal de edición
    } else {
      console.log("Asistente no encontrado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del asistente:", error);
  }
};

const editAssistant = async () => {
  try {
    const dataUpdated = {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        birthdate: formData.value.birthdate,
        email: formData.value.email,
        phone: formData.value.phone
    }

    await useApi("assistant/" +id, "PUT", dataUpdated)

    Swal.fire({
      title: '¡Exito!',
      text: 'Asistente actualizado con éxito',
      icon: 'success',
      confirmButtonText: '¡Entendido!'
    }).then(() => {
        if(discardButton.value) {
          discardButton.value.click()
        }
        resetFormData()
    })
  } catch (error) {
    console.log("Error al actualizar el asistente:", error)
  }
  dataTableApi()
}

const deleteAssistant = async (user) => {
  const result = await Swal.fire({
    title: '¿Estás seguro de eliminar el asistente?',
    text: 'No podrás recuperar los datos una vez eliminado.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminala',
  });

  if (result.isConfirmed) {
    try {
      await useApi("assistant/" +user.id, "DELETE");

      tableData.value = tableData.value.filter((d) => d.id !== user.id);

      Swal.fire({
        title: '¡Eliminado!',
        text: 'Asistente eliminado con éxito',
        icon: 'success',
        confirmButtonText: '¡Entendido!',
      });

      // Vuelve a cargar la tabla (opcional si se usa `tableData.value` directamente)
      dataTableApi();
    } catch (error) {
      console.error("Error al eliminar el asistente:", error);

      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el asistente. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }
};

onMounted(dataTableApi);
</script>

<style>
.modal.fade.show.d-block {
  display: block;
}
</style>
