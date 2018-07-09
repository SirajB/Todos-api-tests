const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request('http://todos.demo.rootpath.io')
const Utilities = require ('../utilities.js')

describe('Todos API', function () {
  before((done) => {
    Utilities.deleteAllTodos()
    done()
  })

  after((done) => {
    Utilities.deleteAllTodos()
    done()
  })

  describe('Get All Todos', function () {
    before((done) => {
      Utilities.createTodo("BuyCheese", "2015-01-01")
      Utilities.createTodo("BuyWine", "2015-01-01")
      done()
    })

    it('should return all todos', function (done) {
      request.get('/todos').end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        console.log(res.body)
        expect(res.body).to.include({name: 'Foo', due: '2015-01-01'})
        done();
      })
    });
  });
});




