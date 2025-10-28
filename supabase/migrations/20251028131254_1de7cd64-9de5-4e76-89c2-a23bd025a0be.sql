-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  published BOOLEAN DEFAULT false NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  "order" INTEGER NOT NULL,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  progress_percentage INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create templates table
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT false NOT NULL,
  download_count INTEGER DEFAULT 0 NOT NULL,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create wishlists table
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.templates(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, template_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Categories RLS policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Courses RLS policies
CREATE POLICY "Published courses are viewable by everyone" ON public.courses FOR SELECT USING (published = true OR auth.uid() = creator_id);
CREATE POLICY "Users can create courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their own courses" ON public.courses FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete their own courses" ON public.courses FOR DELETE USING (auth.uid() = creator_id);

-- Lessons RLS policies
CREATE POLICY "Lessons are viewable for published courses" ON public.lessons FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND (courses.published = true OR courses.creator_id = auth.uid()))
);
CREATE POLICY "Course creators can manage lessons" ON public.lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND courses.creator_id = auth.uid())
);

-- User progress RLS policies
CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- User achievements RLS policies
CREATE POLICY "Users can view their own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Templates RLS policies
CREATE POLICY "Templates are viewable by everyone" ON public.templates FOR SELECT USING (true);
CREATE POLICY "Users can create templates" ON public.templates FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their own templates" ON public.templates FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete their own templates" ON public.templates FOR DELETE USING (auth.uid() = creator_id);

-- Wishlists RLS policies
CREATE POLICY "Users can view their own wishlist" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to their wishlist" ON public.wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from their wishlist" ON public.wishlists FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_courses_category ON public.courses(category_id);
CREATE INDEX idx_courses_creator ON public.courses(creator_id);
CREATE INDEX idx_courses_published ON public.courses(published);
CREATE INDEX idx_lessons_course ON public.lessons(course_id);
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_course ON public.user_progress(course_id);
CREATE INDEX idx_wishlists_user ON public.wishlists(user_id);
CREATE INDEX idx_templates_category ON public.templates(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.user_progress FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.templates FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();