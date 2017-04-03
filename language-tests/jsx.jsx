import React, { Component } from 'react'

class Example extends Component {
  constructor (props) {
    super(props)
    this.doSomething = this.doSomething.bind(this)
    this.state = { active: props.active }
  }

  doSomething (event) {
    console.log(event)
  }

  render () {
    return (
      <header>
        <h1 onClick={this.doSomething}>
          <span>{this.props.title}</span>
        </h1>
        {this.props.children}
      </header>
    )
  }
}

export default Example
