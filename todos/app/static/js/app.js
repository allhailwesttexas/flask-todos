function TodosViewModel() {
  var self = this;
  self.todosURI = 'api/v1.0/todos';
  // self.username = "peter";
  // self.password = "hello";
  self.todos = ko.observableArray();

  self.ajax = function (uri, method, data) {
    var request = {
      url: uri,
      type: method,
      contentType: "application/json",
      accepts: {
        json: "application/json"
      },
      cache: false,
      dataType: 'json',
      data: JSON.stringify(data),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization",
          "Basic " + btoa(self.username + ":" + self.password));
      },
      error: function (jqXHR) {
        console.log(jqXHR.status);
      }
    };
    return $.ajax(request);
  };

  self.beginAdd = function () {
    $('#add').modal('show');
  };

  self.beginEdit = function(todo) {
    editTodoViewModel.setTodo(todo);
    $('#edit').modal('show');
  };

  self.edit = function(todo, data) {
    self.ajax(todo.uri(), 'PUT', data).done(function(res) {
      self.updateTodo(todo, res.todo);
    });
  };

  self.updateTodo = function(todo, newTodo) {
    var i = self.todos.indexOf(todo);
    self.todos()[i].uri(newTodo.uri);
    self.todos()[i].title(newTodo.title);
    self.todos()[i].description(newTodo.description);
    self.todos()[i].done(newTodo.done);
  };

  self.remove = function(todo) {
    self.ajax(todo.uri(), 'DELETE').done(function() {
      self.todos.remove(todo);
    });
  };

  self.markInProgress = function (todo) {
    self.ajax(todo.uri(), 'PUT', { done: false }).done(function(res) {
      self.updateTodo(todo, res.todo);
    });
  };

  self.markDone = function (todo) {
    self.ajax(todo.uri(), 'PUT', { done: true }).done(function(res) {
      self.updateTodo(todo, res.todo);
    });
  };

  self.add = function (todo) {
    self.ajax(self.todosURI, 'POST', todo).done(function (data) {
      self.todos.push({
        uri: ko.observable(data.todo.uri),
        title: ko.observable(data.todo.title),
        description: ko.observable(data.todo.description),
        done: ko.observable(data.todo.done)
      });
    });
  };

  self.ajax(self.todosURI, 'GET').done(function (data) {
    for (var i = 0; i < data.todos.length; i++) {
      self.todos.push({
        uri: ko.observable(data.todos[i].uri),
        title: ko.observable(data.todos[i].title),
        description: ko.observable(data.todos[i].description),
        done: ko.observable(data.todos[i].done)
      });
    }
  });
}

function AddTodoViewModel() {
  var self = this;
  self.title = ko.observable();
  self.description = ko.observable();

  self.addTodo = function () {
    $('#add').modal('hide');
    todosViewModel.add({
      title: self.title(),
      description: self.description(),
    });
    self.title("");
    self.description("");
  };
}

function EditTodoViewModel() {
  var self = this;
  self.title = ko.observable();
  self.description = ko.observable();
  self.done = ko.observable();
  self.uri = ko.observable();

  self.setTodo = function (todo) {
    self.todo = todo;
    self.title(todo.title());
    self.description(todo.description());
    self.done(todo.done());
    $('edit').modal('show');
  };

  self.editTodo = function () {
    $('#edit').modal('hide');
    todosViewModel.edit(self.todo, {
      title: self.title(),
      description: self.description(),
      done: self.done()
    });
  };
}

var todosViewModel = new TodosViewModel();
var addTodoViewModel = new AddTodoViewModel();
var editTodoViewModel = new EditTodoViewModel();
ko.applyBindings(todosViewModel, $('#main')[0]);
ko.applyBindings(addTodoViewModel, $('#add')[0]);
ko.applyBindings(editTodoViewModel, $('#edit')[0]);
