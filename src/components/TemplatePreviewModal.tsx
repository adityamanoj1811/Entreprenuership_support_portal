import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Download, ExternalLink } from "lucide-react";

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
    const fileType = template.file_type?.toLowerCase();
    
    if (fileType === "pdf") {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">PDF Preview</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{template.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {template.title.includes("Pitch Deck") && "10 slides covering problem, solution, market, traction, financials..."}
              {template.title.includes("NDA") && "Standard non-disclosure agreement with customizable terms..."}
            </p>
            <div className="text-xs text-gray-500">
              Sample pages shown • Full document available after download
            </div>
          </div>
        </div>
      );
    }
    
    if (fileType === "xlsx") {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
            <div className="h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Excel Preview</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{template.title}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-100 p-2 rounded text-xs">Revenue</div>
              <div className="bg-gray-100 p-2 rounded text-xs">Costs</div>
              <div className="bg-gray-100 p-2 rounded text-xs">Profit</div>
              <div className="bg-blue-100 p-2 rounded text-xs">Year 1</div>
              <div className="bg-blue-100 p-2 rounded text-xs">Year 2</div>
              <div className="bg-blue-100 p-2 rounded text-xs">Year 3</div>
            </div>
            <div className="text-xs text-gray-500">
              Complete 5-year financial model with formulas
            </div>
          </div>
        </div>
      );
    }
    
    // Default for DOCX and others
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Document Preview</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">{template.title}</h3>
          <div className="space-y-2 mb-4">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="text-xs text-gray-500">
            {template.title.includes("ESOP") && "Complete employee stock option policy with legal clauses..."}
            {!template.title.includes("ESOP") && "Professional document template ready for customization..."}
          </div>
        </div>
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
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-left">
            {template.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {getPreviewContent()}
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What's included:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {template.title.includes("Pitch Deck") && (
                <>
                  <li>• 10 professionally designed slides</li>
                  <li>• Editable PowerPoint format</li>
                  <li>• Sample content and guidance notes</li>
                  <li>• Multiple color themes</li>
                </>
              )}
              {template.title.includes("NDA") && (
                <>
                  <li>• Mutual and one-way NDA options</li>
                  <li>• Customizable terms and duration</li>
                  <li>• Legal compliance for Indian law</li>
                  <li>• Easy-to-edit Word format</li>
                </>
              )}
              {template.title.includes("Financial Model") && (
                <>
                  <li>• 5-year financial projections</li>
                  <li>• Revenue and expense forecasting</li>
                  <li>• Cash flow analysis</li>
                  <li>• Scenario planning tools</li>
                </>
              )}
              {template.title.includes("ESOP") && (
                <>
                  <li>• Complete policy framework</li>
                  <li>• Vesting schedule templates</li>
                  <li>• Legal compliance guidelines</li>
                  <li>• Implementation checklist</li>
                </>
              )}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open(template.file_url, '_blank')}
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