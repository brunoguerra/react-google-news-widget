import React, { Component } from 'react';
import GoogleNewsContainer from './GoogleNewsContainer'
import './App.css';


class App extends Component {

  state = {
    queryString: '',
    searchInput: '',
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ queryString: this.state.searchInput });
  }

  render() {
    return (
      <div className="section no-pad-bot">
        <div className="container">
          <br/><br/>
          <h1 className="header center orange-text">google-news-api</h1>
          <div className="row center">
            <h5 className="header col s12 light">Query News Articles from Google News</h5>
          </div>
          <div className="row center">
            <form className="col s10" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s4 offset-s4">
                  <input
                    placeholder="Search Query"
                    id="search"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field col s2">
                  <button className="btn-large waves-effect waves-light orange">Search</button>
                </div>
              </div>
            </form>
          </div>
          <br/>
          <br/>
        </div>
        <GoogleNewsContainer queryString={this.state.queryString} />
      </div>
    );
  }
}

export default App
