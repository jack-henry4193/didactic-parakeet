/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(evt) {
    if (evt.keyCode == "70") {
        openFullscreen();
    } else {

    }
}

/*----------------------------------------------------*/

/* Time */

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    document.getElementById('clk').innerHTML =
        h + ":" + m;
    document.getElementById('ap').innerHTML = ampm;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}


/*-----------------------------------------------------*/

/* Date */

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getdate() {
    var d = new Date();
    var month = months[d.getMonth()];
    var date = d.getDate();
    var day = days[d.getDay()];
    document.getElementById('dat').innerHTML = (day + ", " + month + " " + date);
};

var x = setTimeout(getdate(), 3600000);


/*---------------------------------------------------*/

/*weather*/

var key = 'e265de32d5883ec3609745c6b02072b3'

function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=44.72&lon=-96.28&units=imperial&appid=e265de32d5883ec3609745c6b02072b3")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            temp = data.current.temp;
            descrip = data.current.weather[0].description;
            icon = data.current.weather[0].icon;
            temp = Math.round(temp);
            document.getElementById('tmp').innerHTML = temp;
            document.getElementById('des').innerHTML = descrip;
            geticon();
            document.getElementById('icon-now').src = "/icons/" + icon + ".png";
        });
};

function geticon() {
    if (icon=="01d" || "01n" || "02d" || "02n" || "10d" || "10n") {
        icon = icon;
    }else if (icon=="03n" || "03d") {
        icon = "03d";
    } else if (icon=="04n" || "04d") {
        icon = "04d";
    } else if (icon=="09n" || "09d") {
        icon = "09d";
    } else if (icon=="11n" || "11d") {
        icon = "11d";
    } else if (icon=="13n" || "13d") {
        icon = "13d";
    } else {
        icon = icon;
    }
};

getWeather();
setInterval(getWeather, 1800000);
