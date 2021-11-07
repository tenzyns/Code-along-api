window.addEventListener("load", () => {
    let lat;
    let long;
    const tempDescription = document.querySelector(".temperature-description");
    const tempDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    let icon = document.querySelector("#icon");
    let degreeSection = document.querySelector(".degree-section");
    const unit = document.querySelector(".degree-section span");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6adb59ab38ae076208525ee8e440d6e6`;
        
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const description = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1);
            let temp = (data.main.temp - 273.15).toFixed(2);
            let zone = data.name;
            let iconId = data.weather[0].icon;
            icon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            console.log(data);
            tempDegree.textContent = temp;
            tempDescription.textContent = description;
            locationTimezone.textContent = zone;
            let fahrenheit = ((temp * 9 / 5) + 32).toFixed(2);

            degreeSection.addEventListener("click", () => {
                if (unit.textContent === "C") {
                    unit.textContent = "F";
                    tempDegree.textContent = fahrenheit;
                    console.log("iam farehn");
                } else {
                    unit.textContent = "C";
                    tempDegree.textContent = temp;
                    console.log("iam celsius");               
                }
            });
        })
        .catch(err => console.log(err));

        });
    }   
});