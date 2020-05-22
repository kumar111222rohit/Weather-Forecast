import React from 'react';
import './Result.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import deviceConfiguration from '../responsiveForDevices/DeviceConfiguration';
import ForecastHour from './ForecastHour';
import ResultEffectFadeIn from './ResultEffectFadeIn';
import LabelLarge from './LabelLarge';
import LabelMid from './LabelMid';
import LabelSmall from './LabelSmall';
import Text from './Text';

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultEffectFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${deviceConfiguration.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${deviceConfiguration.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${deviceConfiguration.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${deviceConfiguration.laptop} {
    font-size: 120px;
  }
  @media ${deviceConfiguration.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${deviceConfiguration.tablet} {
    font-size: 70px;
  }
  @media ${deviceConfiguration.laptop} {
    font-size: 90px;
  }
  @media ${deviceConfiguration.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${deviceConfiguration.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${deviceConfiguration.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${deviceConfiguration.laptop} {
    order: 4;
  }
`;

const Result = ({ weather }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = weather;

  const forecasts = forecast.map(item => (
    <ForecastHour
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ));

  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <Results>
      <LocationWrapper>
        <LabelLarge>
          {city}, {country}
        </LabelLarge>
        <LabelSmall weight="400">{date}</LabelSmall>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>{weatherIcon}</WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(temp)}&#176;</Temperature>
          <LabelSmall weight="400" firstToUpperCase>
            {description}
          </LabelSmall>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <LabelSmall align="center" weight="400">
            {Math.floor(highestTemp)}&#176;
          </LabelSmall>
          <Text align="center">High</Text>
        </WeatherDetail>
        <WeatherDetail>
          <LabelSmall align="center" weight="400">
            {wind}mph
          </LabelSmall>
          <Text align="center">Wind</Text>
        </WeatherDetail>
        <WeatherDetail>
          <LabelSmall align="center" weight="400">
            {sunrise}
          </LabelSmall>
          <Text align="center">Sunrise</Text>
        </WeatherDetail>
        <WeatherDetail>
          <LabelSmall align="center" weight="400">
            {Math.floor(lowestTemp)}&#176;
          </LabelSmall>
          <Text align="center">Low</Text>
        </WeatherDetail>
        <WeatherDetail>
          <LabelSmall align="center" weight="400">
            {humidity}%
          </LabelSmall>
          <Text align="center">Rain</Text>
        </WeatherDetail>
        <WeatherDetail>
          <LabelSmall align="center" weight="400">
            {sunset}
          </LabelSmall>
          <Text align="center">Sunset</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
      <ForecastWrapper>
        <LabelMid weight="400">Forecast</LabelMid>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
};

export default Result;
