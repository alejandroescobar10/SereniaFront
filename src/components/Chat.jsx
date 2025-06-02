import { useState } from 'react';
import { sendMessage } from '../services/api';

export default function Chat({ user, logout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);

    const res = await sendMessage(user.userId, input);
    const aiMsg = { sender: 'serenia', content: res.reply };
    setMessages(prev => [...prev, aiMsg]);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-semibold">Hola {user.name}, soy Serenia 🌿</h2>
        <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">Salir</button>
      </div>

      <div className="bg-white h-96 overflow-y-auto rounded p-4 shadow mt-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-green-100'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe algo..." className="flex-grow p-2 border rounded" />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar</button>
      </div>
    </div>
  );
}