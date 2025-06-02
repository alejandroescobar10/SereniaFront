import { useState } from 'react';
import { register, login } from '../services/api';

export default function Auth({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const res = await register(form);
    if (res.message || res.userId) {
      setUser({ userId: res.userId, name: form.name });
    } else {
      alert(res.error || 'Error al registrar');
    }
  };

  const handleLogin = async () => {
    const res = await login(form);
    if (res.userId) {
      setUser({ userId: res.userId, name: res.name });
    } else {
      alert(res.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md w-full">
      <h2 className="text-xl font-bold text-center mb-4">Serenia 🌿</h2>
      <input name="name" placeholder="Nombre" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input name="email" type="email" placeholder="Correo" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
      <button onClick={handleRegister} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-2">Registrarse</button>
      <button onClick={handleLogin} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Iniciar sesión</button>
    </div>
  );
}