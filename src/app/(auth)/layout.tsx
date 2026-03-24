import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-base px-6">
      {/* Branding */}
      <Link href="/" className="mb-10 text-center">
        <p className="text-xs font-body font-medium tracking-widest uppercase text-acid">
          Portfolio Review
        </p>
        <p className="text-sm text-ink-muted mt-1">AI-Powered Feedback</p>
      </Link>

      {/* Auth card */}
      <div className="w-full max-w-sm">{children}</div>

      {/* Footer link */}
      <p className="mt-8 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink-secondary transition-colors duration-fast">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
