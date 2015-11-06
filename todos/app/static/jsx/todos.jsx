// TodoBox
//   - TodoList
//     - TodoItem
//   - TodoForm

var React = require('react');

var TODOS = [
  {title: "a todo", done: false, description: "write react todo app"},
  {title: "say hi", done: true, description: "say hello to little friend"},
  {title: "say bye", done: false, description: "say goodbye to everyone"},
  {title: "eat vegan burger", done: false, description: "eat burger"}
]

var TodoBox = React.createClass({

  getInitialState: function () {
    return {
      todos: this.props.initialTodos,
      showAll: true,
      showActive: false,
      showCompleted: false
    };
  },

  handleSimpleUserInput: function(attrs) {
    this.setState(attrs);
  },

  handleNewTodo: function(text) {
    var todos = this.state.todos;
    todos.push({title: "new todo", description: text, done: false});
    this.setState({todos: todos});
    console.log(text);
  },

  render: function() {
    return (
      <div className="todo-box">
        <TodoForm onUserInput={this.handleNewTodo} />
        <TodoList todos={this.state.todos}
                  showAll={this.state.showAll}
                  showActive={this.state.showActive}
                  showCompleted={this.state.showCompleted}
        />
        <FilterBar showAll={this.state.showAll}
                   showActive={this.state.showActive}
                   showCompleted={this.state.showCompleted}
                   onUserInput={this.handleSimpleUserInput}
        />
      </div>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var rows = [];

    if (this.props.showCompleted) {
      this.props.todos.forEach(function(todo) {
        if (todo.done) {
          rows.push(<TodoItem todo={todo} key={todo.description} />);
        };
      });
    } else if (this.props.showActive) {
      this.props.todos.forEach(function(todo) {
        if (!todo.done) {
          rows.push(<TodoItem todo={todo} key={todo.description} />);
        };
      });
    } else {
      this.props.todos.forEach(function(todo) {
        rows.push(<TodoItem todo={todo} key={todo.description} />);
      });
    };

    return (
      <div className="todo-list">
        {rows}
      </div>
    );
  }
})

var TodoItem = React.createClass({

  // getInitialState: function() {
  //   return {
  //     checked: this.props.todo.done
  //   }
  // },

  handleItemChange: function(e) {
    // this.setState({checked: e.currentTarget.checked});
    console.log("triggered handleItemChange");
  },

  render: function() {
    return (
      <div className="todo-item">
        <input className="todo-item-checkbox" type="checkbox" defaultChecked={this.props.todo.done} onChange={this.handleItemChange}/>
        {this.props.todo.description}
      </div>
    );
  }
})

var TodoForm = React.createClass({
  getInitialState: function () {
      return {
          done: false,
          text: "Achieve world domination"
      };
  },

  handleKeyDown: function(e) {
    if (e.keyCode == 13) {
      this.props.onUserInput(this.refs.newTodo.getDOMNode().value);
      this.setState({text: ''});  // this doesn't work
    };
  },

  render: function() {
    return (
      <div className="new-todo-wrapper">
        <input ref="editField" ref="newTodo" className="new-todo" onKeyDown={this.handleKeyDown} placeholder={this.state.text} />
      </div>
    );
  }
})

var FilterBar = React.createClass({

  onShowAllChange: function(e) {
    var showAll = e.currentTarget.checked
    this.props.onUserInput({showAll: showAll,
                            showActive: showAll ? false : this.props.showActive,
                            showCompleted: showAll ? false : this.props.showCompleted});
  },

  onShowCompletedChange: function(e) {
    var showCompleted = e.currentTarget.checked
    this.props.onUserInput({showCompleted: showCompleted,
                            showActive: showCompleted ? false : this.props.showActive,
                            showAll: showCompleted ? false : this.props.showAll});
  },

  onShowActiveChange: function(e) {
    var showActive = e.currentTarget.checked
    this.props.onUserInput({showActive: showActive,
                            showCompleted: showActive ? false : this.props.showCompleted,
                            showAll: showActive ? false : this.props.showAll});
  },

  render: function() {
    return (
      <div className="todo-filter-bar">
        <div className="btn-group filters">
          <label><input type="checkbox" checked={this.props.showAll} onChange={this.onShowAllChange} />Show All</label>
          <label><input type="checkbox" checked={this.props.showCompleted} onChange={this.onShowCompletedChange} />Show Completed</label>
          <label><input type="checkbox" checked={this.props.showActive} onChange={this.onShowActiveChange} />Show Active</label>
        </div>
        <br/>
        <div className="btn-group">
          <button type="button" className="btn btn-default">Clear Completed</button>
        </div>
      </div>
    );
  }
})

module.exports = {'TodoBox': TodoBox, 'TODOS': TODOS};
