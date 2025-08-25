import { useState } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function UploadModal() {
  const { state, dispatch } = useAppContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [dragOver, setDragOver] = useState(false);

  if (!state.isUploadModalOpen) return null;

  const closeModal = () => {
    dispatch({ type: 'CLOSE_UPLOAD_MODAL' });
    setSelectedFile(null);
    setCaption('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedFile(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedFile(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would upload the file and create the post
    console.log('Creating post with:', { selectedFile, caption });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Create new post</h2>
          <button
            onClick={closeModal}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!selectedFile ? (
            // File upload area
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-muted rounded-full">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Drag photos and videos here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share up to 10 photos and videos
                  </p>
                  <label className="ig-btn-primary inline-flex items-center cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Select from computer
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            // Preview and caption
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <img
                  src={selectedFile}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Write a caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="4"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {caption.length}/2,200
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 ig-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 ig-btn-primary"
                >
                  Share
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}