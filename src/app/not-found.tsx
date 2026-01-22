import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h2 className="font-serif text-6xl md:text-8xl text-primary mb-6">404</h2>
      <h3 className="text-2xl md:text-3xl font-medium mb-4">Page Not Found</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Return Home
      </Link>
    </div>
  );
}
