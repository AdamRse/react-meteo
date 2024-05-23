import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    return (
        <div className="row">
            <div className="col s12 m6 push-m3">
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Lyon</span>
                        <p><img src="icons/sun.svg"/></p>
                        <span className="temperature">15°</span>
                        <div className="wind">Vent 1km/h (360°)</div>
                    </div>
                    <div className="card-action">
                        <a href="#">Thursday</a>
                        <a href="#">Friday</a>
                        <a href="#">Saturday</a>
                        <a href="#">Sunday</a>
                        <a href="#">Monday</a>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}