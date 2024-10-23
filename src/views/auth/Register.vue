<template>
    <div>
        <!-- Sección superior con fondo -->
        <section class="material-half-bg">
            <div class="cover"></div>
        </section>

        <!-- Contenido principal del registro -->
        <section class="content">
            <div class="logo">
                <h1 style="text-align: center; color: white; text-align: center;">Crediservir</h1>
            </div>

            <div class="login-box">
                <!-- Formulario de registro -->
                <form @submit.prevent="register">
                    <h3 class="login-head">
                        <i class="bi bi-person me-2"></i>REGISTER
                    </h3>

                    <!-- Primera fila (Tipo de Documento y Documento) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">TYPE DOCUMENT</label>
                            <input class="form-control" type="text" v-model="formData.type_document"
                                placeholder="Type of Document" autofocus />
                            <template v-if="errors.type_document.length > 0">
                                <b :key="e" v-for="e in errors.type_document" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">DOCUMENT</label>
                            <input class="form-control" type="text" v-model="formData.document" placeholder="Document Number" />
                            <template v-if="errors.document.length > 0">
                                <b :key="e" v-for="e in errors.document" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                    </div>

                    <!-- Segunda fila (Primer Nombre y Apellido) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">FIRST NAME</label>
                            <input class="form-control" type="text" v-model="formData.firts_name" placeholder="First Name" />
                            <template v-if="errors.firts_name.length > 0">
                                <b :key="e" v-for="e in errors.firts_name" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">LAST NAME</label>
                            <input class="form-control" type="text" v-model="formData.last_name" placeholder="Last Name" />
                            <template v-if="errors.last_name.length > 0">
                                <b :key="e" v-for="e in errors.last_name" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                    </div>

                    <!-- Tercera fila (Sexo y Teléfono) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">SEX</label>
                            <select v-model="formData.sex" class="form-control">
                                <option style="margin: 1px" value="" disabled selected>SEX</option>
                                <option value="male">Mascul</option>
                                <option value="female">Female</option>
                            </select>
                            <template v-if="errors.sex.length > 0">
                                <b :key="e" v-for="e in errors.sex" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">PHONE</label>
                            <input class="form-control" type="text" v-model="formData.phone" placeholder="Phone Number" />  
                            <template v-if="errors.phone.length > 0">
                                <b :key="e" v-for="e in errors.phone" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                    </div>

                    <!-- Cuarta fila (Dirección y Email) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">ADDRESS</label>
                            <input class="form-control" type="text" v-model="formData.address" placeholder="Address" />
                            <template v-if="errors.address.length > 0">
                                <b :key="e" v-for="e in errors.address" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">EMAIL</label>
                            <input class="form-control" type="email" v-model="formData.email" placeholder="Email" />
                            <template v-if="errors.email.length > 0">
                                <b :key="e" v-for="e in errors.email" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                    </div>

                    <!-- Quinta fila (Contraseña y Confirmar Contraseña) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">PASSWORD</label>
                            <input class="form-control" type="password" v-model="formData.password" placeholder="Password" />
                            <template v-if="errors.password.length > 0">
                                <b :key="e" v-for="e in errors.password" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">CONFIRM PASSWORD</label>
                            <input class="form-control" type="password" v-model="formData.password_confirmed"
                                placeholder="Confirm Password" />
                            <template v-if="errors.password_confirmed.length > 0">
                                <b :key="e" v-for="e in errors.password_confirmed" class="text-danger">
                                    {{ e }}
                                </b>
                            </template>
                        </div>
                    </div>

                    <!-- Botón de Registro -->
                    <div class="mb-3 btn-container d-grid">
                        <button class="btn btn-primary btn-block">
                            <i class="bi bi-box-arrow-in-right me-2 fs-5"></i>REGISTER
                        </button>
                    </div>
                </form>

                <!-- Enlace para volver a login -->
                <div class="mt-3">
                    <p class="semibold-text mb-0">
                        <a href="#" @click="goToLogin"><i class="bi bi-chevron-left me-1"></i> Back to Login</a>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Register' });
const router = useRouter();

import axios from 'axios';
import Swal from 'sweetalert2';

const formData = ref({
    type_document: '',
    document: '',
    firts_name: '',
    last_name: '',
    sex: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    password_confirmed: ''
})

const errors = ref({
    type_document: [],
    document: [],
    firts_name: [],
    last_name: [],
    sex: [],
    phone: [],
    address: [],
    email: [],
    password: [],
    password_confirmed: []
});

const errorsClear = () =>{
    errors.value = {
        type_document: [],
        document: [],
        firts_name: [],
        last_name: [],
        sex: [],
        phone: [],
        address: [],
        email: [],
        password: [],
        password_confirmed: []
    }
}

const register = async() => {
    errorsClear()

    let has_error = false;
    Object.entries(formData.value).forEach(f => {
        const elemento = f[0];
        const value = f[1];
        if (value === '') {
            has_error = true;
            errors.value[elemento] = "Este campo es obli"
        }
    })
};

const goToLogin = () => {
    router.push({ name: 'Login' });
};
</script>

<style scoped>
.material-half-bg {
    background-color: #f8f9fa;
    height: 200px;
}

.cover {
    background-color: #343a40;
    height: 100%;
}

.logo {
    margin-bottom: 20px;
}

.login-box {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-head {
    margin-bottom: 20px;
    font-weight: bold;
    color: #343a40;
    text-align: center;
}

.form-label {
    font-weight: bold;
}

.btn-container {
    margin-top: 20px;
}

.semibold-text {
    font-weight: 600;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
