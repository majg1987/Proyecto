export class User {
    id = '';
    email = '';
    password = '';
    isActive = false;


    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}