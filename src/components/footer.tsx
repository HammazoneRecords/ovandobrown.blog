import Link from 'next/link';

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/knowledge-base', label: 'OBKB' },
    { href: '/about', label: 'About' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ovandoBrown.blog. All rights reserved.
        </p>
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
