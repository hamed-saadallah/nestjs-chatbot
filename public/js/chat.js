const messagesDiv = document.getElementById('messages');

const sendBtn = document.getElementById('sendBtn');

initUserInput = () => {
  const userInput = document.getElementById('userInput');
  const question = userInput.value;
  // Display user's question
  const userMessage = document.createElement('div');
  userMessage.classList.add('user');
  userMessage.innerText = 'You: ' + question;
  messagesDiv.appendChild(userMessage);
  userInput.value = '';
  return question;
};

sendBtn.addEventListener('click', async () => {
  const question = initUserInput();
  if (!question) return;
  // Send the question to the backend
  try {
    const response = await fetch('http://localhost:3000/chatbot/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ prompt: question }),
    });

    const data = await response.text();

    // Display bot's response
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot');
    botMessage.innerText = 'Bot: ' + data;
    messagesDiv.appendChild(botMessage);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('bot');
    errorMessage.innerText = 'Bot: Sorry, something went wrong.';
    messagesDiv.appendChild(errorMessage);
  }

  // Scroll to the bottom of the messages
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
