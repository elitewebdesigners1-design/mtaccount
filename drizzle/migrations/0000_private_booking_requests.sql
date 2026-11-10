CREATE TABLE public.booking_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 reference text NOT NULL UNIQUE DEFAULT ('MT-' || upper(replace(gen_random_uuid()::text, '-', ''))),
 first_name text NOT NULL CHECK (length(trim(first_name)) BETWEEN 1 AND 100),
 last_name text NOT NULL CHECK (length(trim(last_name)) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (length(email) <= 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 phone text NOT NULL CHECK (phone ~ '^\+?[0-9]{9,15}$'),
 preferred_date date NOT NULL,
 preferred_time time NOT NULL CHECK (preferred_time >= '08:30'::time AND preferred_time <= '17:00'::time AND extract(second from preferred_time)=0 AND extract(minute from preferred_time) IN (0,30)),
 service text NOT NULL CHECK (service IN ('Accounting & Bookkeeping','Tax Consultancy','Pre-Audit','Business Advisory','Company Formation','Payroll & HR','Asset Valuations')),
 notes text NOT NULL DEFAULT '' CHECK (length(notes) <= 2000),
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','declined','cancelled','completed')),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK (extract(isodow from preferred_date) BETWEEN 1 AND 5)
);
GRANT INSERT (id, first_name,last_name,email,phone,preferred_date,preferred_time,service,notes) ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit pending requests only" ON public.booking_requests FOR INSERT TO anon, authenticated WITH CHECK (status='pending');
CREATE INDEX booking_requests_review_idx ON public.booking_requests(status, created_at DESC);
CREATE INDEX booking_requests_date_idx ON public.booking_requests(preferred_date, preferred_time);
CREATE FUNCTION public.validate_booking_request() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF TG_OP='INSERT' THEN
  IF NEW.preferred_date < (now() AT TIME ZONE 'Africa/Addis_Ababa')::date OR (NEW.preferred_date=(now() AT TIME ZONE 'Africa/Addis_Ababa')::date AND NEW.preferred_time <= (now() AT TIME ZONE 'Africa/Addis_Ababa')::time) THEN
   RAISE EXCEPTION 'Choose a future weekday appointment in Africa/Addis_Ababa';
  END IF;
  NEW.status := 'pending'; NEW.created_at := now();
 END IF;
 NEW.updated_at := now(); RETURN NEW;
END;
$$;
CREATE TRIGGER booking_request_validation BEFORE INSERT OR UPDATE ON public.booking_requests FOR EACH ROW EXECUTE FUNCTION public.validate_booking_request();