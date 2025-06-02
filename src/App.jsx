import { useState } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);

  const logout = () => setUser(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {!user ? <Auth setUser={setUser} /> : <Chat user={user} logout={logout} />}
    </div>
  );
}

export default App;