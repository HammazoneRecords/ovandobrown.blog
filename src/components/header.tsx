

'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/knowledge-base', label: 'OBKB' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="group sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
           <Image 
            src="https://firebasestorage.googleapis.com/v0/b/orbital-narratives.firebasestorage.app/o/f6ffc474-5817-4025-9db9-689b6455913b_removalai_preview.png?alt=media&token=5f9efeb3-2c5d-47d1-8f6a-300d40483e89"
            alt="Site Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-headline text-lg font-bold">ovandoBrown.blog</span>
        </Link>
        <div className="flex items-center gap-2">
            <nav className="hidden md:flex gap-4">
                 {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X/> : <Menu/>}
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>
        </div>
      </div>
       {isMenuOpen && (
        <div className="md:hidden">
            <nav className="flex flex-col items-center gap-4 p-4">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
      )}
    </header>
  );
}
