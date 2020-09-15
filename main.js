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

function h1() {
    var today = new Date();
    var h = today.getHours() + 2;
    if (h == 24) {
        h -= 12
    } else if (h > 24) {
        h -= 24
    };
    var ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    setInterval(h1, 60000);
    document.getElementById('time1').innerHTML = h + " " + ampm;
}

h1();

function h2() {
    var today = new Date();
    var h = today.getHours() + 4;
    if (h == 24) {
        h -= 12
    } else if (h > 24) {
        h -= 24
    };
    var ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    setInterval(h2, 60000);
    document.getElementById('time2').innerHTML = h + " " + ampm;
}

h2();

function h3() {
    var today = new Date();
    var h = today.getHours() + 6;
    if (h == 24) {
        h -= 12
    } else if (h > 24) {
        h -= 24
    };
    var ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    setInterval(h3, 60000);
    document.getElementById('time3').innerHTML = h + " " + ampm;
}

h3();


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

var weth_key = 'e265de32d5883ec3609745c6b02072b3'

function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=44.72&lon=-96.28&units=imperial&appid=" + weth_key)
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

const Fin_key = "bt8q75f48v6ulu345cig"
const AV_key = "FASLSWE4EQRXW4OT"

function getStock() {
    symbol1 = "AAPL"
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol1 + "&apikey=" + AV_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            symbol = data["Global Quote"]["01. symbol"]
            price = data["Global Quote"]["05. price"]
            price = Math.round(price * 100) / 100;
            chg = data["Global Quote"]["09. change"]
            chg = Math.round(chg * 100) / 100;
            fchg = Math.sign(chg);
            if (fchg < 0) {
                document.getElementById("1").style.color = "red";
            } else {
                document.getElementById("1").style.color = "chartreuse";
            }
            pchg = data["Global Quote"]["10. change percent"]
            pchg = String(pchg).substring(0, 6);
            pchg = Math.round(parseFloat(pchg) * 100) / 100;
            document.getElementById('1').innerHTML = symbol + '  ' + price + ' ' + chg + ' ' + pchg + '%';
        });
    symbol2 = "TSLA"
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol2 + "&apikey=" + AV_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            symbol = data["Global Quote"]["01. symbol"]
            price = data["Global Quote"]["05. price"]
            price = Math.round(price * 100) / 100;
            chg = data["Global Quote"]["09. change"]
            chg = Math.round(chg * 100) / 100;
            fchg = Math.sign(chg);
            if (fchg < 0) {
                document.getElementById("2").style.color = "red";
            } else {
                document.getElementById("2").style.color = "chartreuse";
            }
            pchg = data["Global Quote"]["10. change percent"]
            pchg = String(pchg).substring(0, 6);
            pchg = Math.round(parseFloat(pchg) * 100) / 100;
            document.getElementById('2').innerHTML = symbol + '  ' + price + ' ' + chg + ' ' + pchg + '%';
        });
    symbol3 = "AMZN"
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol3 + "&apikey=" + AV_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            symbol = data["Global Quote"]["01. symbol"]
            price = data["Global Quote"]["05. price"]
            price = Math.round(price * 100) / 100;
            chg = data["Global Quote"]["09. change"]
            chg = Math.round(chg * 100) / 100;
            fchg = Math.sign(chg);
            if (fchg < 0) {
                document.getElementById("3").style.color = "red";
            } else {
                document.getElementById("3").style.color = "chartreuse";
            }
            pchg = data["Global Quote"]["10. change percent"]
            pchg = String(pchg).substring(0, 6);
            pchg = Math.round(parseFloat(pchg) * 100) / 100;
            document.getElementById('3').innerHTML = symbol + '  ' + price + ' ' + chg + ' ' + pchg + '%';
        });
    symbol4 = "MSFT"
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol4 + "&apikey=" + AV_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            symbol = data["Global Quote"]["01. symbol"]
            price = data["Global Quote"]["05. price"]
            price = Math.round(price * 100) / 100;
            chg = data["Global Quote"]["09. change"]
            chg = Math.round(chg * 100) / 100;
            fchg = Math.sign(chg);
            if (fchg < 0) {
                document.getElementById("4").style.color = "red";
            } else {
                document.getElementById("4").style.color = "chartreuse";
            }
            pchg = data["Global Quote"]["10. change percent"]
            pchg = String(pchg).substring(0, 6);
            pchg = Math.round(parseFloat(pchg) * 100) / 100;
            document.getElementById('4').innerHTML = symbol + '  ' + price + ' ' + chg + ' ' + pchg + '%';
        });
    symbol5 = "NDAQ"
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol5 + "&apikey=" + AV_key)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            symbol = data["Global Quote"]["01. symbol"]
            price = data["Global Quote"]["05. price"]
            price = Math.round(price * 100) / 100;
            chg = data["Global Quote"]["09. change"]
            chg = Math.round(chg * 100) / 100;
            fchg = Math.sign(chg);
            if (fchg < 0) {
                document.getElementById("5").style.color = "red";
            } else {
                document.getElementById("5").style.color = "chartreuse";
            }
            pchg = data["Global Quote"]["10. change percent"]
            pchg = String(pchg).substring(0, 6);
            pchg = Math.round(parseFloat(pchg) * 100) / 100;
            document.getElementById('5').innerHTML = symbol + '  ' + price + ' ' + chg + ' ' + pchg + '%';
        });
}

getStock();
setInterval(getStock(), 240000);
