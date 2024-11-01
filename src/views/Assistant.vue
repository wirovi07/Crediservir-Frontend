<template>
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
                    <button class="btn btn-primary m-1" type="button">Editar</button>
                    <button class="btn btn-danger m-1" type="button">Eliminar</button>
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

const tableData = ref([])

const dataTableApi = async () => {
  try {
    const data = await useApi('assistant');
    tableData.value = data.map((item) => ({
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
}

onMounted(dataTableApi);
</script>
