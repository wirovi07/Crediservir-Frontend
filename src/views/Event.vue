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
                  <th>Titulo</th>
                  <th>Descripción</th>
                  <th>Hora</th>
                  <th>Lugar</th>
                  <th>Cupo Disponible</th>
                  <th>Tipo[Gratiuto, Pago]</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Fecha de Apertura</th>
                  <th>Fecha de Cierre</th>
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
  
  <script>
  export default {
    name: "Event"
  }
  </script>
  