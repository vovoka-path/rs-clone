// import domen from '../data/domen.json' assert { type: "json" };
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
        // console.log('# data = ', data);

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
        // console.log('# API - formData = ', formData);
        // console.log('# API - JSON.stringify(formData) = ', JSON.stringify(formData));

        // return {
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDhiN2Y0ZTM5MWU1MTYxNTg3MzU3YSIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjYxNTE2NDY1LCJleHAiOjE2NjE2MDI4NjV9.YuRY4Cx_LvFv7XlNqNx-NC5dKrATG5fl_OB3zvNCN9Y",
        //     "username": "vovoka",
        //     "role": "manager"
        // };

        return fetch(`${this.domen}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async(response) => {
                const json = await response.json();
                // const data = json.data;
                // console.log('# API json = ', json);
                // console.log('# API data = ', data.data);
                return {
                    data: json,
                }
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    // - Get users: Returns array with users.
    // - Method *GET* 
    // - URL *'/auth/users'*
    // - HEADERS:
    //     - *"Authorization": "Bearer <-YOU TOKEN->"* 
    //     - *"Content-Type": "aplication/json"*
    // - RETURN: *{token: String, username: String, role: String}* or *ERROR*

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

}

export default Api;

// - Delete user: Delete specified user.
//         - Method *DELETE* 
//         - URL *'/auth/users/:id'*
//         - HEADERS:
//             - *"Authorization": "Bearer <-YOU TOKEN->"*
//         - RETURN: *Delete user* or *ERROR*