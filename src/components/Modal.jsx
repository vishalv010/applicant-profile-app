import Dialog from "@mui/material/Dialog";
import { ModalContent } from "./ModalContent";

export const Modal = ({
  open,
  onClose,
  card,
  onApplyChanges,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <ModalContent
        card={card}
        onCancel={onClose}
        onApplyChanges={onApplyChanges}
      />
    </Dialog>
  );
};
