import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/types';

interface AuthContextType {
	token: string | null;
	user: User | null;
	login: (token: string, user: User) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
	const [user, setUser] = useState<User | null>(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});

	// Optional: Verify token and user on mount
	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		const savedUser = localStorage.getItem('user');

		if (savedToken && savedUser) {
			setToken(savedToken);
			setUser(JSON.parse(savedUser));
		} else {
			// If either token or user is missing, clear both
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			setToken(null);
			setUser(null);
		}
	}, []);

	const login = (token: string, user: User) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));
		setToken(token);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
