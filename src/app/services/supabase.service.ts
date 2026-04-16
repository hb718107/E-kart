import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://imspedxaoytvjpjzunxo.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltc3BlZHhhb3l0dmpwanp1bnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzE4MjYsImV4cCI6MjA5MTkwNzgyNn0.Rml56cZM4MSYLBJnaCLYumh_C07nV3M2gsYRDQC1oPU';
  
  public client: SupabaseClient;

  constructor() {
    this.client = createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storageKey: 'ekart-auth-token'
      }
    });
  }
}
