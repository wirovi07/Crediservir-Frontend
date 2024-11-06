<template>
    <div>
        <!-- Sección superior con fondo -->
        <section class="material-half-bg">
            <div class="cover"></div>
        </section>

        <!-- Contenido principal del login -->
        <section class="content">
            <div class="logo">
                <h1 style="text-align: center; color: white; text-align: center;">Crediservir</h1>
            </div>

            <div class="login-box">
                <!-- Formulario de login -->
                <form class="login-form" @submit.prevent="login">
                    <h3 class="login-head"><i class="bi bi-person me-2"></i>SIGN IN</h3>

                    <div class="mb-3">
                        <label class="form-label">USERNAME</label>
                        <input class="form-control" type="email" v-model="formData.email" placeholder="Email" autofocus />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">PASSWORD</label>
                        <input class="form-control" type="password" v-model="formData.password" placeholder="Password" />
                    </div>

                    <div class="mb-3">
                        <div class="utility d-flex">
                            <p class="semibold-text mb-2 ms-auto">
                                <a href="#" @click.prevent="goToRegister">Register?</a>
                            </p>
                        </div>
                    </div>

                    <div class="mb-3 btn-container d-grid">
                        <button class="btn btn-primary btn-block">
                            <i class="bi bi-box-arrow-in-right me-2 fs-5"></i>SIGN IN
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useMeta } from '../../composables/use-meta';
import { useApi } from '../../composables/use-api';
import axios from 'axios';

const router = useRouter();

useMeta({ title: 'Login' });

const formData = ref({
    email: 'xialropin@hotmail.com',
    password: '12345678',
});

const login = async (event) => {
    event.preventDefault();

    if (!formData.value.email || !formData.value.password) {
        Swal.fire({
            title: 'Error!',
            text: 'Debe llenar todos los campos',
            icon: 'error',
            confirmButtonText: '¡Entendido!'
        });
        return;
    }

    try {
        const data = await useApi('login', 'POST', formData.value);

        // Verifica si el token existe en la respuesta
        const token = data.access_token;
        if (!token) {
            Swal.fire({
                title: 'Error!',
                text: 'No se recibió un token válido. Por favor, inténtelo de nuevo.',
                icon: 'error',
                confirmButtonText: '¡Entendido!'
            });
            return;
        }

        // Si el token es válido, almacenarlo en localStorage
        localStorage.setItem('token', token);

        // Redirigir al dashboard
        router.push({ name: 'Dashboard' });

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: '¡Entendido!'
        });
    }
};

const goToRegister = () => {
    router.push({ name: 'Register' });
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

.login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
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

.form-check-label {
    color: #495057;
}

.btn-container {
    margin-top: 20px;
}

.utility {
    display: flex;
    justify-content: space-between;
    align-items: center;
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