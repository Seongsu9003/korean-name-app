'use client'

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { logOut } from "@/lib/auth";
import { useTranslations } from "@/lib/i18n";

export default function Home() {
  const { user } = useAuth();
  const { t } = useTranslations();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className="min-h-screen gradient-bg">
      {/* Modern Navigation Header */}
      <header className="glass-effect border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">한</span>
              </div>
              <h1 className="text-xl font-bold text-white">{t('appName')}</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-300 hidden sm:block">
                      {t('hello')}, {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        {/* Main Hero */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Move faster
              </span>
              <br />
              <span className="text-white">
                with Korean
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Name tools
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get meaningful Korean names based on traditional Five Elements theory and your personal characteristics. 
              Start with our comprehensive survey, or bring your own preferences to our production-ready name generator.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link 
                  href="/nationality"
                  className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 shadow-2xl"
                >
                  <span>{t('getNameButton')}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              ) : (
                <Link 
                  href="/auth"
                  className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 shadow-2xl"
                >
                  <span>{t('getNameButton')}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { key: 'socialIntegration', icon: '🤝', color: 'from-blue-500 to-cyan-500' },
              { key: 'culturalRespect', icon: '🎯', color: 'from-green-500 to-emerald-500' },
              { key: 'officialUse', icon: '🏢', color: 'from-purple-500 to-indigo-500' },
              { key: 'personalMeaning', icon: '✨', color: 'from-orange-500 to-red-500' }
            ].map(({ key, icon, color }) => (
              <div key={key} className="card-gradient p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mb-4 text-2xl`}>
                  {icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">
                  {key === 'socialIntegration' ? t('socialIntegration') :
                   key === 'culturalRespect' ? t('culturalRespect') :
                   key === 'officialUse' ? t('officialUse') :
                   t('personalMeaning')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {key === 'socialIntegration' ? t('socialIntegrationDesc') :
                   key === 'culturalRespect' ? t('culturalRespectDesc') :
                   key === 'officialUse' ? t('officialUseDesc') :
                   t('personalMeaningDesc')}
                </p>
              </div>
            ))}
          </div>

          {/* Demo Card */}
          <div className="max-w-2xl mx-auto">
            <div className="card-gradient p-8 rounded-3xl border border-gray-700 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Today</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Customize every name and cultural element
                </h3>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">You</span>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Assigned to</div>
                  <div className="text-white font-medium">Your Korean Identity</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  {['Korean', 'Traditional', 'Modern', 'Cultural'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-4/5"></div>
              </div>
              <div className="text-right text-sm text-gray-400">80% Match</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
