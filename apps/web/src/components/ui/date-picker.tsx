"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type DatePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function DatePicker({ id, label, value, onChange }: DatePickerProps) {
  const selectedDate = fromIsoDate(value);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );
  const firstDay = visibleMonth.getDay();
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const today = toIsoDate(new Date());
  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);

  function selectDate(day: number) {
    const nextDate = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      day,
    );
    onChange(toIsoDate(nextDate));
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className="mt-2 flex min-h-12 w-full items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-3 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
      >
        {new Intl.DateTimeFormat("pt-BR").format(selectedDate)}
        <CalendarDays
          aria-hidden="true"
          size={17}
          className="text-(--ink-muted)"
        />
      </button>
      {isOpen && (
        <section
          role="dialog"
          aria-label="Escolher data"
          className="z-30 mt-2 w-full rounded-2xl border border-(--line) bg-(--surface) p-3 shadow-xl sm:absolute sm:w-80"
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Mês anterior"
              onClick={() =>
                setVisibleMonth(
                  (month) =>
                    new Date(month.getFullYear(), month.getMonth() - 1, 1),
                )
              }
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-(--surface-muted)"
            >
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <p className="text-sm font-semibold capitalize">{monthLabel}</p>
            <button
              type="button"
              aria-label="Próximo mês"
              onClick={() =>
                setVisibleMonth(
                  (month) =>
                    new Date(month.getFullYear(), month.getMonth() + 1, 1),
                )
              }
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-(--surface-muted)"
            >
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
            {weekdays.map((weekday, index) => (
              <span
                key={`${weekday}-${index}`}
                className="py-1 font-semibold text-(--ink-muted)"
              >
                {weekday}
              </span>
            ))}
            {Array.from({ length: firstDay }).map((_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
              (day) => {
                const date = new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth(),
                  day,
                );
                const isoDate = toIsoDate(date);
                const selected = isoDate === value;
                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectDate(day)}
                    className={`inline-flex size-9 items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${selected ? "bg-(--action-bg) text-(--action-fg)" : "hover:bg-(--surface-muted)"}`}
                  >
                    {day}
                  </button>
                );
              },
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(today);
              setVisibleMonth(fromIsoDate(today));
              setIsOpen(false);
            }}
            className="mt-3 min-h-10 text-xs font-semibold text-(--accent) hover:underline"
          >
            Hoje
          </button>
        </section>
      )}
    </div>
  );
}
