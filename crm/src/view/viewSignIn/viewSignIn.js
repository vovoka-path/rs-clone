// import { Observer } from '../../observer/observer.js';

class viewSignIn{
    constructor() {
        this.password = '';

        this.form = this.createForm();
        this.header = this.createHeader('Enter CRM system:');
        this.role = this.creatRoleInput();
        this.login = this.creatLoginInput();
        this.password = this.createPasswordInput();
        this.button = this.createButton();
    }

    render() {
        // console.log('# sign this.form= ', this.form);
        this.form.append(this.header);
        // this.form.append(this.role);
        this.form.append(this.login);
        this.form.append(this.password);
        this.form.append(this.button);

        // parent.append(this.form);
        return this.form;
    }

    // Create elements
    createForm() {
        const form = document.createElement('form');
        form.className = 'pure-form';

        return form;
    }

    createHeader(text) {
        const header = document.createElement('h2');
        header.innerText = text;

        return header;
    }

    // <div class="pure-u-1 pure-u-md-1-3">
    //             <label for="multi-state">State</label>
    //             <select id="multi-state" class="pure-input-1-2">
    //                 <option>AL</option>
    //                 <option>CA</option>
    //                 <option>IL</option>
    //             </select>
    //         </div>

    creatRoleInput() {
        // const label = document.createElement('label');
        // label.setAttribute('for', 'multi-state');

        const select = document.createElement('select');
        select.className = 'pure-input-1';
        select.id = 'role';
        ['manager', 'photographer', 'editor'].forEach((role) => {
            const option = document.createElement('option');
            option.innerText = role;
            select.append(option);
        })

        return select;
    }

    creatLoginInput() {
        const input = document.createElement('input');
        input.className = 'pure-input-1';
        input.type = 'text';
        input.id = 'login';
        input.placeholder = 'login...';

        return input;
    }

    createPasswordInput() {
        const input = document.createElement('input');
        input.className = 'pure-input-1';
        input.type = 'password';
        input.id = 'password';
        input.placeholder = 'password...';

        return input;
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'pure-button pure-input-1 pure-button-primary';
        button.type = 'submit';
        button.id = 'submit-button';
        button.innerText = 'Sign in';
        button.onsubmit = 'return false';

        return button;
    }
}

export default viewSignIn;