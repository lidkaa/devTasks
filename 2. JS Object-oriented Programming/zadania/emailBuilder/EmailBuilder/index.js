import { Validation } from '../../validation.js';
import { Mail } from '../Mail/index.js';

export class EmailBuilder {

    constructor() {
        this.from = null;
        this.to = null;
        this.cc = null;
        this.bcc = null;
        this.title = null;;
        this.html = null;
    }

    setFrom(email) {
        Validation.init(email).throwError().isValueValidEmailFormat();
        this.from = email;
        return this;
    }

    setReceivers(receiverKind, ...emails) {

        Validation.init(receiverKind).throwError().isValueStringType().isValueStringNotEmpty();
        // to do wspolnej funkcji
        const receiverKinds = ['to', 'cc', 'bcc'];
        const isReceiverKindValid = receiverKinds.find(item => item === receiverKind);
        if (!isReceiverKindValid) throw new Error('Wrong receiver type');

        for (const email of emails) {
            Validation.init(email).throwError().isValueValidEmailFormat();
        }
        this[receiverKind] = emails;

        return this;
    }

    setTitle(title) {
        Validation.init(title).throwError().isValueStringType();
        this.title = title;
        return this;
    }

    setHtml(html) {
        Validation.init(html).throwError().isValueStringType();
        this.html = html;
        return this;
    }

    buildEmail() {
        // ograniczyc tylko do pol ktore potrzebuje faktycznie Mail
        return new Mail(this);
    }
}