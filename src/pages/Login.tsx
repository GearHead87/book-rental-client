import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../config';

// src/pages/Login.tsx
const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(`${serverURL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			if (data.token) {
				login(data.token, data.user);
				navigate('/');
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-md">
			<h1 className="text-3xl font-bold mb-6">Login</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1">Email</label>
					<input
						type="email"
						required
						className="w-full p-2 border rounded"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					/>
				</div>
				<div>
					<label className="block mb-1">Password</label>
					<input
						type="password"
						required
						className="w-full p-2 border rounded"
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
