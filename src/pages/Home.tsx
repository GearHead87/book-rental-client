import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { Book } from '../types/types';
import { serverURL } from '../config';

// src/pages/Home.tsx
const Home = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { token, user } = useAuth();

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch(`${serverURL}/books`);
			if (!response.ok) throw new Error('Failed to fetch books');
			const data = await response.json();
			setBooks(data);
		} catch (error) {
			console.error('Error fetching books:', error);
			setError('Failed to load books. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (!token) {
			navigate('/login');
			return;
		}

		if (!window.confirm('Are you sure you want to delete this book?')) {
			return;
		}

		try {
			setLoading(true);
			const response = await fetch(`${serverURL}/delete-book/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) throw new Error('Failed to delete book');

			// Update the books list
			setBooks(books.filter((book) => book.id !== id));
		} catch (error) {
			console.error('Error deleting book:', error);
			setError('Failed to delete book. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = (id: number) => {
		if (!token) {
			navigate('/login');
			return;
		}
		navigate(`/update-book/${id}`);
	};

	const handleRent = async (id: number) => {
		if (!token) {
			navigate('/login');
			return;
		}

		if (!window.confirm('Are you sure you want to rent this book?')) {
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${serverURL}/rent-book/${id}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to rent book');
			}

			// Update the book's status in the local state
			setBooks(books.map((book) => (book.id === id ? { ...book, rented: true } : book)));

			alert('Book rented successfully!');
		} catch (error: any) {
			console.error('Error renting book:', error);
			setError(error.message || 'Failed to rent book. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleReturn = async (id: number) => {
		if (!token) {
			navigate('/login');
			return;
		}

		if (!window.confirm('Are you sure you want to return this book?')) {
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${serverURL}/return-book/${id}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to return book');
			}

			// Update the book's status in the local state
			setBooks(books.map((book) => (book.id === id ? { ...book, rented: false } : book)));

			alert('Book returned successfully!');
		} catch (error: any) {
			console.error('Error returning book:', error);
			setError(error.message || 'Failed to return book. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div className="container mx-auto p-4">Loading...</div>;
	}

	if (error) {
		return (
			<div className="container mx-auto p-4">
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Available Books</h1>
			{books.length === 0 ? (
				<p className="text-gray-500">No books available.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{books.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							onDelete={handleDelete}
							onUpdate={handleUpdate}
							onRent={handleRent}
							onReturn={handleReturn}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
