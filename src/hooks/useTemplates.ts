import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching templates:", error);
        throw error;
      }

      return data;
    },
  });
};

export const useDownloadTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (template: any) => {
      try {
        // Increment download count
        const { error: updateError } = await supabase
          .from("templates")
          .update({ download_count: template.download_count + 1 })
          .eq("id", template.id);

        if (updateError) {
          console.error("Error updating download count:", updateError);
        }

        // Create a download link and trigger download
        const response = await fetch(template.file_url);
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        
        // Get file extension from file_type or URL
        const extension = template.file_type?.toLowerCase() === "xlsx" ? "xlsx" : 
                         template.file_type?.toLowerCase() === "docx" ? "docx" : "pdf";
        
        link.download = `${template.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success(`${template.title} downloaded successfully!`);
        
        // Refresh templates to show updated download count
        queryClient.invalidateQueries({ queryKey: ["templates"] });
        
        return template;
      } catch (error) {
        console.error("Download error:", error);
        toast.error("Failed to download template. Please try again.");
        throw error;
      }
    },
  });
};