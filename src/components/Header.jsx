import React, { Component } from 'react'

export default class Header extends Component {
  handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      this.props.onSearchCity(event.target.value);
    }
  }

  render() {
    return (
        <>
        <header className="App-header">
          <img src="logo_transparent.png" className="App-logo" alt="logo"/>
          <input id='searchCity' type='text' onKeyDown={this.handleKeyDown} placeholder="Enter city name"/>
        </header>
        </>
    )
  }
}
