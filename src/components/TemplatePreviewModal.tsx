import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  file_type: string;
  file_url: string;
  category: string;
  is_premium: boolean;
}

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (template: Template) => void;
  isDownloading?: boolean;
}

const TemplatePreviewModal = ({
  template,
  isOpen,
  onClose,
  onDownload,
  isDownloading = false,
}: TemplatePreviewModalProps) => {
  if (!template) return null;

  const getPreviewContent = () => {
    if (!template.file_url) {
      return <p className="text-center text-gray-500">No preview available.</p>;
    }

    const fileType = template.file_type?.toLowerCase();
    if (fileType?.includes("pdf")) {
      return (
        <iframe
          src={template.file_url}
          className="w-full h-[500px] border rounded-lg"
          title="Document Preview"
        />
      );
    }

    if (fileType?.includes("image")) {
      return (
        <img
          src={template.file_url}
          alt={template.title}
          className="w-full max-h-[500px] object-contain rounded-lg border"
        />
      );
    }


    return (
      <div className="text-center text-gray-500 py-8">
        <p>Preview not available for this file type.</p>
        <Button
          variant="outline"
          onClick={() => window.open(template.file_url, "_blank")}
          className="mt-3"
        >
          <ExternalLink className="h-4 w-4 mr-2" /> View Full Document
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-semibold">
                {template.title}
              </DialogTitle>
              <Badge variant={template.is_premium ? "default" : "secondary"}>
                {template.is_premium ? "Premium" : "Free"}
              </Badge>
            </div>
          </div>

          <DialogDescription className="text-left">
            {template.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {getPreviewContent()}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(template.file_url, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Document
            </Button>
            <Button
              onClick={() => onDownload(template)}
              disabled={isDownloading}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download Template"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
