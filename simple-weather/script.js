$(document).ready(function () {
    // Get user's IP address
    $.getJSON("http://ip-api.com/json", function (ipData) {
        // Extract location coordinates from ip-api.com response
        const latitude = ipData.lat;
        const longitude = ipData.lon;
    
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
            $(".temperature").text(`${data.main.temp}°C`);
            $(".description").text(data.weather[0].description);
            $(".city").text(data.name);
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