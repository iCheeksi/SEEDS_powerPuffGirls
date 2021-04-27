const mongoose = require('mongoose');
require('dotenv').config();

describe('user CRUD',() => {
    let connection;
    
    const user = mongoose.model("test_users",mongoose.Schema({
        name: String,
        username: String,
        password: String
    }));
    beforeAll(async () => {
       
        connection = await mongoose.connect('mongodb+srv://powerpuffgirls:PowerPuffGirls@cluster0.6hhuy.mongodb.net/seeds_testing?retryWrites=true&w=majority');
        db = mongoose.connection;

    });
    
    test("sign up user",async () => {

        const response = await user.create({
            name: "test",
            username: "test_username",
            password: "test_password"
        });
        await response.save();
        expect(response.name).toBe("test");
    
    });
    
 });