const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    console.log(data);
    // const cityDets = data.cityDetail;
    // const weather = data.weather;

    //destructure properties
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


      let timeSrc = weather.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';
      //update night and day ion images

      time.setAttribute('src', timeSrc);


      const iconSource = `icons/${weather.WeatherIcon}.svg`


      icon.setAttribute('src', iconSource);

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

    //Getting the city value
    const city = cityForm.city.value.trim();

    cityForm.reset();

    //update the UI with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))



})
