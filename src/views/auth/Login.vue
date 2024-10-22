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
                        <input class="form-control" type="text" v-model="username" placeholder="Email" autofocus />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">PASSWORD</label>
                        <input class="form-control" type="password" v-model="password" placeholder="Password" />
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

                <!-- Formulario de "Forgot Password" -->
                <form class="forget-form" v-if="showForgotPassword" @submit.prevent="resetPassword">
                    <h3 class="login-head"><i class="bi bi-person-lock me-2"></i>Forgot Password?</h3>

                    <div class="mb-3">
                        <label class="form-label">EMAIL</label>
                        <input class="form-control" type="text" v-model="email" placeholder="Email" />
                    </div>

                    <div class="mb-3 btn-container d-grid">
                        <button class="btn btn-primary btn-block">
                            <i class="bi bi-unlock me-2 fs-5"></i>RESET
                        </button>
                    </div>

                    <div class="mb-3 mt-3">
                        <p class="semibold-text mb-0">
                            <a href="#" @click="toggleForm"><i class="bi bi-chevron-left me-1"></i> Back to Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            staySignedIn: false,
            showForgotPassword: false,
            email: ''
        };
    },
    methods: {
        goToRegister() {
            this.$router.push({ name: 'Register' }); // Redirige a la vista de registro
        },
        login() {
            // Lógica para iniciar sesión
            console.log('Logging in with', this.username, this.password);
        },
        resetPassword() {
            // Lógica para resetear la contraseña
            console.log('Resetting password for', this.email);
        }
    }
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