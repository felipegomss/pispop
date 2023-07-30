// components/ModalPopup.tsx
import React, { ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: ReactNode;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-opacity-50 bg-black flex overflow-y-scroll"
      className="m-auto md:p-4 rounded-lg outline-none"
    >
      {children}
    </ReactModal>
  );
};

export default ModalPopup;
