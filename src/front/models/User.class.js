export class User {
    id = 0;
    firstName = "";
    lastName = "";
    email = "";
    password = "";

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}