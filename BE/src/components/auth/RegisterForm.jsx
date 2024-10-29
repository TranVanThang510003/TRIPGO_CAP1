import { useState } from 'react';
import { register } from '../services/api';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, password, email, phone });
      if (response.data.errors) {
        setErrors(response.data.errors); // Hiển thị lỗi từ server
      } else {
        alert(response.data.message);
        setErrors([]); // Reset lỗi khi đăng ký thành công
      }
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" />
      <button type="submit">Register</button>
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>{error}</p>
          ))}
        </div>
      )}
    </form>
  );
}

export default RegisterForm;
