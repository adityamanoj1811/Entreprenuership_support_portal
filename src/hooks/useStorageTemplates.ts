import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

export function useStorageTemplates() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilesWithMetadata = async () => {
      setLoading(true);

      try {
        // 1️⃣ Fetch file list from Supabase Storage
        const { data: storageFiles, error: storageError } = await supabase.storage
          .from("Templates")
          .list("uploads", { limit: 100 });

        if (storageError) throw storageError;
        if (!storageFiles || storageFiles.length === 0) {
          setFiles([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch metadata from `templates` table
        const { data: dbTemplates, error: dbError } = await supabase
          .from("templates")
          .select("*");

        if (dbError) throw dbError;

        // 3️⃣ Combine storage files with metadata by matching file name or URL
        const combined = storageFiles.map((file) => {
          const matchingMeta = dbTemplates.find((t) =>
            t.file_url.includes(file.name)
          );

          const { data: urlData } = supabase.storage
            .from("Templates")
            .getPublicUrl(`uploads/${file.name}`);

          return {
            id: matchingMeta?.id || file.id || file.name,
            title: matchingMeta?.title || file.name,
            description: matchingMeta?.description || "Admin uploaded document",
            url: urlData?.publicUrl ?? "",
            file_url: (matchingMeta?.file_url || urlData?.publicUrl) ?? "",
            file_type: matchingMeta?.file_type || file.name.split(".").pop()?.toUpperCase(),
            category: matchingMeta?.category || "Business",
            is_premium: matchingMeta?.is_premium || false,
            access: matchingMeta?.is_premium ? "premium" : "free",
            downloads: matchingMeta?.download_count || 0,
            author: "Admin Upload",
            thumbnail: matchingMeta?.thumbnail_url || "bg-gradient-to-r from-green-400 to-blue-500",
            created_at: matchingMeta?.created_at || file.created_at || "",
            updated_at: matchingMeta?.updated_at || "",
          };
        });

        setFiles(combined);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilesWithMetadata();
  }, []);

  return { files, loading };
}
