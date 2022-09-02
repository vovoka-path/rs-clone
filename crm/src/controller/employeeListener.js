class EmployeeListener {
    // constructor(controller) {
    //     this.controller = controller;
    // }

    // обрабочик employeeEditListener
    editNotBind() {
        console.log('# 0 this = ', this);
        console.log('/n# 1 PAVEL this.model = ', this.model);
        console.log('/n# 2 PAVEL this.api = ', this.api);
        console.log('/n# 3 PAVEL this.view = ', this.view);
        return async (event) => {
            // this = this.controller
            // this.view.cab = managerCab
            const roleStatus = this.model.roleStatus; // не трогать
            const props = await this.listeners.createPropsByRoleStatus(roleStatus); // не трогать

            const employeeId = event.target.id;

            // this.view.cab = managerCab
            this.view.cab.employees.render(props, employeeId);
        }

    }

    
    // обрабочик employeeEditListener
    deleteNotBind() {
        return async (event) => {
            // this = this.controller
            const employeeId = event.target.id;

            const token = this.model.auth.token;
            await this.api.deleteUser(token, employeeId);
        }

    }
}

export default EmployeeListener;

// const props = {
//     role: role,
//     roleStatus: roleStatus,
//     orderStatuses: orderStatuses,
//     order: {},
//     orders: ordersByRoleStatus,
//     users: users,
//     orderButtonListener: this.orderButtonListener,
//     // statusButtonListener: null, // добавляем после входа в конкретный заказ
//     employeeListener: this.employeeEditListener,
// };