$(document).ready(function () {
    // Function to set weather icon based on weather description
    function setWeatherIcon(description, isDay) {
        // Define the table data as a JSON object
        const weatherIcons = {
            "clear sky": isDay ? "wi-day-sunny" : "wi-night-clear",
            "few clouds": isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy",
            "scattered clouds": isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy",
            "broken clouds": isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy",
            "shower rain": isDay ? "wi-day-showers" : "wi-night-alt-showers",
            "rain": isDay ? "wi-day-rain" : "wi-night-alt-rain",
            "thunderstorm": isDay ? "wi-day-thunderstorm" : "wi-night-alt-thunderstorm",
            "snow": isDay ? "wi-day-snow" : "wi-night-alt-snow",
            "mist": isDay ? "wi-day-fog" : "wi-night-fog",
            "haze": "wi-day-haze",  // Assuming the same icon for day and night
        };

        // Get the corresponding icon class from the table
        const iconClass = weatherIcons[description.toLowerCase()];

        // Set the weather icon
        $(".weatherIcon").html(`<i class="wi ${iconClass}"></i>`);
    }

    // Get user's IP address
    $.getJSON("https://ipapi.co/json", function (ipData) {
        // Extract location coordinates from ip-api.com response
        const latitude = ipData.latitude;
        const longitude = ipData.longitude;

        // OpenWeatherMap API key
        const openWeatherApiKey = "fa3efeddd8945f7bdd69c124d2a8bb44";
        // Replace 'YOUR_OPENWEATHERMAP_KEY' with your actual API key

        // OpenWeatherMap API endpoint
        const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`;

        // Make AJAX request to OpenWeatherMap API
        $.ajax({
            url: apiEndpoint,
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Update HTML with weather data
                $(".temperature").text(`${Math.round(data.main.temp)}°`);
                $(".description").text(capitalizeFirstLetterEachWord(data.weather[0].description));
                $(".city").text(data.name);

                // Set weather icon based on weather description and time of day
                setWeatherIcon(data.weather[0].description, moment().hour() >= 6 && moment().hour() < 18);
            },
            error: function () {
                console.log("Error fetching weather data");
            },
        });

        // Set current date
        var currentDate = new Date();
        $("#day").text(currentDate.getDate());

        // Set current month
        var months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        $("#month").text(months[currentDate.getMonth()]);
    });
});

// Function to capitalize the first letter of each word
function capitalizeFirstLetterEachWord(str) {
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}