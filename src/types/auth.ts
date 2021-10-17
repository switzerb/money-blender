export interface AppUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
}

export interface Auth {
    user: AppUser | null;
    signIn: (cb: () => void) => void;
    signOut: (cb: () => void) => void;
    authenticated: boolean;
    loading?: boolean;
}
