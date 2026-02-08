export interface AdminStubViewProps {
  title: string;
  description: string;
}

export function AdminStubView({ title, description }: AdminStubViewProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground sm:text-xl">{title}</h1>
      <div className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-12 text-foreground-muted/40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17l-5.1-3.06a.75.75 0 010-1.28l5.1-3.06a.75.75 0 01.76 0l5.1 3.06a.75.75 0 010 1.28l-5.1 3.06a.75.75 0 01-.76 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.95 17l7.24 4.35a.75.75 0 00.76 0L19.19 17"
          />
        </svg>
        <h2 className="mt-4 text-base font-semibold text-foreground-muted">Coming Soon</h2>
        <p className="mt-1.5 max-w-sm text-sm text-foreground-muted/70">{description}</p>
      </div>
    </div>
  );
}
