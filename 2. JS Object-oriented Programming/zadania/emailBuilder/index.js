import { EmailBuilder } from './EmailBuilder/index.js';
import { Director } from './Director/index.js';

const emailBuilder1 = new EmailBuilder();
emailBuilder1.setFrom('lidka@cuvs.net').setReceivers('to', 'la@cuvs.net').setReceivers('cc', 'll@cuvs.net').setTitle('Test').setHtml('Mail text').buildEmail();
console.log(emailBuilder1);
const director1 = new Director(emailBuilder1);
director1.setJSONFormat();
console.log(director1);