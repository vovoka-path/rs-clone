# CRM Photo-agancy API
Api for "CRM Photo-agancy".

## Setup and Running

- Use `node 14.x` or higher.
- Clone this repo: `$ git clone https://github.com/vovoka-path/rs-clone.git`.
- Go to branch: `git checkout server`
- Go to folder: `$ cd server`.
- Install dependencies: `$ npm install`.
- Start server: `$ npm start`.
- Now you can send requests to the address: `http://127.0.0.1:5000`.


## Usage

## **Orders**

***

    - Get Orders: Returns json data about orders.
        - Method *GET* 
        - URL *'api/orders'*
        - HEADERS: 
            - *"Authorization": "Bearer <-YOU TOKEN->"*
            - *"Content-Type": "aplication/json"*
        - RETURN: *[Orders]* or *ERROR*

***

    - Get Orders for employee: Returns json data about orders for employee.
        - Method *GET* 
        - URL *'/orders/employee'*
        - HEADERS: 
            - *"Authorization": "Bearer <-YOU TOKEN->"*
            - *"Content-Type": "aplication/json"*
        - RETURN: *[Orders]* or *ERROR*

***

    - Get Order: Returns json data specified order.
        - Method *GET* 
        - URL *'api/orders/:id'*
        - HEADERS: 
            - *"Authorization": "Bearer <-YOU TOKEN->"*
            - *"Content-Type": "aplication/json"*
        - RETURN: *Order* or *ERROR*

***

    - Create Order: Creates a new order.
        - Method *POST* 
        - URL *'api/orders'*
        - HEADERS: 
            - *"Content-Type": "aplication/json"*
        - BODY: *{city: String, route: String, package: String, clientEmail: String, clientMsg: String }*
        - RETURN: *Order* or *ERROR*

***

    - Delete Order: Delete specified order.
        - Method *DELETE* 
        - URL *'api/orders/:id'*
        - HEADERS:
            - *"Authorization": "Bearer <-YOU TOKEN->"*
        - RETURN: *Delete Order* or *ERROR*

***

    - Update Order: Updates attributes of specified.
        - Method *PUT* 
        - URL *'api/orders/'*
        - HEADERS:
            - *"Authorization": "Bearer <-YOU TOKEN->"*
            - *"Content-Type": "aplication/json"*
        - BODY
            - *{_id: String, and other changeable parameters }*
        - RETURN: *Update Order* or *ERROR*

## **Auth**

***

    - Registration: Returns message successfully registered.
        - Method *POST* 
        - URL *'/auth/registration'*
        - HEADERS: 
            - *"Content-Type": "aplication/json"*
        - BODY: *{username: String, password: String, role: 'manager' || 'photographer' || 'editor'}*
        - RETURN: *Message* or *ERROR*

***

    - Login: Returns object - {token: String, username: String, role: String}.
        - Method *POST* 
        - URL *'/auth/login'*
        - HEADERS: 
            - *"Content-Type": "aplication/json"*
        - BODY: *{username: String, password: String}*
        - RETURN: *{token: String, username: String, role: String}* or *ERROR*

***

    - Get users: Returns array with users.
        - Method *GET* 
        - URL *'/auth/users'*
        - HEADERS:
            - *"Authorization": "Bearer <-YOU TOKEN->"* 
            - *"Content-Type": "aplication/json"*
        - RETURN: *{token: String, username: String, role: String}* or *ERROR*

***

    - Delete user: Delete specified user.
        - Method *DELETE* 
        - URL *'/auth/users/:id'*
        - HEADERS:
            - *"Authorization": "Bearer <-YOU TOKEN->"*
        - RETURN: *Delete user* or *ERROR*

***

    - Update user: Updates attributes of specified.
        - Method *PUT* 
        - URL *'/auth/users'*
        - HEADERS:
            - *"Authorization": "Bearer <-YOU TOKEN->"*
            - *"Content-Type": "aplication/json"*
        - BODY
            - *{_id: String, and other changeable parameters }*
        - RETURN: *Update user* or *ERROR*

## **Mail**

***

    - Send Mail: Send mail to the specified address.
        - Method *POST* 
        - URL *'/mail/send'*
        - HEADERS:
            - *"Authorization": "Bearer <-YOU TOKEN->"*
            - *"Content-Type": "aplication/json"*
        - BODY
            - *{ clientEmail: String, title: String, msg: String }*
        - RETURN: *status* or *ERROR*