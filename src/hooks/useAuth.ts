import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Auth } from '../types/auth';

export default function useAuth(): Auth {
    return useContext(AuthContext);
}
