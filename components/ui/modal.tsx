import React, { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalSteps?: number;
  isEditing?: boolean;
}

const Modal = ({
  title,
  body,
  footer,
  isOpen,
  onClose,
  step,
  totalSteps,
  isEditing,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent
        className={cn(
          "sm:max-w-[425px]",
          isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto"
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-6">
          {/* <button className="p-1 border-0  hover:opacity-70 transition w-fit">
            <X size={28} onClick={onClose} />
          </button> */}
          {step && totalSteps && (
            <div className="">
              Step {step} of {totalSteps}
            </div>
          )}
        </div>
        <div className="">{body}</div>
        <DialogFooter className="text-sm">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
