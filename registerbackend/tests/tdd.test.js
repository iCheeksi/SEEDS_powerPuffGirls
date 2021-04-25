const mongoose = require('mongoose');
require('dotenv').config();

describe('user CRUD',() => {
    let connection;
    
    const user = mongoose.model("tddarticles",mongoose.Schema({
        title: String,
        author: String,
        year: String,
        sePracticeFull: String,
        sePracticeShort: String,
        claim: String,
        evidenceStrength: String

    }));
    beforeAll(async () => {
       
        connection = await mongoose.connect('mongodb+srv://powerpuffgirls:PowerPuffGirls@cluster0.6hhuy.mongodb.net/userTable?retryWrites=true&w=majority');
        db = mongoose.connection;

    });
    
    test("sign up user",async () => {

        const response = await user.create({
            title: "Does Test-Driven Development Really Improve Software Design Quality?",
            author: "Janzen, D S and Saiedian, H",
            year: "2008",
            sePracticeFull: "Test Driven Development",
            sePracticeShort: "TDD",
            claim: "TDD is great",
            evidenceStrength: "Strongly Against"
        });
        await response.save();
        expect(response.title).toBe("Does Test-Driven Development Really Improve Software Design Quality?");
        

    });

    
 });
