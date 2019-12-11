// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin';


export default (type, params) => {
    if (type === AUTH_LOGIN) {
        var username = process.env.USERNAME;
        var password = process.env.PASSWORD;

        // const { username, password } = params;

        const request = new Request('https://karimmoussouni.local/oauth/v2/token', {
            method: 'POST',
            // body: JSON.stringify({ '55zjfeefv10c4ocso8osk8wc8c0wwow480s4okgkok0k04k8gg', '52fizeldb9k4w8w0soog888sg448gs884k004scc8w4gck84ss' }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    return Promise.resolve();
}