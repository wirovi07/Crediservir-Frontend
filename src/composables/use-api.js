import axios from 'axios';

export const useApi = async function (url, method = 'GET', payload = {}) {
    url = `http://crediservir.test/api/${url}`;

    try {
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Si existe un token en localStorage, lo añadimos al header
        const token = localStorage.getItem('token');
        if (token) headers.Authorization = `Bearer ${token}`;

        const config = {
            method: method,
            url: url,
            data: payload,
            headers: headers,
        };

        const response = await axios(config);

        // Devuelve la respuesta de la API en caso de éxito
        return response.data;

    } catch (error) {
        // Si hay una respuesta HTTP del servidor
        if (error.response) {
            const { status, data } = error.response;

            // Si el token ha expirado o no es válido, redirige al login
            if (status === 401 || (status === 500 && data.message === 'Token has expired')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }

            // Para otros errores, lanza un error con el mensaje de la respuesta
            throw new Error(data.message || 'Ocurrió un error inesperado');
        } else if (error.request) {
            // Si no se recibió una respuesta (problemas de red)
            throw new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión.');
        } else {
            // Otros errores no relacionados con la respuesta o la solicitud
            throw new Error('Error en la configuración de la solicitud.');
        }
    }
};
