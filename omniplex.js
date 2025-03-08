import React, { useState, useEffect } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [joke, setJoke] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleLogin = () => {
    alert('Login successful. Redirecting to dashboard...');
  };

  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/Any')
      .then(response => response.json())
      .then(data => {
        if (data.type === 'single') {
          setJoke(data.joke);
        } else {
          setJoke(`${data.setup} - ${data.delivery}`);
        }
      })
      .catch(error => console.error('Error fetching the joke:', error));
  }, []);

  const handleChat = () => {
    fetch('https://api.monkedev.com/fun/chat?msg=' + encodeURIComponent(chatInput))
      .then(response => response.json())
      .then(data => {
        setChatResponse(data.response);
      })
      .catch(error => console.error('Error fetching chat response:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 mb-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Omniplex</h2>
        <p className="text-gray-600">Sign in to continue</p>
        <input 
          type="text" 
          className="border p-2 w-full mt-4" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          className="border p-2 w-full mt-4" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white p-2 w-full mt-4 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Random Joke of the Day</h3>
        <p className="text-gray-700">{joke}</p>
      </div>
      <div className="mt-4 p-4 bg-blue-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Chat with AI</h3>
        <input 
          type="text" 
          className="border p-2 w-full mt-4" 
          placeholder="Ask me anything..." 
          value={chatInput} 
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button 
          className="bg-green-500 text-white p-2 w-full mt-4 rounded-lg"
          onClick={handleChat}
        >
          Chat</button>
        <p className="text-gray-700 mt-2">Response: {chatResponse}</p>
      </div>
    </div>
  );
}
