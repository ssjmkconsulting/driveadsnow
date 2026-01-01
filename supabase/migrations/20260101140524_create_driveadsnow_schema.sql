/*
  # DriveAdsNow Platform Schema

  ## Overview
  Creates the core database structure for the DriveAdsNow platform that connects 
  advertisers with vehicle owners for mobile advertising campaigns.

  ## New Tables
  
  ### `advertisers`
  Stores advertiser/business information and campaign requirements
  - `id` (uuid, primary key) - Unique identifier
  - `company_name` (text) - Business/company name
  - `contact_name` (text) - Primary contact person
  - `email` (text) - Contact email address
  - `phone` (text) - Contact phone number
  - `campaign_description` (text) - What they want to advertise
  - `budget` (numeric) - Campaign budget
  - `target_locations` (text) - Preferred advertising locations
  - `duration_weeks` (integer) - Campaign duration in weeks
  - `status` (text) - Application status (pending, approved, active, completed)
  - `created_at` (timestamptz) - Record creation timestamp

  ### `vehicles`
  Stores vehicle owner and vehicle information
  - `id` (uuid, primary key) - Unique identifier
  - `owner_name` (text) - Vehicle owner's name
  - `email` (text) - Owner's email address
  - `phone` (text) - Owner's phone number
  - `vehicle_make` (text) - Vehicle manufacturer
  - `vehicle_model` (text) - Vehicle model
  - `vehicle_year` (integer) - Vehicle year
  - `vehicle_color` (text) - Vehicle color
  - `license_plate` (text) - Vehicle license plate
  - `daily_mileage` (integer) - Average daily mileage
  - `primary_routes` (text) - Primary driving routes/areas
  - `availability` (text) - When vehicle is available for ads
  - `status` (text) - Application status (pending, approved, active, unavailable)
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable Row Level Security on both tables
  - Allow public insert for new registrations
  - Allow public read for approved listings
*/

CREATE TABLE IF NOT EXISTS advertisers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  campaign_description text NOT NULL,
  budget numeric NOT NULL,
  target_locations text NOT NULL,
  duration_weeks integer NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  vehicle_year integer NOT NULL,
  vehicle_color text NOT NULL,
  license_plate text NOT NULL,
  daily_mileage integer NOT NULL,
  primary_routes text NOT NULL,
  availability text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE advertisers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert advertisers"
  ON advertisers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view approved advertisers"
  ON advertisers FOR SELECT
  TO anon
  USING (status = 'approved' OR status = 'active');

CREATE POLICY "Anyone can insert vehicles"
  ON vehicles FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view approved vehicles"
  ON vehicles FOR SELECT
  TO anon
  USING (status = 'approved' OR status = 'active');