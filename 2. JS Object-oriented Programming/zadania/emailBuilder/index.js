import { EmailBuilder } from './EmailBuilder/index.js';
import { JSONConverter } from './JSONConverter/index.js';

const emailBuilderObj = new EmailBuilder();
emailBuilderObj.setFrom('lidka@cuvs.net')
    .setReceivers('to', 'la@cuvs.net')
    .setReceivers('cc', 'll@cuvs.net')
    .setTitle('Test')
    .setHtml('Mail text')
    .buildEmail();

const JSONFormat = new JSONConverter(emailBuilderObj);

