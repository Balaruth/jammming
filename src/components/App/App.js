import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      {name: 'Ruby Soho',
       artist: 'Rancid',
       album: '...And Out Come The Wolves'},

      {name: 'Airfield',
       artist: 'Enter Shikari',
       album: 'The Spark'},

      {name: 'Real World',
       artist: 'Matchbox Twenty',
       album: 'Yourself or Someone Like You'}
     ]}
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
