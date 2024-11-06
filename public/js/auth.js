const authBtn = document.getElementById('authBtn');

authBtn.addEventListener('click', async () => {
  const loginInput = document.getElementById('loginInput');
  const passwordInput = document.getElementById('passwordInput');
  console.log(loginInput.value, passwordInput.value);
  if (!loginInput || !passwordInput) return;
  // Send the question to the backend
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginInput.value,
        password: passwordInput.value,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data));

    window.location.href = 'http://localhost:3000/chatbot/ask';
  } catch (error) {
    console.error('Error:', error);
  }
});
