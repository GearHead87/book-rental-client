import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../config';

// src/pages/PostBook.tsx
const PostBook = () => {
	const [formData, setFormData] = useState({
		book_name: '',
		author: '',
		published_date: '',
		image: null as File | null,
	});
	const { token } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (value) data.append(key, value);
		});

		try {
			await fetch(`${serverURL}/post-book`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: data,
			});
			navigate('/');
		} catch (error) {
			console.error('Error posting book:', error);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-md">
			<h1 className="text-3xl font-bold mb-6">Post a New Book</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1">Book Name</label>
					<input
						type="text"
						required
						className="w-full p-2 border rounded"
						value={formData.book_name}
						onChange={(e) => setFormData({ ...formData, book_name: e.target.value })}
					/>
				</div>
				<div>
					<label className="block mb-1">Author</label>
					<input
						type="text"
						required
						className="w-full p-2 border rounded"
						value={formData.author}
						onChange={(e) => setFormData({ ...formData, author: e.target.value })}
					/>
				</div>
				<div>
					<label className="block mb-1">Published Date</label>
					<input
						type="date"
						required
						className="w-full p-2 border rounded"
						value={formData.published_date}
						onChange={(e) =>
							setFormData({ ...formData, published_date: e.target.value })
						}
					/>
				</div>
				<div>
					<label className="block mb-1">Image</label>
					<input
						type="file"
						accept="image/*"
						className="w-full p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, image: e.target.files?.[0] || null })
						}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Post Book
				</button>
			</form>
		</div>
	);
};

export default PostBook;
