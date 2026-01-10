'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, PlusCircle, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/locations',
    label: 'Explore',
    icon: Compass,
  },
  {
    href: '/adventures/new',
    label: 'Log',
    icon: PlusCircle,
    primary: true,
  },
  {
    href: '/leaderboard',
    label: 'Ranks',
    icon: Trophy,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center group relative -mt-8"
              >
                <div className="bg-gradient-to-r from-forest-mid to-forest-light p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-forest-mid mt-2">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-2 transition-colors group',
                isActive ? 'text-forest-mid' : 'text-slate-600'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6 transition-colors',
                  isActive ? 'text-forest-mid' : 'text-slate-400 group-hover:text-slate-600'
                )}
              />
              <span
                className={cn(
                  'text-xs mt-1 transition-colors font-medium',
                  isActive ? 'text-forest-mid' : 'text-slate-600 group-hover:text-slate-900'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
