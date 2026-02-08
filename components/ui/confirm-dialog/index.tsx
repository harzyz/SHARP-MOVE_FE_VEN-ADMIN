"use client";

import { Modal } from "@/components/ui/modal";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmColorScheme?: "primary" | "error" | "warning";
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  confirmColorScheme = "primary",
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{message}</p>
      <div className="mt-5 flex gap-3">
        <SharpmoveButton
          variant="outline"
          colorScheme="neutral"
          size="sm"
          className="flex-1"
          onClick={onClose}
        >
          Cancel
        </SharpmoveButton>
        <SharpmoveButton
          colorScheme={confirmColorScheme}
          size="sm"
          className="flex-1"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </SharpmoveButton>
      </div>
    </Modal>
  );
}
