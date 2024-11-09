// src/types/types.ts
export interface Book {
	id: number;
	book_name: string;
	author: string;
	published_date: string;
	posted_date: string;
	image_path: string;
	rented: boolean;
	user_name: string;
	user_id: number;
}

export interface User {
	id: number;
	name: string;
	email: string;
}
