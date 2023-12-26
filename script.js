// api key 
const apiKey= '864ea9df890c8465e6cc1c0fa0212abc';
const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");


formEl.addEventListener("submit",(event)=>{
    // to remove the refresh of page
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);


   

});

 async function getWeatherData(cityValue){
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${cityValue}&appid=${apiKey}&units=metric`)
       try{ if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp)
        const description =data.weather[0].description;
        const icon =data.weather[0].icon;
        const details =[
            `Feels like: ${Math.round(data.main.temp)}°C`,
            `Humidity:${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`

        ];
        weatherDataEl.querySelector(".icon").innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="waether-image">`
        weatherDataEl.querySelector(".temperature").textContent =`${temperature}°C`
        weatherDataEl.querySelector(".description").textContent =`${description}`
        weatherDataEl.querySelector(".details").innerHTML =details.map((detail) => `<div>${detail}</div>`).join("");

    }
    catch (error){
        weatherDataEl.querySelector(".icon").innerHTML =""
        weatherDataEl.querySelector(".temperature").textContent =""
        weatherDataEl.querySelector(".description").textContent =`An Error Happen, Please try Again`
        weatherDataEl.querySelector(".details").innerHTML ="";
    }

    
}
