import { EmailBuilder } from '../EmailBuilder/index.js';

export class Director {
    constructor(builder) {
        const isBuilderValid = builder instanceof EmailBuilder;
        if (!isBuilderValid) throw new Error('Pass valid builder object');

        this.builder = builder;
    }

    setJSONFormat() {
        this.jsonFormat = JSON.stringify(this.builder);
    }
}