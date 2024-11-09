import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../config';

// src/pages/Register.tsx
const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await fetch(`${serverURL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			navigate('/login');
		} catch (error) {
			console.error('Error registering:', error);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-md">
			<h1 className="text-3xl font-bold mb-6">Register</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1">Name</label>
					<input
						type="text"
						required
						className="w-full p-2 border rounded"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
				</div>
				{/* Email and password fields similar to Login */}
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
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
