const request = require('request');
const base_url = "http://todos.demo.rootpath.io"
const unique_identifier = "DANNY-ID"

class Utilities {
  static deleteAllTodos(callback) {
    let request_url = base_url + '/todos'
    request(request_url, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      // console.log(`[Utilities] Calling: ${request_url}`)

      body.forEach((todo) => {
        if (!todo.title.includes(unique_identifier)) { return }

        request.delete(request_url + '/' + todo.id, { json: true }, (err, res, body) => {
          if (res.statusCode == 201) {
            console.log(`Deleted Todo with ID ${todo.id}: ${todo.title}`);
          }
        })
      })
    });
    callback()
  }

  static createTodo(name, due, notes = 'Some notes') {
    let request_url = base_url + `/todos?title=${unique_identifier}-${name}&due=${due}&notes=${notes}`
    request.post(request_url, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      // console.log(`[Utilities] Calling: ${request_url}`)
    })
  }
}

module.exports = Utilities
