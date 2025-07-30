'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  // Tarik langsung "tarif" sebagai default aktif
  const [activeSection, setActiveSection] = useState('tarif');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          const id = section.getAttribute('id');
          if (id) current = id;
        }
      });

      // Update jika current ditemukan
      if (current) setActiveSection(current);
    };

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

  return (
    <nav className="hidden md:flex fixed top-0 w-full z-50 bg-white shadow-md px-8 py-4 justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="https://www.dakotacargo.co.id/images/main-logo.png"
          alt="Logo Dakota"
          width={200}
          height={100}
        />
      </div>

      {/* Menu */}
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`text-sm font-medium px-4 py-2 rounded transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-red-700 text-white'
                  : 'text-gray-700 hover:bg-red-100'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
