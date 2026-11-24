"use client";

import { useI18n } from "@/lib/i18n/provider";

export function AnnouncementBar() {
  const t = useI18n().t.announcement;
  return (
    <div className="flex h-9 items-center justify-center bg-ink px-gutter text-center text-bone">
      <p className="truncate text-label uppercase">
        <span>{t.primary}</span>
        <span aria-hidden="true" className="mx-3 hidden sm:inline">·</span>
        <span className="hidden sm:inline">{t.secondary}</span>
      </p>
    </div>
  );
}
