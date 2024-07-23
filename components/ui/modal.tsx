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
import { motion } from "framer-motion";

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
        <DialogContent
          className={cn(
            "sm:max-w-[425px] rounded-md",
            isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto"
          )}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-6">
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
