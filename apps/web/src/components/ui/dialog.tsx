"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type DialogProps = { open: boolean; onClose: () => void; title: string; children: ReactNode };

export function Dialog({ open, onClose, title, children }: DialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) { returnFocusRef.current?.focus(); return; }
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end bg-black/45 p-0 sm:items-center sm:justify-center sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="w-full max-w-2xl rounded-t-3xl border border-(--line) bg-(--surface) shadow-2xl sm:rounded-3xl"><div className="flex items-center justify-between border-b border-(--line) px-5 py-4 sm:px-7"><h2 id="dialog-title" className="display text-2xl">{title}</h2><button ref={closeButtonRef} type="button" aria-label="Fechar prévia" onClick={onClose} className="inline-flex size-10 items-center justify-center rounded-full hover:bg-(--surface-muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"><X aria-hidden="true" size={19} /></button></div><div className="max-h-[75vh] overflow-y-auto p-5 sm:p-7">{children}</div></section></div>;
}
