import { Validation } from '../../validation.js';
import { Mail } from '../Mail/index.js';

export class EmailBuilder {

    setFrom(email) {
        Validation.init(email).throwError().isValueValidEmailFormat;
        this.from = email;
        return this;
    }

    setReceivers(receiversKind, ...emails) {
        const receiversData = emails;
        for (const email of receiversData) {
            Validation.init(email).throwError().isValueValidEmailFormat;
        }
        this[receiversKind] = receiversData;
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
        return new Mail(this);
    }

}