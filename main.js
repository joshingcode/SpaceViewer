// use or fetch to get our picture of the day 


document.querySelector('button').addEventListener('click',getFetch); 


function getFetch(){ 
let date= document.querySelector('input').value;
const url = `https://api.nasa.gov/planetary/apod?api_key=DTwzGxGJhoXp5t8jIcONrSNZlksqvw0POU9U9KxM&date=${date}`;

fetch(url)

    .then(res => res.json()) // parse response as JSON

    .then(data => {
        document.querySelector('img').src= data.hdurl 
        document.querySelector('h2').innerHTML=data.title
        document.querySelector('p').innerHTML=data.explanation
      console.log(data)

    })

    .catch(err => {

        console.log(`error ${err}`)

    });
}