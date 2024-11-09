import { useAuth } from '../context/AuthContext';
import { Book } from '../types/types';

// src/components/BookCard.tsx
const BookCard = ({
	book,
	onDelete,
	onUpdate,
	onRent,
	onReturn,
}: {
	book: Book;
	onDelete: (id: number) => void;
	onUpdate: (id: number) => void;
	onRent: (id: number) => void;
	onReturn: (id: number) => void;
}) => {
	const { token, user } = useAuth();
	const isOwner = user?.name === book.user_name;

	return (
		<div className="border rounded-lg overflow-hidden shadow-lg">
			<img
				src={book.image_path || '/placeholder-book.jpg'}
				alt={book.book_name}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-xl font-bold">{book.book_name}</h3>
				<p>Author: {book.author}</p>
				<p>Published: {new Date(book.published_date).toLocaleDateString()}</p>
				<p>Posted by: {book.user_name}</p>
				<p>Status: {book.rented ? 'Rented' : 'Available'}</p>

				<div className="mt-4 space-x-2">
					{isOwner && (
						<>
							<button
								onClick={() => onUpdate(book.id)}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Update
							</button>
							<button
								onClick={() => onDelete(book.id)}
								className="bg-red-500 text-white px-4 py-2 rounded"
							>
								Delete
							</button>
						</>
					)}
					{token && !isOwner && !book.rented && (
						<button
							onClick={() => onRent(book.id)}
							className="bg-green-500 text-white px-4 py-2 rounded"
						>
							Rent
						</button>
					)}
					{token && !isOwner && book.rented && (
						<button
							onClick={() => onReturn(book.id)}
							className="bg-green-500 text-white px-4 py-2 rounded"
						>
							return
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookCard;
