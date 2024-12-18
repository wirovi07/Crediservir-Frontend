<template>

  <button class="btn btn-primary my-3" @click="showModal = true">Agregar Evento</button>

  <!-- Modal para agregar un nuevo registro -->
  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Nuevo Evento</h5>
          <button type="button" class="btn-close" @click="resetFormData"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Tipo de Entrada -->
            <div class="col-md-6 mb-3">
              <label for="type_input" class="form-label">Tipo de Entrada</label>
              <select v-model="formData.type_input" class="form-select" id="type_input">
                <option style="margin: 1px" value="" disabled selected>Tipo de Entrada</option>
                <option value="Gratis">Gratis</option>
                <option value="General">General</option>
                <option value="VIP">VIP</option>
              </select>
              <template v-if="errors.type_input.length > 0">
                <b :key="e" v-for="e in errors.type_input" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Fecha de Compra -->
            <div class="col-md-6 mb-3">
              <label for="purchase_date" class="form-label">Fecha</label>
              <input v-model="formData.purchase_date" type="time" class="form-control" id="purchase_date">
              <template v-if="errors.purchase_date.length > 0">
                <b :key="e" v-for="e in errors.purchase_date" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Codigo Promocional -->
            <div class="col-md-6 mb-3">
              <label for="code" class="form-label">Código Promocional</label>
              <select v-model="formData.code_promotional" class="form-select" id="code">
                <option value="" disabled selected>Seleccione un código</option>
                <option v-for="code in codePromotionalList" :value="code.id" :key="code.id">
                  {{ code.code }}
                </option>
              </select>
              <template v-if="errors.code_promotional.length > 0">
                <b v-for="e in errors.code_promotional" :key="e" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Asistente-->
            <div class="col-md-6 mb-3">
              <label for="assitant_id" class="form-label">Asistente</label>
              <select v-model="formData.assitant_id" class="form-select" id="assitant_id">
                <option value="" disabled selected>Seleccione una categoría</option>
                <option :value="assistant.id" :key="assistant.id" v-for="assistant in assistantList">
                  {{ assistant.assistants }}
                </option>
              </select>
              <template v-if="errors.assitant_id.length > 0">
                <b :key="e" v-for="e in errors.assitant_id" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Evento-->
            <div class="col-md-6 mb-3">
              <label for="event_id" class="form-label">Evento</label>
              <select v-model="formData.event_id" class="form-select" id="event_id" :class="{'is-invalid': errors.event_id?.length > 0}" aria-describedby="event_id_error">
                <option value="" disabled selected>Seleccione Evento</option>
                <option v-for="event in eventList" :value="event.id" :key="event.id" >
                  {{ event.title }}
                </option>
              </select>
              <template v-if="errors.event_id?.length > 0">
                <b :key="e" v-for="e in errors.event_id" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Valor Calculado -->
            <div class="col-md-6 mb-3">
              <label for="calculated_value" class="form-label">Valor Calculado</label>
              <input v-model="formData.calculated_value" type="text" class="form-control" id="calculated_value" readonly
              :class="{ 'is-invalid': errors.calculated_value?.length > 0 }"
              aria-describedby="calculated_value_error">
              <template v-if="errors.calculated_value.length > 0">
                <b :key="e" v-for="e in errors.calculated_value" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetFormData">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="saveEvent">Guardar</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal para editar un nuevo registro -->
  <div v-if="showModalEdit" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Evento</h5>
          <button type="button" class="btn-close" @click="resetFormData"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Título -->
            <div class="col-md-6 mb-3">
              <label for="title" class="form-label">Título</label>
              <input v-model="formData.title" type="text" class="form-control" id="title">
              <template v-if="errors.title.length > 0">
                <b :key="e" v-for="e in errors.title" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Categoria -->
            <div class="col-md-6 mb-3">
              <label for="category" class="form-label">Categoría</label>
              <select v-model="formData.category_id" class="form-select" id="category">
                <option value="" disabled selected>Seleccione una categoría</option>
                <option v-for="category in categoriesList" :key="category.id" :value="category.id"  >
                  {{ category.name }}
                </option>
              </select>
              <template v-if="errors.category_id.length > 0">
                <b :key="e" v-for="e in errors.category_id" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Descripción -->
            <div class="col-md-6 mb-3">
              <label for="description" class="form-label">Descripción</label>
              <input v-model="formData.description" type="text" class="form-control" id="description">
              <template v-if="errors.description.length > 0">
                <b :key="e" v-for="e in errors.description" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Hora -->
            <div class="col-md-6 mb-3">
              <label for="hour" class="form-label">Hora</label>
              <input v-model="formData.hour" type="time" class="form-control" id="hour">
              <template v-if="errors.hour.length > 0">
                <b :key="e" v-for="e in errors.hour" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Lugar -->
            <div class="col-md-6 mb-3">
              <label for="place" class="form-label">Lugar</label>
              <input v-model="formData.place" type="text" class="form-control" id="place">
              <template v-if="errors.place.length > 0">
                <b :key="e" v-for="e in errors.place" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Espacio disponible -->
            <div class="col-md-6 mb-3">
              <label for="availabl_space" class="form-label">Espacio Disponible</label>
              <input v-model="formData.availabl_space" type="number" class="form-control" id="availabl_space">
              <template v-if="errors.availabl_space.length > 0">
                <b :key="e" v-for="e in errors.availabl_space" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Tipo -->
            <div class="col-md-6 mb-3">
              <label for="type" class="form-label">Tipo</label>
              <select v-model="formData.type" class="form-control" id="type">
                <option value="" disabled>Seleccione un tipo</option>
                <option value="gratuito">Gratuito</option>
                <option value="pago">Pago</option>
              </select>
              <template v-if="errors.type.length > 0">
                <b :key="e" v-for="e in errors.type" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Valor Base -->
            <div class="col-md-6 mb-3">
              <label for="base_value" class="form-label">Valor Base</label>
              <input v-model="formData.base_value" type="number" class="form-control" id="base_value">
              <template v-if="errors.base_value.length > 0">
                <b :key="e" v-for="e in errors.base_value" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Fecha de Apertura -->
            <div class="col-md-6 mb-3">
              <label for="opening_date" class="form-label">Fecha de Apertura</label>
              <input v-model="formData.opening_date" type="date" class="form-control" id="opening_date">
              <template v-if="errors.opening_date.length > 0">
                <b :key="e" v-for="e in errors.opening_date" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
            <!-- Fecha de Cierre -->
            <div class="col-md-6 mb-3">
              <label for="closing_date" class="form-label">Fecha de Cierre</label>
              <input v-model="formData.closing_date" type="date" class="form-control" id="closing_date">
              <template v-if="errors.closing_date.length > 0">
                <b :key="e" v-for="e in errors.closing_date" class="text-danger">
                  {{ e }}
                </b>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetFormData">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="editEvent">Guardar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Tabla de eventos -->
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered" id="sampleTable">
              <thead>
                <tr>
                  <th>Tipo de Entrada</th>
                  <th>Valor Calculado</th>
                  <th>Fecha de Compra</th>
                  <th>Codigo Promocional</th>
                  <th>Asistente</th>
                  <th>Evento</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                  <td>{{ row.type_input }}</td>
                  <td>{{ row.calculated_value }}</td>
                  <td>{{ row.purchase_date }}</td>
                  <td>{{ row.code_promotional }}</td>
                  <td>{{ row.assitant_id }}</td>
                  <td>{{ row.event_id }}</td>
                  <td>
                    <button class="btn btn-primary m-1" type="button" @click="viewEvent(row)">Editar</button>
                    <button class="btn btn-danger m-1" type="button" @click="deleteEvent(row)">Eliminar</button>
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

import { onMounted, ref, nextTick, onBeforeMount, watch } from 'vue';
import { useApi } from '../composables/use-api';
import { useMeta } from '../composables/use-meta';
import Swal from 'sweetalert2';

useMeta({ title: 'Registration' })

const showModal = ref(false)
const showModalEdit = ref(false)

const tableData = ref([])

const formData = ref({
  type_input: '',
  calculated_value: '',
  purchase_date: '',
  code_promotional: '',
  user_id: '',
  assitant_id: '',
  event_id: null,
})

const errors = ref({
  type_input: [],
  calculated_value: [],
  purchase_date: [],
  code_promotional: [],
  user_id: [],
  assitant_id: [],
  event_id: [],
})

const errorsClear = () => {
  errors.value = {
    type_input: [],
    calculated_value: [],
    purchase_date: [],
    code_promotional: [],
    user_id: [],
    assitant_id: [],
    event_id: [],
  }
}

const resetFormData = () => {
  formData.value = {
    type_input: '',
    calculated_value: '',
    purchase_date: '',
    code_promotional: '',
    user_id: '',
    assitant_id: '',
    event_id: '',
  }
  errorsClear()
  showModal.value = false
  showModalEdit.value = false
}

const discardButton = ref(null)

const dataTableApi = async () => {
  try {
    const data = await useApi('registration')
    tableData.value = data.map((item) => ({
      id: item.id,
      type_input: item.type_input,
      calculated_value: item.calculated_value,
      purchase_date: item.purchase_date,
      code_promotional: item.code_promotional,
      assitant_id: item.assitant_id,
      event_id: item.event_id,
    }))

    await nextTick()
    $('#sampleTable').DataTable()

  } catch (error) {
    console.error('Error fetching data from API:', error)
  }
}

const saveEvent = async () => {
  console.log("Lo que quiero ver es esto: ",formData.value)
  errorsClear()

  let has_error = false
  Object.entries(formData.value).forEach(f => {
    const elemento = f[0]
    const value = f[1]
    if (value === '') {
      has_error = true
      errors.value[elemento] = 'Este campo es obrigatório'
    }
  })
  if (has_error) {
    return
  }

  try {
    await useApi("eventcategory", "POST", formData.value)
    Swal.fire({
      title: 'Exito',
      text: 'Evento creado con éxito',
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
  showModal.value = false
}

let id;

const viewEvent = async (user) => {
  try {
    const response = await useApi("eventcategory/" + user.id)

    console.log(response)

    if (response.message === "Event Category found") {
      id = user.id
      formData.value = {
        "title": response.data.title,
        "description": response.data.description,
        "hour": response.data.hour,
        "place": response.data.place,
        "availabl_space": response.data.availabl_space,
        "type": response.data.type,
        "base_value": response.data.base_value,
        "opening_date": response.data.opening_date,
        "closing_date": response.data.closing_date,
        "category_id": response.data.category_id
      }

      console.log("Las valores de formData: ", formData.value)
      showModalEdit.value = true
    } else {
      console.log("Evento no encontrado")
    }
  } catch (error) {
    console.log("Error al obtener los datos del evento:", error)
  }
}

const editEvent = async () => {
  try {
    const dataUpdated = {
      "title": formData.value.title,
      "description": formData.value.description,
      "date": formData.value.date,
      "hour": formData.value.hour,
      "place": formData.value.place,
      "availabl_space": formData.value.availabl_space,
      "type": formData.value.type,
      "base_value": formData.value.base_value,
      "opening_date": formData.value.opening_date,
      "closing_date": formData.value.closing_date,
      "category_id": formData.value.category_id
    }

    await useApi("eventcategory/" + id, "PUT", dataUpdated)

    Swal.fire({
      title: "Exito",
      text: "Evento actualizado con exito",
      icon: "success",
      confirmButtonText: '¡Entendido!'
    }).then(() => {
      if (discardButton.value) {
        discardButton.value.click()
      }
      resetFormData()
    })
  } catch (error) {
    console.log("Error al actualizar el evento:", error)
  }
  dataTableApi()
}

const deleteEvent = async (user) => {
  const result = await Swal.fire({
    title: "¿Estas seguro de eliminar el evento?",
    text: "No podrás recuperar el evento eliminado",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, eliminar!',
  })

  if (result.isConfirmed) {
    try {
      await useApi("eventcategory/" + user.id, "DELETE")

      tableData.value = tableData.value.filter((d) => d.id !== user.id)

      Swal.fire({
        title: "¡Eliminado!",
        text: "El evento ha sido eliminado con exito",
        icon: "success",
        confirmButtonText: '¡Entendido!'
      })
      dataTableApi()
    } catch (error) {
      console.error("Error al eliminar el evento:", error)

      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el evento. Intentelo de nuevo.",
        icon: "error",
        confirmButtonText: 'Aceptar'
      })
    }
  }
}

onMounted(dataTableApi);

onBeforeMount(() => {
  showCodePromotion();
  showEvent();
  showAssistant();
});

const codePromotionalList = ref([])
const showCodePromotion = async () => {
  try {
    const response = await useApi("promotionalCodes")
    codePromotionalList.value = response
  } catch (error) {
    console.log('Error al obtener el codigo promocional')
  }
}

const eventList = ref([])
const showEvent = async () => {
  try {
    const response = await useApi("event")
    eventList.value = response
  } catch (error) {
    console.log('Error al obtener el evento:', error)
  }
}

watch(() => formData.value.event_id, (newValue) => {
  const selectedEvent = eventList.value.find((event) => event.id === newValue);
  if (selectedEvent) {
    formData.value.calculated_value = selectedEvent.calculated_value; 
    formData.value.calculated_value = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(selectedEvent.calculated_value); 
  } else {
    formData.value.calculated_value = null;
  }
});

const assistantList = ref([])
const showAssistant = async () => {
  try {
    const response = await useApi("assistant")
    assistantList.value = response
  } catch (error) {
    console.log('Error al obtener el asistente')
  }
}

</script>

<style>
.modal.fade.show.d-block {
  display: block;
}
</style>