import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Star, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-browning-charcoal border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Browning's Welding"
              width={200}
              height={67}
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 text-lg mb-4">
              Faith, Family, & Fabrication — Since 1972
            </p>
            <div className="flex items-center gap-2 text-white">
              <span className="text-2xl">🇺🇸</span>
              <span className="font-semibold">Made in the USA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-browning-red transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-browning-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#team" className="text-gray-400 hover:text-browning-red transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-browning-red transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={18} className="text-browning-red flex-shrink-0 mt-0.5" />
                <span>163 Shaw Bridge Rd,<br />Greenbrier, AR 72058</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} className="text-browning-red flex-shrink-0" />
                <a href="tel:+15016792184" className="hover:text-browning-red transition-colors">
                  (501) 679-2184
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} className="text-browning-red flex-shrink-0" />
                <a href="mailto:info@browningswelding.com" className="hover:text-browning-red transition-colors">
                  info@browningswelding.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/browningswelding"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-browning-red p-2.5 rounded-full transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/browningswelding/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-browning-red p-2.5 rounded-full transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.yelp.com/biz/brownings-welding-and-fabrication-greenbrier-3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-browning-red p-2.5 rounded-full transition-colors text-white"
                aria-label="Yelp"
              >
                <Star size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Browning&apos;s Welding & Fabrication. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Manufacturing Excellence • Home Grown Values
          </p>
        </div>
      </div>
    </footer>
  );
}
