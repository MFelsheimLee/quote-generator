const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const instagramBtn = document.getElementById("instagram");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quotes from API
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
      quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}

// On Load
getQuotes();


// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);



// // Get Quotes Locally

// import { localQuotes } from "./quotes.js";
// function newQuote() {
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   return quote;
// }
// console.log(newQuote());
