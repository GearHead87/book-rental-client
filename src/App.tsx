import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostBook from './pages/PostBook';
import UpdateBook from './pages/UpdateBook';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="min-h-screen bg-gray-50">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/post-book"
							element={
								<ProtectedRoute>
									<PostBook />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/update-book/:id"
							element={
								<ProtectedRoute>
									<UpdateBook />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
