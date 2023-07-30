"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <header className="bg-slate-50 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <a href="/" className="flex gap-2 items-center">
            <Image
              src={"/icon.png"}
              width={50}
              height={50}
              alt=""
              className="rounded-full"
            />
            <h1 className="hidden md:block text-blue-800 text-3xl font-extrabold font-poppins">
              PsiPop
            </h1>
          </a>
          <div className="md:hidden">
            <Menu
              className="w-6 h-6 text-blue-800 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>
        <nav
          className={isMenuOpen ? "block md:block w-full" : "hidden md:block"}
        >
          <ul className="flex flex-col md:flex-row gap-4 my-4">
            <li className="hover:scale-105 duration-500 ease-in-out">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSehJC4-nWoHTiUFJSYWoE1i6l8j4olLnuJALYremmku3hjFFQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-800 hover:pb-1 whitespace-nowrap transition-all transform font-semibold"
              >
                Junte-se a nós
              </a>
            </li>
            <li className="hover:scale-105 duration-500 ease-in-out">
              <Link
                href="/quem-somos"
                className="text-blue-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-800 hover:pb-1 whitespace-nowrap transition-all transform font-semibold"
              >
                Quem Somos
              </Link>
            </li>
            <li className="hover:scale-105 duration-500 ease-in-out">
              <Link
                href="/equipe"
                className="text-blue-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-800 hover:pb-1 whitespace-nowrap transition-all transform font-semibold"
              >
                Nossa equipe
              </Link>
            </li>
            <li className="hover:scale-105 duration-500 ease-in-out">
              <Link
                href="/contato"
                className="text-blue-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-800 hover:pb-1 whitespace-nowrap transition-all transform font-semibold"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
