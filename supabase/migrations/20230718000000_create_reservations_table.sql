
-- Create the reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  guests TEXT NOT NULL,
  message TEXT,
  reservation_type TEXT NOT NULL,
  event_type TEXT,
  attendees TEXT,
  event_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Add any other fields you might want for your reservation system
  status TEXT DEFAULT 'pending',
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policy for admins (you would need to define who is an admin)
CREATE POLICY "Admins can do everything" 
  ON public.reservations 
  FOR ALL 
  TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create policy for Edge Functions to insert
CREATE POLICY "Edge Functions can insert" 
  ON public.reservations 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create an index on date for faster queries
CREATE INDEX reservations_date_idx ON public.reservations (date);
