window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temp-degree');
    const tempSpan = document.querySelector('.temp-degree span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/19d3d44dc3cafcd539c5f26d668dfe46/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;

                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5/9);

                setIcons(icon, document.querySelector('.icon'));

                tempSection.addEventListener('click', ()=> {
                    if(tempSpan.textContent === "°F"){
                        tempSpan.textContent = "°C";
                        tempDegree.textContent = Math.floor(celsius);
                    }else{
                        tempSpan.textContent = "°F";
                        tempDegree.textContent = temperature;
                    }
                })
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});