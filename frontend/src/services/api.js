const BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your Laravel backend URL

// Generic Fetch API wrapper
const api = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        return await response.json(); // Automatically parse JSON response
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default api;
