// src/pages/UpdateBook.tsx
const UpdateBook = () => {
	const { id } = useParams<{ id: string }>();
	const [formData, setFormData] = useState({
		book_name: '',
		author: '',
		published_date: '',
		image: null as File | null,
	});
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch book details
		const fetchBook = async () => {
			try {
				const response = await fetch(`http://localhost:3000/books/${id}`);
				const data = await response.json();
				setFormData({
					book_name: data.book_name,
					author: data.author,
					published_date: data.published_date.split('T')[0],
					image: null,
				});
			} catch (error) {
				console.error('Error fetching book:', error);
			}
		};
		fetchBook();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (value) data.append(key, value);
		});

		try {
			await fetch(`http://localhost:3000/update-book/${id}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: data,
			});
			navigate('/');
		} catch (error) {
			console.error('Error updating book:', error);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-md">
			<h1 className="text-3xl font-bold mb-6">Update Book</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Same form fields as PostBook */}
				{/* ... */}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Update Book
				</button>
			</form>
		</div>
	);
};

export default UpdateBook;
