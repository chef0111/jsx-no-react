/* @jsx createElement */
import { createElement } from '../../jsx-runtime';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: any;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // STEP 1: Return null if not open
  if (!isOpen) {
    return null;
  }

  // STEP 3: Handle click outside to close
  const handleOverlayClick = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  // STEP 2: Create overlay and modal content
  return (
    <div 
      className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-background border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          {title ? (
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          ) : null}
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
        <div className="p-6 text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
