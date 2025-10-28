-- Create wishlists table for user template wishlist functionality
CREATE TABLE public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  template_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, template_id)
);

-- Enable Row Level Security
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Create policies for wishlists
CREATE POLICY "Users can view their own wishlists" 
ON public.wishlists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own wishlist" 
ON public.wishlists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own wishlist" 
ON public.wishlists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update templates table with random download counts
UPDATE public.templates 
SET download_count = CASE 
  WHEN title = 'Pitch Deck Template' THEN 1247
  WHEN title = 'NDA Template' THEN 892
  WHEN title = 'ESOP Policy Template' THEN 563
  WHEN title = 'Financial Model Template' THEN 1134
  ELSE FLOOR(RANDOM() * 1500 + 100)
END;