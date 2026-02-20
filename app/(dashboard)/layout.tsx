// app/(dashboard)/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import {
  LogOut,
  Home,
  Leaf,
  Sparkles,
  Shield,
  CheckSquare,
  Gift,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { protocolData } from '@/lib/data';
import { DashboardLayoutSkeleton } from '@/components/skeletons/dashboard-layout-skeleton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [userProgress, setUserProgress] = useState<{ [key: number]: boolean }>({});
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email || '');

      if (data.user?.id) {
        // Fetch user progress
        const { data: progress } = await supabase
          .from('UserProgress')
          .select('day, completed')
          .eq('userId', data.user.id);

        const progressMap: { [key: number]: boolean } = {};
        progress?.forEach((p) => {
          progressMap[p.day] = p.completed;
        });
        setUserProgress(progressMap);
      }
    };

    fetchData();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel('user_progress')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'UserProgress' }, () =>
        fetchData()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const toggleModule = (modId: number) => {
    setExpandedModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    );
  };

  const moduleNames = {
    1: 'Detoxificação',
    2: 'Renovação Celular',
    3: 'Blindagem',
  };

  const moduleIcons = {
    1: <Leaf size={18} className="text-emerald-400" />,
    2: <Sparkles size={18} className="text-rosegold" />,
    3: <Shield size={18} className="text-gold" />,
  };

  const getDaysForModule = (mod: number) => {
    return protocolData.filter((d) => d.mod === mod);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <nav className="fixed w-full z-50 glass-panel border-b-0 py-3 px-4 md:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gold">
            <Menu />
          </button>
          <span className="font-serif font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gold to-rosegold hidden sm:block">
            PROTOCOLO 21
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-300 hidden sm:block">
            Olá, <span className="text-white font-bold">{email.split('@')[0]}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-xs flex items-center gap-2 text-rosegold border border-rosegold/30 px-4 py-1.5 rounded-full hover:bg-rosegold hover:text-white transition-colors"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </nav>

      <aside
        className={`fixed md:relative top-16 md:top-0 w-64 h-full glass-panel border-r border-t-0 border-l-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 z-40 md:pt-16`}
      >
        <div className="py-6 flex flex-col gap-1 h-full overflow-y-auto">
          {/* Home Link */}
          <Link
            href="/home"
            onClick={() => setIsOpen(false)}
            className={`px-6 py-3 text-sm flex items-center gap-3 transition-colors ${pathname === '/home' ? 'text-gold bg-gold/10 border-r-2 border-gold' : 'text-gray-400 hover:text-white'}`}
          >
            <Home size={18} /> Início
          </Link>

          {/* Modules Section Header */}
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gold/50 mt-4">
            A Jornada
          </div>

          {/* Modules with Accordion */}
          {[1, 2, 3].map((mod) => {
            const daysInModule = getDaysForModule(mod);
            const isExpanded = expandedModules.includes(mod);

            return (
              <div key={mod}>
                {/* Module Header Button */}
                <button
                  onClick={() => toggleModule(mod)}
                  className={`w-full px-6 py-3 text-sm flex items-center justify-between transition-colors ${
                    pathname.includes(`/modules/${daysInModule[0]?.day}`) ||
                    pathname.includes(`/modules/${daysInModule[daysInModule.length - 1]?.day}`)
                      ? 'text-gold bg-gold/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {moduleIcons[mod as keyof typeof moduleIcons]}
                    <span className="font-semibold">
                      Módulo {mod}: {moduleNames[mod as keyof typeof moduleNames]}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Days List */}
                {isExpanded && (
                  <div className="bg-white/5 border-l border-white/10 ml-3">
                    {daysInModule.map((day) => {
                      const isCompleted = userProgress[day.day];
                      const isActive = pathname === `/modules/${day.day}`;

                      return (
                        <Link
                          key={day.day}
                          href={`/modules/${day.day}`}
                          onClick={() => setIsOpen(false)}
                          className={`px-6 py-2.5 text-xs flex items-center gap-2 transition-colors border-r-2 ${
                            isActive
                              ? 'text-gold bg-gold/10 border-gold'
                              : isCompleted
                                ? 'text-emerald-400 border-emerald-400/30 hover:text-emerald-300'
                                : 'text-gray-400 border-transparent hover:text-white'
                          }`}
                        >
                          <span className="font-bold">{String(day.day).padStart(2, '0')}</span>
                          <span className="truncate flex-1">{day.title}</span>
                          {isCompleted && <CheckCircle size={14} />}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Tools Section */}
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gold/50 mt-4">
            Ferramentas
          </div>
          <Link
            href="/checklist"
            onClick={() => setIsOpen(false)}
            className={`px-6 py-3 text-sm flex items-center gap-3 transition-colors ${pathname === '/checklist' ? 'text-gold bg-gold/10 border-r-2 border-gold' : 'text-gray-400 hover:text-white'}`}
          >
            <CheckSquare size={18} /> Checklist Diário
          </Link>

          {/* VIP Bonus Section */}
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gold/50 mt-4">
            Bônus VIP
          </div>
          <Link
            href="/bonus"
            onClick={() => setIsOpen(false)}
            className={`px-6 py-3 text-sm flex items-center gap-3 transition-colors ${pathname === '/bonus' ? 'text-gold bg-gold/10 border-r-2 border-gold' : 'text-gray-400 hover:text-white'}`}
          >
            <Gift size={18} /> Meus Bônus
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main className="flex-1 p-20 h-full overflow-y-auto mt-15 relative z-10 scroll-smooth">
        {children}
      </main>
    </div>
  );
}

// Helper component for CheckCircle icon
function CheckCircle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
