import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity';
import deviceConfiguration from '../responsiveForDevices/DeviceConfiguration';
import Result from './Result';
import NoResult from './NoResult';

const AppTitle = styled.h1`
  text-align: center;
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${deviceConfiguration.tablet} {
      font-size: 40px;
    }
    @media ${deviceConfiguration.laptop} {
      font-size: 50px;
    }
    @media ${deviceConfiguration.laptopL} {
      font-size: 60px;
    }
    @media ${deviceConfiguration.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

class App extends React.Component {
  state = {
    value: 'KathMandu',
    weatherInfo: null,
    error: false,
  };
  componentDidMount() {
    this.handleSearchCity(this.state.value)
  }

  handleInputChange = (cityValue,e) => {
    this.setState({
      value:cityValue,
    });
  };

  handleSearchCity = (eachCityValue,e) => {
    if(e){
      e.preventDefault();
    }
    if(eachCityValue){
      let  value  = eachCityValue;
      const APIkey = process.env.REACT_APP_API_KEY;

      const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
      const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;

      Promise.all([fetch(weather), fetch(forecast)])
          .then(([res1, res2]) => {
            if (res1.ok && res2.ok) {
              return Promise.all([res1.json(), res2.json()]);
            }
            throw Error(res1.statusText, res2.statusText);
          })
          .then(([data1, data2]) => {
            const months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const currentDate = new Date();
            const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
                months[currentDate.getMonth()]
            }`;
            const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
            const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

            const weatherInfo = {
              city: data1.name,
              country: data1.sys.country,
              date,
              description: data1.weather[0].description,
              main: data1.weather[0].main,
              temp: data1.main.temp,
              highestTemp: data1.main.temp_max,
              lowestTemp: data1.main.temp_min,
              sunrise,
              sunset,
              clouds: data1.clouds.all,
              humidity: data1.main.humidity,
              wind: data1.wind.speed,
              forecast: data2.list,
            };
            this.setState({
              weatherInfo,
              error: false,
            });
          })
          .catch(error => {
            console.log(error);

            this.setState({
              error: true,
              weatherInfo: null,
            });
          });
    }

  };

  render() {
    const { value, weatherInfo, error } = this.state;
    return (
      <>
        <AppTitle showLabel={(weatherInfo || error) && true}>Weather Forecast</AppTitle>
        <WeatherWrapper>
          <AppTitle secondary showResult={(weatherInfo || error) && true}>
            Weather Forecast
          </AppTitle>
          <SearchCity
              value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NoResult error={error} />}
        </WeatherWrapper>
      </>
    );
  }
}

export default App;
