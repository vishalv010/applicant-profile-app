import Dialog from '@mui/material/Dialog';
import { ModalContent } from './ModalContent';

export const Modal = ({ open, children, onClose }) => {
    return <Dialog
    open={open}
    onClose={onClose}
    maxWidth='xl'
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {children}
  </Dialog>
}
