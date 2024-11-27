const container = document.querySelector("#container");

const red = document.createElement("p");
const blue = document.createElement("h3");
const nestedDivs = document.createElement("div");
const h1Div = document.createElement("h1");
const pDiv = document.createElement("p");

red.style.color = 'red';
red.textContent = "Hey I'm red!"

blue.style.color = 'blue';
blue.textContent = "I'm a blue h3!"

nestedDivs.style.cssText = `
    border: black;
    background-color: pink;
`

h1Div.textContent = "I'm in a div";
pDiv.textContent = "ME TOO!";

container.appendChild(red);
container.appendChild(blue);

nestedDivs.appendChild(h1Div);
nestedDivs.appendChild(pDiv);
container.appendChild(nestedDivs);