class Api {
    constructor() {
        this.domen = 'http://127.0.0.1:5000';
    }

    async getOrderData(token){
        const authorization = `Bearer ${token}`;

        try {
            const response = await fetch(`${this.domen}/api/orders`, {
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

    async updateOrder({ data, token }) {
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




    // - Login: Returns object - {token: String, username: String, role: String}.
    //     - Method *POST* 
    //     - URL *'/auth/login'*
    //     - HEADERS: 
    //         - *"Content-Type": "aplication/json"*
    //     - BODY: *{username: String, pasword: String}*
    //     - RETURN: *{token: String, username: String, role: String}* or *ERROR*

    // - Get users: Returns array with users.
    // - Method *GET* 
    // - URL *'/auth/users'*
    // - HEADERS:
    //     - *"Authorization": "Bearer <-YOU TOKEN->"* 
    //     - *"Content-Type": "aplication/json"*
    // - RETURN: *{token: String, username: String, role: String}* or *ERROR*

    async gerUsers(token) {
        const authorization = `Bearer ${token}`;

        return fetch(`${this.domen}/api/orders`, {
            method: 'GET',
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

}

export default Api;

// - Registration: Returns message successfully registered.
//         - Method *POST* 
//         - URL *'/auth/registration'*
//         - HEADERS: 
//             - *"Content-Type": "aplication/json"*
//         - BODY: *{username: String, pasword: String, role: 'manager' || 'photographer' || 'editor'}*
//         - RETURN: *Message* or *ERROR*