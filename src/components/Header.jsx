import React, { Component } from 'react';

export default class Header extends Component {
  handleChangeLanguage = (e) => {
    this.props.onLanguageChange(e.target.value);
  };

  render() {
    return (
      <>
        <header className="App-header">
          <img src="logo_transparent.png" className="App-logo" alt="logo" />
            {/* <select style={{ display: 'block' }} onChange={this.handleChangeLanguage}>
              <option value="fr-FR">Français</option>
              <option value="de-DE">Deutsch</option>
              <option value="en-US">English</option>
              <option value="it-IT">Italiano</option>
              <option value="es-ES">Español</option>
              <option value="ar-SA">العربية</option>
              <option value="el-GR">Ελληνικά</option>
              <option value="ja-JP">日本語</option>
              <option value="sl-SI">Slovenščina</option>
            </select>
            <label>Choose your language</label> */}
        </header>
      </>
    );
  }
}
