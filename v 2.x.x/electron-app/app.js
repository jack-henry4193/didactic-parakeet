/*Includes any external .js files specified. Call 'include(path/to/file)' function with the path to the file.*/
function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include("./app_config.js");

/*----------------------------------------------------------*/

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
/*sets the 'F' key to toggle full screen. NOTE: pressing the same key does not close full screen...you must press 'esc'.*/
function checkKeyPressed(evt) {
    evt.keyCode = 70
    if (evt.keyCode == "70") {
        openFullscreen();
        //document.getElementById('main').style.cursor = "none";
    } else {

    }
}


/*----------------------------------------------------*/

/* Time */
/*creates a digital clock. Displays minutes and hours. Seconds are just to calculate when to change the minutes.*/
//returns 24 hour time
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var ampm = h >= 12 ? 'pm' : 'am'; //if the hour(24 hour time) is greater than 12, sets var ampm = pm, else = am.
    h = h % 12; //divides 24 hour time to get 12 hour time.
    h = h ? h : 12; // the hour '0' should be '12'
    document.getElementById('clk').innerHTML =
        h + ":" + m; //displays h:m in html.
    document.getElementById('ap').innerHTML = ampm; //displays am or pm in html.
    var t = setTimeout(startTime, 500); //recalls startTime() ever 500 miliseconds(1/2 second);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

/*creates the hour for the hourly forcast*/
function forcast_hour(add, id) {
    var today = new Date();
    var h = today.getHours() + add;
    if (h == 24) {
        h -= 12
    } else if (h > 24) {
        h -= 24
    };
    var ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    setInterval(forcast_hour, 60000);
    document.getElementById(id).innerHTML = h + " " + ampm;
}

forcast_hour(2, 'time1'); //calls forcast_hour() and adds 2 hours to the time.
forcast_hour(4, 'time2');//calls forcast_hour() and adds 4 hours to the time.
forcast_hour(6, 'time3');//calls forcast_hour() and adds 4 hours to the time.


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
}

var x = setTimeout(getdate(), 3600000);


/*---------------------------------------------------*/

/*weather*/
/* calling each item is a bit messy here. You could add arguments to the function and call the function with the hour forcast and icon image like shown with the stock API below...*/
function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+"44.986656"+"&lon="+"-93.258133"+"&units=imperial&appid=" + weth_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            /*console.log(data);*/
            temp = data.current.temp;
            descrip = data.current.weather[0].description;
            icon = data.current.weather[0].icon;
            temp = Math.round(temp);
            document.getElementById('tmp').innerHTML = temp + "°";
            document.getElementById('des').innerHTML = descrip;
            document.getElementById('icon-now').src = "icons/" + icon + ".png";
            forcast1 = data.hourly[2].temp;
            forcast1 = Math.round(forcast1);
            document.getElementById('forcast1').innerHTML = forcast1 + "°";
            forcast2 = data.hourly[4].temp;
            forcast2 = Math.round(forcast2);
            document.getElementById('forcast2').innerHTML = forcast2 + "°";
            forcast3 = data.hourly[6].temp;
            forcast3 = Math.round(forcast3);
            document.getElementById('forcast3').innerHTML = forcast3 + "°";
            icon1 = data.hourly[2].weather[0].icon;
            document.getElementById('icon1').src = "icons/" + icon1 + ".png";
            icon2 = data.hourly[4].weather[0].icon;
            document.getElementById('icon2').src = "icons/" + icon2 + ".png";
            icon3 = data.hourly[6].weather[0].icon;
            document.getElementById('icon3').src = "icons/" + icon3 + ".png";
        });
}

getWeather();
setInterval(getWeather, 60000);


/*-------------------------------------------------------*/

/*Stocks*/
//creates a scrolling list of chosen stock tickers with the days information.
function getStock(symbol, id) {
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + AV_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log(data);
            symbol = data["Global Quote"]["01. symbol"]
            price = data["Global Quote"]["05. price"]
            price = Math.round(price * 100) / 100;
            chg = data["Global Quote"]["09. change"]
            chg = Math.round(chg * 100) / 100;
            fchg = Math.sign(chg);
            if (fchg < 0) {
                document.getElementById(id).style.color = "red";
            } else {
                document.getElementById(id).style.color = "chartreuse";
            }
            pchg = data["Global Quote"]["10. change percent"]
            pchg = String(pchg).substring(0, 6);
            pchg = Math.round(parseFloat(pchg) * 100) / 100;
            document.getElementById(id).innerHTML = symbol + '  ' + price + ' ' + chg + ' ' + pchg + '%';
        });
}

getStock("AAPL", '1');
getStock("TSLA", '2');
getStock("AMZN", '3');
getStock("MSFT", '4');
getStock("NDAQ", '5');
setInterval(getStock("AAPL", '1'), 240000);
setInterval(getStock("TSLA", '2'), 240000);
setInterval(getStock("AMZN", '3'), 240000);
setInterval(getStock("MSFT", '4'), 240000);
setInterval(getStock("NDAQ", '5'), 240000);



