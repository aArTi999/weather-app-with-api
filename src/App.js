import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { Button, Card, CardBody, Container, Form, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const API_KEY = '7a16d653417671f069d8214d1678597a';

const App=() => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  const onSearchTap = (e) => {
    e.preventDefault();
    
    if(city === ''){
      return alert('Please enter a city');
    }

    fetchWeatherData(city);

  };


  const fetchWeatherData = (city) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    axios.get(API_URL).then(response => {
      setWeatherData(response?.data);
      console.log(weatherData);
    })
  };

  return (
    <Container fluid className="App d-flex flex-column p-4 bg-info">
      <h2 className="fs-1 text-center fw-bold pb-2">Awesome Mausam</h2>
      <Form onSubmit={onSearchTap}>
        <Input
          value={city}
          onChange={(e)=> setCity(e.target.value)}
          placeholder="Enter city name"
        />
       <Container className='mt-4 d-flex align-items-center justify-content-center'>
        <Button className='align-center' color='primary'>Search</Button>
       </Container>
      </Form>

      {
        Object.keys(weatherData).length ?

            <Card className='mt-4 text-center'>
              <CardBody>
              <p className='fw-bold fs-3'>City: {weatherData?.name}</p>
              <p className='fw-bold fs-3'>Temperature: {`${Math.round(weatherData?.main?.temp)} C`}</p>

              </CardBody>
            </Card>
            : <div></div>
      }
    </Container>
  );
}

export default App;
