import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useDownloadTemplate = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (template: any) => {
      // Increment download count
      const { error: updateError } = await supabase
        .from('templates')
        .update({ download_count: template.download_count + 1 })
        .eq('id', template.id);
      
      if (updateError) throw updateError;

      // Download the file
      if (template.file_url) {
        const link = document.createElement('a');
        link.href = template.file_url;
        link.download = `${template.title}.${template.file_type?.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download started",
          description: `${template.title} is downloading...`,
        });
      } else {
        toast({
          title: "Download unavailable",
          description: "This template file is not available for download yet.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};