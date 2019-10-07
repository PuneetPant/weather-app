console.log('js file loaded!');
console.log("ndsnjkdshbhds");
// console.log('http://localhost:3000/weather?address=boston');
const weatherFunction = (place) => {
    // console.log(place);
    fetch('http://localhost:3000/weather?address=' + place).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                // console.log(document.querySelector('.resultData .errorData').value);
                document.querySelector('.resultData .forecastData').innerHTML='';
                document.querySelector('.resultData .location').innerHTML = '';
                document.querySelector('.resultData .errorData').innerHTML = data.error;
            }
            else {
                // console.log("data is this : ", data);
                document.querySelector('.resultData .forecastData').innerHTML=data.forecastData;
                document.querySelector('.resultData .location').innerHTML=data.location;
                document.querySelector('.resultData .errorData').innerHTML='';

            }
        })
        document.querySelector('form input').value = '';
    })
}

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const getLocation = document.querySelector('form input').value;
    // console.log(getLocation);
    weatherFunction(getLocation)
})