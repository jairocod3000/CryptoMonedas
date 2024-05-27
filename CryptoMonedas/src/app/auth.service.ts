import { Injectable } from '@angular/core';
import { Router } from '@angular/router';  
import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut,
  onAuthStateChanged, User, updateProfile
} from 'firebase/auth';
import { firebaseConfig } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  public user: User | null = null;

  constructor(private router: Router) {  
    onAuthStateChanged(this.auth, user => {
      this.user = user ? user : null;
    });
  }

  
  async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/']);  // Navegar al inicio
    } catch (error) {
      console.error('Error signing in with email and password', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        this.user = userCredential.user;
        this.router.navigate(['/']);  // Navegar al inicio
      }
    } catch (error) {
      console.error('Error registering with email and password', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/']);  // Navegar al inicio
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  }

  async signInWithGitHub(): Promise<void> {
    try {
      await signInWithPopup(this.auth, new GithubAuthProvider());
      this.router.navigate(['/']);  // Navegar al inicio
    } catch (error) {
      console.error('Error signing in with GitHub', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);  // Navegar a la página de inicio de sesión después de cerrar sesión
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
