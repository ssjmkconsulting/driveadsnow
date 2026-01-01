import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Advertiser = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  campaign_description: string;
  budget: number;
  target_locations: string;
  duration_weeks: number;
  status: string;
  created_at: string;
};

export type Vehicle = {
  id: string;
  owner_name: string;
  email: string;
  phone: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_color: string;
  license_plate: string;
  daily_mileage: number;
  primary_routes: string;
  availability: string;
  status: string;
  created_at: string;
};
