const form     = document.querySelector("form")
const inputLocation = document.getElementById("location")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


form.addEventListener("submit", (e) => {
    e.preventDefault();
fetch("http://localhost:3000/weather?address="+ inputLocation.value).then((response) => {
  response.json().then((data) => {
      if(data.error){
        messageOne.textContent = data.error
      }else{
        messageOne.textContent = data[0].placeName
        messageTwo.textContent = data[1].response

        console.log(data[1].response)
      }
  })  
})
})
