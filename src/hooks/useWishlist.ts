import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("wishlists")
        .select("template_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return data.map(item => item.template_id);
    },
    enabled: !!user,
  });

  const addToWishlist = useMutation({
    mutationFn: async (templateId: string) => {
      if (!user) throw new Error("Must be logged in");

      const { error } = await supabase
        .from("wishlists")
        .insert({
          user_id: user.id,
          template_id: templateId,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Added to wishlist");
    },
    onError: (error) => {
      toast.error("Failed to add to wishlist");
      console.error("Wishlist error:", error);
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (templateId: string) => {
      if (!user) throw new Error("Must be logged in");

      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("template_id", templateId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from wishlist");
    },
    onError: (error) => {
      toast.error("Failed to remove from wishlist");
      console.error("Wishlist error:", error);
    },
  });

  const isInWishlist = (templateId: string) => {
    return wishlistItems.includes(templateId);
  };

  const toggleWishlist = (templateId: string) => {
    if (!user) {
      toast.error("Please sign in to use wishlist");
      return;
    }

    if (isInWishlist(templateId)) {
      removeFromWishlist.mutate(templateId);
    } else {
      addToWishlist.mutate(templateId);
    }
  };

  return {
    wishlistItems,
    isLoading,
    isInWishlist,
    toggleWishlist,
    addToWishlist: addToWishlist.mutate,
    removeFromWishlist: removeFromWishlist.mutate,
  };
};