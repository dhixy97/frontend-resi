'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home'; // default

      const scrollY = window.scrollY + 150;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (id && scrollY >= top && scrollY < top + height) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll(); // jalankan sekali saat mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tarif', label: 'Cek Tarif' },
    { id: 'group', label: 'Dakota Group' },
    { id: 'cabang', label: 'Cabang' },
    { id: 'kontak', label: 'Hubungi Kami' },
    { id: 'costumer', label: 'Our Costumer' },
  ];

  const handleClick = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="hidden md:flex fixed top-0 w-full z-50 bg-white shadow-md px-8 py-4 justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/main-logo.webp" alt="Logo Dakota" width={200} height={100} />
      </Link>

      {/* Menu */}
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`text-sm font-medium px-4 py-2 rounded transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-red-700 text-white'
                  : 'text-gray-700 hover:bg-red-100'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
