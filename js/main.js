document.querySelector('form').addEventListener('submit', function(e){e.preventDefault(); makeReq()})
document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  const question = document.querySelector("#question").value.toLowerCase(); //taking value from user input to input element
  const res = await fetch(`/api?subject=${question}`)  //notice since you're sending req to your own server
  const data = await res.json()
  // console.log(data);
  document.querySelector("#answer").textContent = data.verdict[Math.floor(Math.random()*data.verdict.length)]
}