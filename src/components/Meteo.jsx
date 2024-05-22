import React, { Component } from 'react'

export default class Meteo extends Component {
  render() {
    return (
        <div class="row">
            <div class="col s12 m6 push-m3">
                <div class="weather card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Lyon</span>
                        <p><img src="icons/sun.svg"/></p>
                        <span class="temperature">15°</span>
                        <div class="wind">Vent 1km/h (360°)</div>
                    </div>
                    <div class="card-action">
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