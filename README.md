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

- **Orders**
    - Get Orders: Returns json data about orders. Method *GET* => URL */orders*
    - Get Order: Returns json data specified order. Method *GET* => URL */orders/:id*
    - Create Order: Creates a new order. Method *POST* => URL */orders* => BODY *{city: String, route: String, package: String, clientEmail: String, clientMsg: String }* => HEADERS: *"Content-Type": "aplication/json"*
    - Delete Order: Delete specified order. Method *DELETE* => URL */orders/:id*
    - Update Order: Updates attributes of specified. Method *PUT* => URL */orders/:* => BODY *{_id: String, and other changeable parameters }* => HEADERS: *"Content-Type": "aplication/json"*