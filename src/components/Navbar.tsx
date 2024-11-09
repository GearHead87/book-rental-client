import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// src/components/Navbar.tsx
const Navbar = () => {
	const { token, logout } = useAuth();

	return (
		<nav className="bg-blue-600 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-white text-xl font-bold">
					Book Rental
				</Link>
				<div className="space-x-4">
					<Link to="/" className="text-white">
						Home
					</Link>
					{token ? (
						<>
							<Link to="/post-book" className="text-white">
								Post Book
							</Link>
							<button onClick={logout} className="text-white">
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login" className="text-white">
								Login
							</Link>
							<Link to="/register" className="text-white">
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
