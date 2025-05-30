import {ReactElement, ReactNode} from 'react';

export default function ProtectedRoute({ children }: { children: ReactElement }) {
	// Use the authentication provider to redirect to login if user is not logged
	return children;
}