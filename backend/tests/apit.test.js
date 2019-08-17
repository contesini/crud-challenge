const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const utils = require('./utils')

chai.use(chaiHttp);
chai.should();

const users = [
    {
        name: 'Astolfo',
        phones: [
            { ddd: '48', phoneNumber: "988556699", isWhatsApp: false }
        ],
        emails: []
    },
    {
        name: 'Carlos',
        phones: [],
        emails: ['carlos.a@yahoo.com']
    }
]

describe("Users", () => {

    describe("POST /", () => {
        it("should create a new User", (done) => {
            chai.request(app)
                .post('/user')
                .send(users[0])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.name.should.be.eql(users[0].name);
                    res.body.phones[0].phoneNumber.should.be.eql(users[0].phones[0].phoneNumber);
                    users[0] = res.body;
                    done()
                })
        })

        it("should generate a error when send User without name field", (done) => {
            chai.request(app)
                .post('/user')
                .send({ a: 'foobar' })
                .end((err, res) => {
                    res.body.should.be.eql({
                        message: "Users validation failed: name: Path `name` is required."
                    })
                    res.should.have.status(500);
                    done()
                })
        })

    })

    describe("PUT /", () => {
        it("should update user by userId", (done) => {
            chai.request(app)
                .put(`/users/${users[0]._id}`)
                .send({ ...users[0], name: 'Jose Astolfo', phones: [{ ddd: '48', phoneNumber: "988556699", isWhatsApp: true }] })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.name.should.be.eql('Jose Astolfo');
                    res.body.phones[0].phoneNumber.should.be.eql(users[0].phones[0].phoneNumber);
                    users[0] = res.body;
                    done()
                })
        })

        it("should return error when user not found", (done) => {
            chai.request(app)
                .put(`/users/55`)
                .send({ ...users[0], name: 'Jose Astolfo',  })
                .end((err, res) => {
                    res.body.should.be.eql({
                        message: "User not found with id 55"
                    })
                    res.should.have.status(404);
                    done()
                })
        })
    })

    before((done) => {
        chai.request(app)
            .post('/user')
            .send(users[1])
            .end((err, resp) => {
                users[1] = resp.body
                done()
            })
    })

    describe("DELETE /", () => {
        it("should delete User by userId", (done) => {
            chai.request(app)
                .delete(`/users/${users[1]._id}`)
            .end((err, resp) => {
                resp.should.have.status(200);
                resp.body.should.be.eql({ message: "User deleted successfully!" })
                done()
            })
        })

        it("should return error when user not found", (done) => {
            chai.request(app)
                .delete(`/users/55`)
                .end((err, res) => {
                    res.body.should.be.eql({
                        message: "User not found with id 55"
                    })
                    res.should.have.status(404);
                    done()
                })
        })
    })

    describe("GET /", () => {
        it("should get all users record", (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    done()
                })
        })

        it("should get an user by userId", (done) => {
            chai.request(app)
                .get(`/users/${users[0]._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(users[0])
                    done()
                })
        })

        it("should return a funny message", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.be.eql({ "message": "Olá eu sou o goku!" })
                    done()
                })
        })

        it("should return error when user not found", (done) => {
            chai.request(app)
                .get(`/users/55`)
                .end((err, res) => {
                    res.body.should.be.eql({
                        message: "User not found with id 55"
                    })
                    res.should.have.status(404);
                    done()
                })
        })
    })

    after((done) => {
        utils.clearDB().then(() => done());
    })
})
