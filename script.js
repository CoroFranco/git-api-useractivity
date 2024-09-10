// index.js

const axios = require('axios');
const process = require('process');

// Configura la URL base de la API de GitHub
const GITHUB_API_URL = 'https://api.github.com/users';

// Función para obtener la actividad reciente de un usuario
async function fetchRecentActivity(username) {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/${username}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
        process.exit(1);
    }
}

// Función para mostrar la actividad en la terminal
function displayActivity(events) {
    if (events.length === 0) {
        console.log('No recent activity found.');
        return;
    }

    events.forEach(event => {
        const date = new Date(event.created_at).toLocaleString();
        console.log(`[${date}] ${event.type} - ${event.repo.name}`);
    });
}

// Obtener el nombre de usuario desde los argumentos de la línea de comandos
const args = process.argv.slice(2);
const username = args[0];

if (!username) {
    console.error('Please provide a GitHub username.');
    process.exit(1);
}

// Ejecutar la función principal
fetchRecentActivity(username)
    .then(events => displayActivity(events));