"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

const openDialogIds: string[] = [];

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) {
      returnFocusRef.current?.focus();
      return;
    }
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    openDialogIds.push(dialogId);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (openDialogIds.at(-1) !== dialogId) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      const index = openDialogIds.lastIndexOf(dialogId);
      if (index >= 0) openDialogIds.splice(index, 1);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogId, open]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/45 p-0 sm:items-center sm:justify-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && openDialogIds.at(-1) === dialogId)
          onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full max-w-2xl rounded-t-3xl border border-(--line) bg-(--surface) shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-(--line) px-5 py-4 sm:px-7">
          <h2 id={titleId} className="display text-2xl">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Fechar janela"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-(--surface-muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-7">
          {description && (
            <p id={descriptionId} className="sr-only">
              {description}
            </p>
          )}
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
}
