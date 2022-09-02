import { domen } from '../data/constants.js';

class Api {
    constructor() {
        this.domen = domen;
    }

    async getOrderData(token, role){
        const authorization = `Bearer ${token}`;
        const path = (role === 'manager') ? '/api/orders' : '/api/orders/employee';

        try {
            const response = await fetch(`${this.domen}${path}`, {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    'Content-Type': 'application/json' 
                },
            });

            if (response.status === 200) {
                const orderData = await response.json();
                
                return orderData;
            }

            return null;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateOrder(data, token) {
        const authorization = `Bearer ${token}`;

        return fetch(`${this.domen}/api/orders`, {
            method: 'PUT',
            headers: {
                "Authorization": authorization,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data),
        })
            .then(async(response) => {
                return {
                    data: await response.json(),
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    async signUp(formData) {
        return fetch(`${this.domen}/auth/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async(response) => {
                return {
                    data: await response.json(),
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    async signIn(formData) {
        return fetch(`${this.domen}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async(response) => {
                const json = await response.json();
                return {
                    data: json,
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    async getUsers(token) {
        const authorization = `Bearer ${token}`;

        return fetch(`${this.domen}/auth/users`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                'Content-Type': 'application/json' 
            },
        })
            .then(async(response) => {
                return {
                    data: await response.json(),
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    async deleteUser(token, id) {
        const authorization = `Bearer ${token}`;

        return fetch(`${this.domen}/auth/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": authorization,
            },
        })
            .then(async(response) => {
                return {
                    data: await response.json(),
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    async sendEmail(token, mailData) {
        const authorization = `Bearer ${token}`;

        return fetch(`${this.domen}/mail/send`, {
            method: 'POST',
            headers: {
                "Authorization": authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailData),
        })
            .then(async(response) => {
                return {
                    data: await response.json(),
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

}

export default Api;
