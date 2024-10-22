<template>
    <div>
        <!-- Sección superior con fondo -->
        <section class="material-half-bg">
            <div class="cover"></div>
        </section>

        <!-- Contenido principal del registro -->
        <section class="content">
            <div class="logo">
                <h1 style="text-align: center; color: white;">Crediservir</h1>
            </div>

            <div class="login-box container">
                <!-- Formulario de registro -->
                <form @submit.prevent="register">
                    <h3 class="login-head">
                        <i class="bi bi-person me-2"></i>REGISTER
                    </h3>

                    <!-- Primera fila (Tipo de Documento y Documento) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">TYPE DOCUMENT</label>
                            <input class="form-control" type="text" v-model="type_document"
                                placeholder="Type of Document" autofocus />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">DOCUMENT</label>
                            <input class="form-control" type="text" v-model="document" placeholder="Document Number" />
                        </div>
                    </div>

                    <!-- Segunda fila (Primer Nombre y Apellido) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">FIRST NAME</label>
                            <input class="form-control" type="text" v-model="firts_name" placeholder="First Name" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">LAST NAME</label>
                            <input class="form-control" type="text" v-model="last_name" placeholder="Last Name" />
                        </div>
                    </div>

                    <!-- Tercera fila (Sexo y Teléfono) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">SEX</label>
                            <select class="form-control" v-model="sex">
                                <option value="male">Mascul</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">PHONE</label>
                            <input class="form-control" type="text" v-model="phone" placeholder="Phone Number" />
                        </div>
                    </div>

                    <!-- Cuarta fila (Dirección y Email) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">ADDRESS</label>
                            <input class="form-control" type="text" v-model="address" placeholder="Address" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">EMAIL</label>
                            <input class="form-control" type="email" v-model="email" placeholder="Email" />
                        </div>
                    </div>

                    <!-- Quinta fila (Contraseña) -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">PASSWORD</label>
                            <input class="form-control" type="password" v-model="password" placeholder="Password" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">CONFIRM PASSWORD</label>
                            <input class="form-control" type="password" v-model="password" placeholder="Password" />
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

<script>
export default {
    data() {
        return {
            type_document: '',
            document: '',
            firts_name: '',
            last_name: '',
            sex: '',
            phone: '',
            address: '',
            email: '',
            password: ''
        };
    },
    methods: {
        register() {
            // Lógica para registrar un usuario
            console.log('Registering with', {
                type_document: this.type_document,
                document: this.document,
                firts_name: this.firts_name,
                last_name: this.last_name,
                sex: this.sex,
                phone: this.phone,
                address: this.address,
                email: this.email,
                password: this.password
            });
        },
        goToLogin() {
            this.$router.push({ name: 'Login' });
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

.content {
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
    width: 600px; /* Aumentar el ancho del contenedor */
    background-color: #fff;
    padding: 30px; /* Aumentar el padding para que sea más espacioso */
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
