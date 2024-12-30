import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

const DeleteCompanyDialog = ({ open, onClose, onConfirm }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this company?
          </DialogDescription>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="primary">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCompanyDialog;
