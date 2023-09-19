export const BASE_URL = 'https://auth.nomoreparties.co';

const handleResponse = (res) => {
    if (res.ok) {
        const json = res.json();
        if (json) {
            return json;
        }
    }
    return Promise.reject(res);
}

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(handleResponse);
}

export function authorize({ email, password }) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    }).then(handleResponse);
}

export function getToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }).then(handleResponse);
}