
import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { SponsorSlider } from './components/SponsorSlider';
import { Pricing } from './components/Pricing';
import { Dashboard } from './components/Dashboard';
import { CaptureExperience } from './components/CaptureExperience';
import { Platform } from './components/Platform';
import { Enterprise } from './components/Enterprise';
import { API } from './components/API';
import { Resources } from './components/Resources';
import { Community } from './components/Community';
import { Checkout } from './components/Checkout';
import { AuthModal } from './components/AuthModal';
import { Logo } from './components/Logo';
import { UserProfile, UserRole, ScanRecord, Language, Currency } from './types';
import { Menu, X, LogIn, Zap, LayoutGrid, ChevronRight, ArrowLeft, LogOut, UserCircle } from 'lucide-react';

const navTranslations = {
  English: {
    platform: 'Platform',
    enterprise: 'Enterprise',
    api: 'API',
    resources: 'Resources',
    signIn: 'Sign In',
    signOut: 'Sign out',
    switchProfile: 'Sign in with a different profile',
    overview: 'Overview',
    back: 'Back'
  },
  Arabic: {
    platform: 'المنصة',
    enterprise: 'المؤسسات',
    api: 'البرمجة',
    resources: 'المصادر',
    signIn: 'دخول',
    signOut: 'تسجيل الخروج',
    switchProfile: 'الدخول بملف شخصي مختلف',
    overview: 'نظرة عامة',
    back: 'رجوع'
  },
  French: {
    platform: 'Plateforme',
    enterprise: 'Entreprise',
    api: 'API',
    resources: 'Ressources',
    signIn: 'Connexion',
    signOut: 'Déconnexion',
    switchProfile: 'Changer de profil',
    overview: 'Aperçu',
    back: 'Retour'
  },
  Spanish: {
    platform: 'Plataforma',
    enterprise: 'Empresa',
    api: 'API',
    resources: 'Recursos',
    signIn: 'Entrar',
    signOut: 'Cerrar sesión',
    switchProfile: 'Cambiar de perfil',
    overview: 'Resumen',
    back: 'Volver'
  },
  German: {
    platform: 'Plattform',
    enterprise: 'Unternehmen',
    api: 'API',
    resources: 'Ressourcen',
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    switchProfile: 'Profil wechseln',
    overview: 'Übersicht',
    back: 'Zurück'
  },
  Amharic: {
    platform: 'መድረክ',
    enterprise: 'ድርጅት',
    api: 'ኤፒአይ',
    resources: 'ምንጮች',
    signIn: 'ግባ',
    signOut: 'ውጣ',
    switchProfile: 'በሌላ መገለጫ ይግቡ',
    overview: 'አጠቃላይ እይታ',
    back: 'ተመለስ'
  },
  Chinese: {
    platform: '平台',
    enterprise: '企业',
    api: 'API接口',
    resources: '资源',
    signIn: '登录',
    signOut: '登出',
    switchProfile: '使用其他账号登录',
    overview: '总览',
    back: '返回'
  },
  Italian: {
    platform: 'Piattaforma',
    enterprise: 'Azienda',
    api: 'API',
    resources: 'Risorse',
    signIn: 'Accedi',
    signOut: 'Disconnetti',
    switchProfile: 'Cambia profilo',
    overview: 'Panoramica',
    back: 'Indietro'
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard' | 'capture' | 'platform' | 'enterprise' | 'api' | 'resources' | 'community' | 'checkout'>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef<number | null>(null);
  const [pendingPlan, setPendingPlan] = useState<{ plan: 'PRO' | 'EXPERT', isYearly: boolean } | null>(null);
  
  // Navigation History Stack
  const [history, setHistory] = useState<string[]>(['landing']);

  // Interface Preference State
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('sama_lang') as Language) || 'English');
  const [currency, setCurrency] = useState<Currency>(() => (localStorage.getItem('sama_curr') as Currency) || 'USD');

  const t = navTranslations[language] || navTranslations.English;
  const isRTL = language === 'Arabic';

  useEffect(() => {
    localStorage.setItem('sama_lang', language);
    document.documentElement.dir = language === 'Arabic' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'Arabic' ? 'ar' : 
                                    language === 'Chinese' ? 'zh' :
                                    language === 'Amharic' ? 'am' : 'en';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sama_curr', currency);
  }, [currency]);

  // Handle history updates
  useEffect(() => {
    setHistory(prev => {
      if (prev[prev.length - 1] === view) return prev;
      return [...prev, view];
    });
  }, [view]);

  const handleBackNavigation = () => {
    if (history.length <= 1) {
      setView('landing');
      return;
    }
    const newHistory = [...history];
    newHistory.pop(); // Remove current view
    const lastView = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setView(lastView as any);
  };
  
  const [scans, setScans] = useState<ScanRecord[]>([
    { 
      id: 'SAMA-9921', 
      timestamp: new Date(Date.now() - 172800000), 
      vehicleModel: 'Tesla Model 3', 
      damageLevel: 'Low', 
      status: 'Ready', 
      confidence: 0.98, 
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400',
      findings: ['Minor surface scuffing on rear bumper', 'Paint transfer detected (Silver)'],
      recommendations: ['Buffing and polish suggested', 'Structural integrity unaffected']
    },
    { 
      id: 'SAMA-9844', 
      timestamp: new Date(Date.now() - 345600000), 
      vehicleModel: 'Ford F-150', 
      damageLevel: 'Medium', 
      status: 'Ready', 
      confidence: 0.92, 
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400',
      findings: ['Dent detected in front left fender', 'Misalignment of hood panel'],
      recommendations: ['PDR (Paintless Dent Repair) recommended', 'Check wheel alignment']
    },
  ]);

  const handleLoginClick = () => {
    if (user) {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else {
      setIsAuthModalOpen(true);
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setIsUserDropdownOpen(false);
  };

  const handleSwitchProfile = () => {
    setUser(null);
    setView('landing');
    setIsUserDropdownOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    setIsAuthModalOpen(false);
    setView('dashboard');
  };

  const handlePlanUpgrade = (role: 'FREE' | 'PRO' | 'EXPERT', isYearly: boolean) => {
    const updatedRole = role as UserRole;
    const updatedUser = user ? { ...user, role: updatedRole } : {
      id: 'usr_1',
      email: 'demo@sama.ai',
      displayName: 'Alex Carter',
      role: updatedRole,
      scanCount: 0
    };
    setUser(updatedUser);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateCheckout = (plan: 'PRO' | 'EXPERT', isYearly: boolean) => {
    setPendingPlan({ plan, isYearly });
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToFleetOverview = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setView('dashboard');
      setIsMenuOpen(false);
    }
  };

  const handleStartScan = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setView('capture');
    setIsMenuOpen(false);
  };

  const handleCompleteScan = (aiData: any, imageUrl: string) => {
    const newScan: ScanRecord = {
      id: `SAMA-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date(),
      vehicleModel: aiData.vehicleModel || 'Unknown Vehicle',
      damageLevel: (aiData.damageLevel as any) || 'None',
      status: 'Ready',
      confidence: aiData.confidenceScore || 0.95,
      imageUrl: imageUrl,
      findings: aiData.findings || [],
      recommendations: ['Follow up with certified inspector', 'Review insurance policy']
    };
    
    setScans([newScan, ...scans]);
    if (user) {
      setUser({ ...user, scanCount: user.scanCount + 1 });
    }
    setView('dashboard');
  };

  const handleDeleteScan = (id: string) => {
    setScans(scans.filter(s => s.id !== id));
    if (user) {
      setUser({ ...user, scanCount: Math.max(0, user.scanCount - 1) });
    }
  };

  const navigateToPricing = () => {
    setView('landing');
    setTimeout(() => {
      document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderContent = () => {
    if (view === 'checkout' && pendingPlan) {
      return (
        <Checkout 
          plan={pendingPlan.plan} 
          isYearly={pendingPlan.isYearly} 
          currency={currency}
          onCancel={() => setView('landing')}
          onComplete={() => {
            handlePlanUpgrade(pendingPlan.plan, pendingPlan.isYearly);
            setPendingPlan(null);
          }}
        />
      );
    }

    switch (view) {
      case 'platform':
        return <Platform />;
      case 'enterprise':
        return <Enterprise />;
      case 'api':
        return <API user={user} onNavigateToPricing={navigateToPricing} />;
      case 'resources':
        return <Resources onNavigateToCommunity={() => setView('community')} />;
      case 'community':
        return <Community onBack={() => setView('resources')} />;
      case 'landing':
      default:
        return (
          <>
            <Hero onStart={handleStartScan} lang={language} />
            <SponsorSlider />
            <Pricing onPlanSelected={handlePlanUpgrade} onInitiateCheckout={handleInitiateCheckout} lang={language} currency={currency} />
            <section className="py-24 container mx-auto px-6 border-t border-white/5">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:rtl' : ''}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h2 className="text-4xl font-bold mb-6">
                    {language === 'Arabic' ? 'ذكاء مستقل عن الجهاز' : 
                     language === 'Amharic' ? 'ከመሣሪያ ነፃ የሆነ ብልህነት' :
                     language === 'Chinese' ? '独立于设备的智能' :
                     language === 'Italian' ? 'Intelligenza Indipendente dal Dispositivo' :
                     'Device-Agnostic Intelligence'}
                  </h2>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {language === 'Arabic' 
                      ? 'سواء كنت تستخدم هاتفًا ذكيًا أو نظارات ميتا أو مستشعرات الواقع المعزز الصناعية، فإن خط معالجة التقاط SAMA يجرد الأجهزة. الذكاء الاصطناعي هو الثابت، وجهازك هو العدسة.' 
                      : language === 'Amharic'
                      ? 'ስማርትፎን ፣ ሜታ ግላስ ወይም የኢንዱስትሪ ኤአር ሴንሰሮችን እየተጠቀሙ ይሁኑ ፣ የ SAMA ቀረጻ ሂደት መሣሪያውን ነፃ ያደርገዋል። AI ቋሚ ነው ፣ መሣሪያዎ ሌንሱ ነው።'
                      : language === 'Chinese'
                      ? '无论您使用的是智能手机、Meta眼镜还是工业增强现实传感器，SAMA的采集流水线都能抽离硬件。AI是核心，您的设备只是镜头。'
                      : language === 'Italian'
                      ? 'Che tu stia utilizzando uno smartphone, occhiali Meta o sensori AR industriali, la pipeline di acquisizione di SAMA astrae l\'hardware. L\'AI è la costante, il tuo dispositivo è l\'obiettivo.'
                      : 'Whether you\'re using a smartphone, Meta Glass, or industrial AR sensors, SAMA\'s capture pipeline abstracts the hardware. AI is the constant, your device is the lens.'}
                  </p>
                  <ul className="space-y-4">
                    {[
                      language === 'Amharic' ? 'አውቶማቲክ የክፈፍ-በ-ክፈፍ ጥልቀት ትንተና' :
                      language === 'Chinese' ? '自动逐帧深度分析' :
                      language === 'Italian' ? 'Analisi automatica della profondità frame per frame' :
                      language === 'Arabic' ? 'تحليل عمق الإطار تلو الإطار آليًا' : 'Automated frame-by-frame depth analysis',
                      
                      language === 'Amharic' ? 'ለኤአር መሣሪያዎች የእውነተኛ ጊዜ ጉዳት ተደራቢዎች' :
                      language === 'Chinese' ? 'AR设备的实时损坏叠加' :
                      language === 'Italian' ? 'Overlay dei danni in tempo reale per dispositivi AR' :
                      language === 'Arabic' ? 'تراكبات أضرار في الوقت الفعلي لأجهزة AR' : 'Real-time damage overlays for AR devices',
                      
                      language === 'Amharic' ? 'ከሚሊሜትር በታች የጭረት ምርመራ' :
                      language === 'Chinese' ? '亚毫米级划痕检测' :
                      language === 'Italian' ? 'Rilevamento graffi sub-millimetrico' :
                      language === 'Arabic' ? 'كشف الخدوش بدقة تحت المليمتر' : 'Sub-millimeter scratch detection',
                      
                      language === 'Amharic' ? 'ፈጣን የደመና ማመሳሰል' :
                      language === 'Chinese' ? '即时跨平台云同步' :
                      language === 'Italian' ? 'Sincronizzazione cloud istantanea tra piattaforme' :
                      language === 'Arabic' ? 'مزامنة سحابية فورية عبر الأنظمة' : 'Instant cross-platform cloud synchronization'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="mt-1 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                          <Zap size={12} />
                        </div>
                        <span className="text-gray-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                   <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=1000" alt="Tech" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className={`absolute bottom-8 ${isRTL ? 'right-8 text-right' : 'left-8'} p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl max-w-xs`}>
                        <div className="text-xs font-bold text-purple-400 uppercase mb-2">SAMA CORE API</div>
                        <div className="text-lg font-bold mb-1 italic">"99.8% consistency across fleet audits."</div>
                        <div className="text-[10px] text-gray-500">— Chief Logistics Officer, EuroFleet</div>
                     </div>
                   </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  const navLinks = [
    { label: t.platform, id: 'platform' },
    { label: t.enterprise, id: 'enterprise' },
    { label: t.api, id: 'api' },
    { label: t.resources, id: 'resources' },
  ];

  if (view === 'capture') {
    return (
      <CaptureExperience 
        onClose={() => setView('dashboard')}
        onComplete={handleCompleteScan}
        language={language}
      />
    );
  }

  if (view === 'dashboard' && user) {
    return (
      <Dashboard 
        user={user} 
        scans={scans} 
        onNewScan={() => setView('capture')} 
        onLogout={handleLogout}
        onDeleteScan={handleDeleteScan}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onBack={() => setView('landing')} // Specifically return to landing from overview bottom button
      />
    );
  }

  const handleMouseEnterUser = () => {
    if (window.innerWidth >= 1024 && user) {
      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
      setIsUserDropdownOpen(true);
    }
  };

  const handleMouseLeaveUser = () => {
    if (window.innerWidth >= 1024) {
      dropdownTimerRef.current = window.setTimeout(() => {
        setIsUserDropdownOpen(false);
      }, 300);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0f0a1e] selection:bg-purple-500 selection:text-white ${isRTL ? 'font-arabic' : ''}`}>
      {view !== 'checkout' && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0a1e]/80 backdrop-blur-md border-b border-white/5">
          <div className={`container mx-auto px-6 h-20 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button 
              onClick={() => { setView('landing'); setIsMenuOpen(false); }}
              className="flex items-center"
            >
              <Logo size="sm" />
            </button>

            <div className={`hidden lg:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => setView(link.id as any)}
                  className={`text-sm font-medium transition-all ${
                    view === link.id ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="relative"
                onMouseEnter={handleMouseEnterUser}
                onMouseLeave={handleMouseLeaveUser}
              >
                <button 
                  onClick={handleLoginClick}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 group ${user ? 'bg-white/5 text-purple-400 hover:bg-white/10' : 'text-white hover:bg-white/5'}`}
                >
                  {user ? (
                    <>
                      <UserCircle size={18} className="group-hover:scale-110 transition-transform" />
                      <span>{user.displayName.split(' ')[0]}</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} /> <span>{t.signIn}</span>
                    </>
                  )}
                </button>

                {/* Desktop Dropdown Menu */}
                {user && (
                  <div className={`
                    absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-72 origin-top-right z-50
                    transition-all duration-200 ease-out transform
                    ${isUserDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}
                  `}>
                    <div className="bg-[#1a142e] border border-white/10 rounded-2xl shadow-2xl p-2 backdrop-blur-xl">
                      <div className={`p-4 border-b border-white/5 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{isRTL ? 'الملف الشخصي' : 'Active Profile'}</div>
                        <div className="text-sm font-bold text-white truncate">{user.displayName}</div>
                        <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">{user.role} License</div>
                      </div>
                      
                      <button 
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        <LogOut size={16} className="text-red-400" />
                        <span>{t.signOut}</span>
                      </button>

                      <button 
                        onClick={handleSwitchProfile}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        <LogIn size={16} className="text-purple-400" />
                        <span>{t.switchProfile}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={handleNavigateToFleetOverview}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-black hover:bg-gray-200 transition-all active:scale-95"
              >
                <LayoutGrid size={16} /> {t.overview}
              </button>
              
              <button 
                className="lg:hidden text-white ml-2 p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          <div className={`
            lg:hidden absolute top-20 left-0 right-0 bg-[#0f0a1e]/95 backdrop-blur-xl border-b border-white/5
            transition-all duration-300 ease-in-out transform
            ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'}
          `}>
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => {
                    setView(link.id as any);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-xl text-lg font-semibold transition-all ${isRTL ? 'flex-row-reverse' : ''} ${
                    view === link.id ? 'bg-purple-500/10 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={20} className={`${view === link.id ? 'opacity-100' : 'opacity-30'} ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              ))}
              
              {user && (
                <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                   <button 
                    onClick={handleLogout}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/5 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {t.signOut} <LogOut size={18} />
                  </button>
                  <button 
                    onClick={handleSwitchProfile}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold text-purple-400 hover:bg-purple-500/5 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {t.switchProfile} <LogIn size={18} />
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <button 
                  onClick={handleNavigateToFleetOverview}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-xl font-bold"
                >
                  <LayoutGrid size={20} /> {isRTL ? 'نظرة عامة على الأسطول' : 'Fleet Overview'}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>
        {renderContent()}
      </main>

      {/* Auth Orchestrator Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
        language={language}
      />

      {/* Global Floating Back Button */}
      {view !== 'landing' && (
        <button 
          onClick={handleBackNavigation}
          className={`fixed bottom-8 ${isRTL ? 'right-8' : 'left-8'} z-[100] flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all group shadow-2xl active:scale-95 animate-in slide-in-from-bottom-6 fade-in duration-500`}
          aria-label={t.back}
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg">
            <ArrowLeft size={24} className={`${isRTL ? 'rotate-180' : ''} group-hover:-translate-x-1 transition-transform`} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors px-2">
            {t.back}
          </span>
        </button>
      )}

      {view !== 'checkout' && (
        <footer className="py-12 border-t border-white/5">
          <div className={`container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <button 
              onClick={() => setView('landing')}
              className="flex items-center"
            >
              <Logo size="sm" />
            </button>
            <div className={`flex gap-8 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="hover:text-white transition-all">{isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
              <a href="#" className="hover:text-white transition-all">{isRTL ? 'شروط الخدمة' : 'Terms of Service'}</a>
              <a href="#" className="hover:text-white transition-all">{isRTL ? 'الحالة' : 'Status'}</a>
              <a href="#" className="hover:text-white transition-all">{isRTL ? 'اتصل بنا' : 'Contact'}</a>
            </div>
            <p className="text-sm text-gray-600">© 2025 SAMA Systems Inc. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
