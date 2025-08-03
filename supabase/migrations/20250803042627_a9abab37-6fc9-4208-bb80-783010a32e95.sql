-- Create storage bucket for templates
INSERT INTO storage.buckets (id, name, public) VALUES ('templates', 'templates', true);

-- Create storage policies for templates
CREATE POLICY "Templates are publicly viewable" ON storage.objects FOR SELECT USING (bucket_id = 'templates');
CREATE POLICY "Admins can upload templates" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'templates' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update templates" ON storage.objects FOR UPDATE USING (
  bucket_id = 'templates' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete templates" ON storage.objects FOR DELETE USING (
  bucket_id = 'templates' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Add trigger to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update templates with actual file URLs (sample templates)
UPDATE public.templates SET 
  file_url = 'https://nmjgdymljufvayfvtwpl.supabase.co/storage/v1/object/public/templates/pitch-deck-template.pdf'
WHERE title = 'Pitch Deck Template';

UPDATE public.templates SET 
  file_url = 'https://nmjgdymljufvayfvtwpl.supabase.co/storage/v1/object/public/templates/nda-template.pdf'
WHERE title = 'NDA Template';

UPDATE public.templates SET 
  file_url = 'https://nmjgdymljufvayfvtwpl.supabase.co/storage/v1/object/public/templates/esop-policy-template.pdf'
WHERE title = 'ESOP Policy Template';

UPDATE public.templates SET 
  file_url = 'https://nmjgdymljufvayfvtwpl.supabase.co/storage/v1/object/public/templates/financial-model-template.xlsx'
WHERE title = 'Financial Model Template';