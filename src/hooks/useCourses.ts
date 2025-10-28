import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useCourses = (filters?: {
  category?: string;
  difficulty?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select(`
          *,
          categories:category_id(name),
          lessons(id, title, duration, order)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (filters?.category && filters.category !== 'all') {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', filters.category)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      if (filters?.difficulty && filters.difficulty !== 'all') {
        query = query.eq('difficulty', filters.difficulty);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCourse = (courseId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const { data: course, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories:category_id(name),
          lessons(
            id,
            title,
            content,
            video_url,
            duration,
            order
          ),
          profiles:creator_id(full_name, avatar_url, bio)
        `)
        .eq('id', courseId)
        .single();

      if (error) throw error;

      // Get user progress if authenticated
      let userProgress = null;
      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('course_id', courseId)
          .eq('user_id', user.id);
        
        userProgress = progressData || [];
      }

      return {
        ...course,
        lessons: course.lessons?.sort((a, b) => a.order - b.order) || [],
        userProgress
      };
    },
    enabled: !!courseId,
  });
};

export const useUpdateProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      courseId, 
      lessonId, 
      progressPercentage = 0 
    }: { 
      courseId: string; 
      lessonId?: string; 
      progressPercentage?: number;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          progress_percentage: progressPercentage,
          completed: progressPercentage === 100
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
};