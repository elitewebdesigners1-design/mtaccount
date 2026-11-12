CREATE OR REPLACE FUNCTION public.submit_booking_request(
  p_id uuid, p_first_name text, p_last_name text, p_email text, p_phone text,
  p_preferred_date date, p_preferred_time time, p_service text, p_notes text
) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_ref text;
BEGIN
  INSERT INTO public.booking_requests (id, first_name, last_name, email, phone, preferred_date, preferred_time, service, notes)
  VALUES (p_id, trim(p_first_name), trim(p_last_name), lower(trim(p_email)), regexp_replace(p_phone, '[\s\-()]', '', 'g'),
          p_preferred_date, p_preferred_time, p_service, coalesce(trim(p_notes), ''))
  ON CONFLICT (id) DO NOTHING;
  SELECT reference INTO v_ref FROM public.booking_requests
   WHERE id = p_id AND lower(email) = lower(trim(p_email)) AND created_at > now() - interval '1 hour';
  RETURN v_ref;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_booking_request(uuid,text,text,text,text,date,time,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_booking_request(uuid,text,text,text,text,date,time,text,text) TO anon, authenticated;