import React, { Component } from 'react';
import styled from 'styled-components';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';
import { TodoRow } from './TodoRow';

const Button = styled.button`
  background: ${ props => props.isPrimary ? 'blue' : 'transparent' };
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default class App extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      isPrimary: false,
      userName: 'Andy H',
      todoItems: [
        { action: 'Buy Flowers', done: false },
        { action: 'Get Shoes', done: false },
        { action: 'Collect Tickets', done: true }
      ]/*,
      newItemText: ''*/
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewToDo = (task) => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState({ 
                      todoItems: [...this.state.todoItems, { action: task, done: false }], 
                      newItemText: ''
                    });
    }
  }

  toggleToDo = (todo) => this.setState({
      todoItems: this.state.todoItems.map(item => item.action === todo.action ? {...item, done: !item.done} : item)
  });
  

  todoTableRows = () => this.state.todoItems.map(item => <TodoRow key={ item.action } item={ item } callback={ this.toggleToDo } />);

  render() {
    return (
      <div>
        <TodoBanner name={ this.state.userName } tasks={ this.state.todoItems } />

        <div className='containerFluid'>
          <TodoCreator callback={ this.createNewToDo } />
        </div>

        {/* <Button onClick={this.createNewToDo} isPrimary={ this.state.isPrimary }>Add</Button> */}

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