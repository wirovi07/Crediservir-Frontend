<template>
  <button class="btn btn-primary my-3" @click="showModal = true">Agregar Categoria</button>
  
  <!-- Modal para agregar un nuevo registro -->
  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Nueva Categoria</h5>
          <button type="button" class="btn-close" @click="resetFormData"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="name" class="form-label">Categoria</label>
              <input v-model="formData.name" type="text" class="form-control" id="name">
              <template v-if="errors.name.length > 0">
                <b :key="e" v-for="e in errors.name" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="description" class="form-label">Descripción</label>
              <input v-model="formData.description" type="text" class="form-control" id="description">
              <template v-if="errors.description.length > 0">
                <b :key="e" v-for="e in errors.description" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetFormData">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="saveCategory">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para editar los datos -->
  <div v-if="showModalEdit" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Categoria</h5>
          <button type="button" class="btn-close" @click="resetFormData"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="name" class="form-label">Categoria</label>
              <input v-model="formData.name" type="text" class="form-control" id="name">
              <template v-if="errors.name.length > 0">
                <b :key="e" v-for="e in errors.name" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <div class="col-md-6 mb-3">
              <label for="description" class="form-label">Apellidos</label>
              <input v-model="formData.description" type="text" class="form-control" id="description">
              <template v-if="errors.description.length > 0">
                <b :key="e" v-for="e in errors.description" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button ref="discardButton" type="button" class="btn btn-secondary" @click="resetFormData">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="editCategory">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabla de Categorias -->
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered" id="sampleTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                  <td>{{ row.name }}</td>
                  <td>{{ row.description }}</td>
                  <td>
                    <button class="btn btn-primary m-1" type="button" @click="viewCategory(row)">Editar</button>
                    <button class="btn btn-danger m-1" type="button" @click="deleteCategory(row)">Eliminar</button>
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

useMeta({ title: 'Category' });

const showModal = ref(false)
const showModalEdit = ref(false)

const tableData = ref([]);

const formData = ref({
  name: '',
  description: '',
});

const errors = ref({
  name: [],
  description: [],
})

const errorsClear = () => {
  errors.value = {
    name: [],
    description: [],
  }
}

const resetFormData = () => {
  formData.value = {
    name: '',
    description: '',
  }
  errorsClear()
  showModal.value = false;
  showModalEdit.value = false;
}

const discardButton = ref(null)

const dataTableApi = async () => {
  try {
    const data = await useApi('category');
    tableData.value = data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));

    await nextTick();
    $('#sampleTable').DataTable();

  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
}

const saveCategory = async () => {
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
  if (has_error) {
    return
  }

  try {
    await useApi("category", "POST", formData.value)
    Swal.fire({
      title: 'Exito',
      text: 'La categoría se ha creado con éxito',
      icon: 'success',
      confirmButtonText: '¡Entendido!'
    }).then(() => {
      if (discardButton.value) {
        discardButton.value.click()
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

  $('#sampleTable').DataTable().destroy()

  await dataTableApi()
  showModal.value = false;
}

let id;

const viewCategory = async (user) => {
  try {
    const response = await useApi("category/" + user.id)

    if (response.message === "Category found") {
      id = user.id
      formData.value = {
        "name": response.data.name,
        "description": response.data.description,
      }
      showModalEdit.value = true
    } else {
      console.log("Categoria no encontrada")
    }
  } catch (error) {
    console.log("Error al obtener los datos de la categoria: ", error)
  }
}

const editCategory = async () => {
  try {
    const dataUpdated = {
      name: formData.value.name,
      description: formData.value.description
    }

    await useApi("category/" + id, "PUT", dataUpdated)

    Swal.fire({
      title: '¡Exito!',
      text: 'La categoria se ha actualizado correctamente',
      icon: 'success',
      confirmButtonText: '¡Entendido!'
    }).then(() => {
      if (discardButton.value) {
        discardButton.value.click()
      }
      resetFormData()
    })
  } catch (error) {
    console.log("Error al actualizar la categoria: ", error)
  }
  dataTableApi()
}

const deleteCategory = async (user) => {
  const result = await Swal.fire({
    title: '¿Estás seguro de eliminar la categoria?',
    text: 'No podrás recuperar los datos una vez eliminado.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, eliminarla!',
  })

  if (result.isConfirmed) {
    try {
      await useApi("category/" + user.id, "DELETE")

      tableData.value = tableData.value.filter((d) => d.id !== user.id)

      Swal.fire({
        title: '¡Eliminado!',
        text: 'La categoria se ha eliminado correctamente',
        icon: 'success',
        confirmButtonText: '¡Entendido!',
      })

      dataTableApi()
    } catch (error) {
      console.error("Error al eliminar la categoria: ", error)

      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el asistente. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }
}

onMounted(dataTableApi);
</script>

<style>
.modal.fade.show.d-block {
  display: block;
}
</style>