
import { useState } from "react";

interface UseLeadCaptureProps {
  source?: string;
  productInterest?: string;
}

export const useLeadCapture = ({ source = "general", productInterest = "psyllium-husk" }: UseLeadCaptureProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
    source,
    productInterest,
  };
};
