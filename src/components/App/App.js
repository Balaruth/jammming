/* Hi Codecademy and congrats on breaking me down. I got as far as Ravenous
while still feeling like I had a pretty good grasp of what I'm doing, then
jammming comes along and I just can't do this anymore. A lot of the steps either
relate to things I did earlier in the course but just can't remember (as the
skills taught haven't come up again since) or things I'm pretty sure have never
come up at all. You guys seem to like to refer to documentation a lot, and I
suppose that is fine and will work for a decent number of people, but I am of
the opinion that if I could learn it all just from reading the documentation,
I wouldn't actually need to do a course. Sometimes the documentation is hard to
understand, especially if you're an actual beginner. I could keep pestering the
advisors as I have been doing, and I have nothing against the advisor team,
they're wonderful people and I gave 'em all 5 star feedback, but getting the
answers from them does not bring me closer to an understanding. Perhaps it's
just a sign that I'm not intelligent enough to learn programming, or at least
that my brain isn't wired for it, but ultimately my journey stops here. It was
fun while it lasted. */

import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'Ruby Soho',
         artist: 'Rancid',
         album: '...And Out Come The Wolves'},

        {name: 'Airfield',
         artist: 'Enter Shikari',
         album: 'The Spark'},

        {name: 'Real World',
         artist: 'Matchbox Twenty',
         album: 'Yourself or Someone Like You'}
       ],

     playlistName: 'Placeholder Playlist',

     playlistTracks: [
       {name: 'The Blond Beast',
        artist: 'Marduk',
        album: 'Frontschwein'},

       {name: 'Hymne VII',
        artist: 'Ulver',
        album: 'Nattens Madrigal'},

       {name: 'I Drink Alone',
        artist: 'The Cumshots',
        album: 'Just Quit Trying'}
     ]
   }
   this.addTrack = this.addTrack.bind(this);
   this.removeTrack = this.removeTrack.bind(this);
   this.updatePlaylistName = this.updatePlaylistName.bind(this);
   this.savePlaylist = this.savePlaylist.bind(this);
   this.search = this.search.bind(this);
 }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    if (tracks.filter(savedTrack => savedTrack.id === track.id)) {
      tracks.shift(track);
    }
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  // Step 63 - I don't understand step 63 at all. Where are these uri values supposed to be coming from?
  savePlaylist() {
    const trackURIs = [];
    const tracks = this.state.playlistTracks;
    trackURIs.map()
  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
