export class Mail {

    constructor(emailBuilder) {
        this.from = emailBuilder.from;
        this.to = emailBuilder.to;
        this.cc = emailBuilder.cc;
        this.bcc = emailBuilder.bcc;
        this.title = emailBuilder.title;
        this.html = emailBuilder.html;
    }
}