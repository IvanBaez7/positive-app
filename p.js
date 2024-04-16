const button = document.getElementById('submit');
const quoteContainer = document.getElementById('quoteContainer');

button.addEventListener('click', async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/randomQuote');
    const data = await response.json();
    const { quote, verse } = data;

    // Update quoteContainer with the retrieved quote and verse
    quoteContainer.innerHTML = `
      <div class="container">
        <span class="quote-scripture">${quote}</span>
        <span class="quote-verse">${verse}</span>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    quoteContainer.innerHTML = 'Error fetching random quote';
  }
});
