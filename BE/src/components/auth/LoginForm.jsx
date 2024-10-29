import { useState } from 'react';
import { login } from '../services/api';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        alert('Login successful');
        setError('');
      } else {
        setError(response.data.message); // Hiển thị lỗi từ server
      }
    } catch {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
