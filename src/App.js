import './App.css';
import React from 'react';
import axios from 'axios';  //All lower case.  Not a component

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',  //submitted by user
      apiData: [],  //data from locationIQ
      // cityLat: 0,
      // cityLon: 0,
      staticMap: '',  //image from locationIQ
      error: false
    }
  }

  handleButton = async (e) => {  //enable asynchronous, promise-based behavior ... plays with await command below
    e.preventDefault();
    try {  //try to do this
      console.log(`${this.state.city} was returned from user input`);
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      //make the request to the LocationIQ API
      console.log(`${url} was sent to locationIQ.com`)
      let locationIQdata = await axios.get(url);  //location will hold returned data from get method.  parameter is a url.
      console.log(locationIQdata.data); //displays a log of what was received
      // let locationStaticMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.apiData.lat},${this.state.apiData.lon}&zoom=10`
      //curl -o mystaticmap.png  code provided by locationID.  what is curl??
      this.setState({
        apiData: locationIQdata.data[0], //sets first result in array to state
        // cityLat: locationIQdata.data[0].lat,
        // cityLon: locationIQdata.data[0].lon,
        staticMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.apiData.lat},${this.state.apiData.lon}&zoom=10`,  //was always undefined
        error: false,  //resets error-free state in case an error had been returned before
      });
      console.log(locationIQdata.data[0]);
    } catch (error) {  //else do this
      console.log('error: ', error);
      console.log('error message:', error.message);
      this.setState({
        error: true,  //sets error state
        errorMessage: error.message,
      })
    }
  }

  cityChange = (e) => {  //attached to input below
    this.setState({
      city: e.target.value  //must be "value"
    });
  }

  render() {
    return (
      <>
        <h1>What city shall we Explore?</h1>
        <form onSubmit={this.handleButton}>
          <label htmlFor="cityName">Explore a City</label>
          <br />
          <input
            type="text"
            id="cityName"
            onChange={this.cityChange} />
          <br />
          <button
            type="submit">
            Explore!
          </button>
        </form>
        <h2>{this.state.apiData.display_name}</h2>
        <p>latitude = {this.state.apiData.lat}</p>
        <p>longitude = {this.state.apiData.lon}</p>
        <img src={this.state.staticMap}></img>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.apiData.lat},${this.state.apiData.lon}&zoom=10`}></img>
      </>
    );
  }
}  //this is all one massive component...  can it be divided up?

export default App;
