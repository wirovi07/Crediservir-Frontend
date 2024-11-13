<template>
  <!-- Tabla de eventos -->
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
                  <td>{{ row.description}}</td>
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

useMeta({ title: 'Category' });

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
    name: ''
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

onMounted(dataTableApi);
</script>

<style>
.modal.fade.show.d-block {
  display: block;
}
</style>