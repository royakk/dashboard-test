import React from 'react'
import TodoList from './todoList'

describe('<TodoList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TodoList />)
  })
})