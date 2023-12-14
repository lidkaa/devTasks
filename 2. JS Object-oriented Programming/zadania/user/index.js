import { App } from './App/index.js';
import { User } from './User/index.js';

const userData1 = {
    firstName: 'Anna',
    lastName: 'Kowalska',
    email: 'anna@kowalska.pl',
    birthDate: '10/22/2000',
    password: 'Mmewr444!!!m',
    sex: 'female',
    role: 'admin'
}

const userData2 = {
    firstName: 'Wanna',
    lastName: 'Mowalska',
    email: 'wanna@mowalska.pl',
    birthDate: '11-23-2000',
    password: 'Mmrwr444!!!m',
    sex: 'female',
    role: 'user'
}

const userData3 = {
    firstName: 'Adam',
    lastName: 'Naowa',
    email: 'nowak@kowalska.pl',
    birthDate: '01.09.2001',
    password: 'MmewEty744!!!m',
    sex: 'female',
    role: 'user'
}

const app = new App();
const user1 = new User(userData1);
app.init(user1);
app.login(user1.email, user1.password).createUser(userData2);
app.login(user1.email, user1.password).createUser(userData3);
app.login(user1.email, user1.password).updateUserData(userData3.email, 'sex', 'male');
// console.log(app);
app.login(user1.email, user1.password).deleteUser(userData3.email);
// console.log(app);
//logout
const app1 = new App();
console.log('newApp', app1);