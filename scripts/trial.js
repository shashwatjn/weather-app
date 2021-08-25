const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) => {
    console.log(data);
    //const cityDets = data.cityDetail;
    //const weather = data.weather;

    //deStructured property to place data
    const{ cityDetail, weather} = data;
 
    //update details template
    details.innerHTML = 
    `
        <h5 class="my-3">${cityDetail.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
      
    `;

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

  }

const updateCity = async (city) => {
  const cityDetail = await getCity(city);
  const weather = await getWeather(cityDetail.Key);

  return {cityDetail, weather};
}
 
cityForm.addEventListener('submit', e => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();

  cityForm.reset();


  //main functions running
  updateCity(city)
    .then(data => updateUI(data))   //update the ui with new city
    .catch(err => console.log(err))
})

forecast.js
const key = 'LAWiGzhI8ZLpatePHUEK384s05MgAz7p';

//get weather information

const getWeather = async (id) => {

   
   const base =  'http://dataservice.accuweather.com/currentconditions/v1/';
   const query = `${id}?apikey=${key}`;
 
   const response = await fetch(base + query);
   const data = await response.json();

    return data[0];
}

//get city information


const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];


};

