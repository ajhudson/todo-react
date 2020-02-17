import React, { Component } from 'react';

export default class App extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Andy H',
      todoItems: [
        { action: 'Buy Flowers', done: false },
        { action: 'Get Shoes', done: false },
        { action: 'Collect Tickets', done: true }
      ],
      newItemText: ''
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewToDo = () => {
    if (!this.state.todoItems.find(item => item.action === this.state.newItemText)) {
      this.setState({ 
                      todoItems: [...this.state.todoItems, { action: this.state.newItemText, done: false }], 
                      newItemText: ''
                    });
    }
  }

  toggleToDo = (todo) => this.setState({
      todoItems: this.state.todoItems.map(item => item.action === todo.action ? {...item, done: !item.done} : item)
  });
  

  todoTableRows = () => this.state.todoItems.map(item => 
                                                  <tr key={ item.action }>
                                                    <td>{ item.action }</td>
                                                    <td><input type='checkbox' checked={ item.done } onChange={ () => this.toggleToDo(item) }></input></td>
                                                  </tr>);

  render() {
    return (
      <div>
        <h4 className='bg-primary text-white text-center p-2'>
          {this.state.userName}'s To Do List
          ({this.state.todoItems.filter(i => !i.done).length } items to do)
        </h4>

        <div className='containerFluid'>
          <div className='my-1'>
            <input className='form-control' value={this.state.newItemText} onChange={this.updateNewTextValue} /> 
          </div>
        </div>

        <button className='btn btn-primary mt-1' onClick={this.createNewToDo}>Add</button>

        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{ this.todoTableRows() }</tbody>
        </table>
      </div>
    )
  };
}