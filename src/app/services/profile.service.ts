import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

export interface PilotProfile {
  id: string;
  phone: string;
  address: string;
  billing_info: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<PilotProfile | null>(null);
  profile$ = this.profileSubject.asObservable();
  
  private isCompleteSubject = new BehaviorSubject<boolean>(true);
  isComplete$ = this.isCompleteSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    private supabase: SupabaseService,
    private auth: AuthService
  ) {
    this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.fetchProfile(user.id);
      } else {
        this.profileSubject.next(null);
        this.isCompleteSubject.next(true); 
        this.isAdminSubject.next(false);
      }
    });
  }

  async fetchProfile(userId: string) {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      return;
    }

    if (data) {
      this.profileSubject.next(data);
      // CHECK CLEARANCE (ADMIN CHECK)
      this.isAdminSubject.next(data.role === 'ADMIN');
      
      // CHECK COMPLETENESS
      const isComplete = !!(data.phone && data.address);
      this.isCompleteSubject.next(isComplete);
    } else {
      // PROFILE MISSING
      this.isCompleteSubject.next(false);
      this.profileSubject.next(null);
      this.isAdminSubject.next(false);
    }
  }

  async updateProfile(profile: Partial<PilotProfile>) {
    const user = this.auth.getUser();
    if (!user) return null;

    const { data, error } = await this.supabase.client
      .from('profiles')
      .upsert({
        id: user.id,
        ...profile
      });

    if (error) throw error;
    
    await this.fetchProfile(user.id);
    return data;
  }

  getProfile(): PilotProfile | null {
    return this.profileSubject.value;
  }
}
