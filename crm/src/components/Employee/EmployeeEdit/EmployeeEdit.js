import Container from "../../Container/Container.js";
import Header from "../../Header/Header.js";

class EmployeeEdit {
    create(user) {
        const userItem = Container.create('user-item__container');
        for(let prop in user){
            const item = Container.create(`user-item__${prop}`, user[prop]);
            userItem.append(item);
        }
        return userItem;
    }
}

export default EmployeeEdit;
