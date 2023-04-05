const express = require("express");
const app = express();
const port = 8000;
const { faker } = require('@faker-js/faker');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(faker.name.firstName());


const createUserObject = () => {
    return {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        _id: faker.datatype.uuid(),
    }
}

const generateCompanyObject = () => ({
    _id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: {
        street: faker.address.streetAddress(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zipcode: faker.address.zipCode(),
        county: faker.address.country(),
    }
});

app.get('/api/users/new', (req, res) => {
    const newUser = createUserObject();
    res.json(newUser);
});

app.get('/api/companies/new', (req, res) => {
    const newCompany = generateCompanyObject();
    res.json(newCompany);
});

app.get('/api/user/company', (req, res) => {
    const newUser = createUserObject();
    const newCompany = generateCompanyObject();
    const responseObject = {
        user: newUser,
        company: newCompany,
    };
    res.json(responseObject);
});

app.listen(port, () => console.log('listening on port ' + port))