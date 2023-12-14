export class JSONConverter {
    constructor(value) {
        //obiekt
        //validacja czy json
        this.validateData(emailObject);
        this.email = emailObject;
        this.jsonFormat = JSON.stringify(this.email);
    }

    validateData(emailObject) {
        const isEmailObjectValid = emailObject instanceof Mail;
        if (!isEmailObjectValid) throw new Error('Pass valid Mail Object');
    }
}
