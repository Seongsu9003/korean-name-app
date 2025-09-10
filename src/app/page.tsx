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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Auth Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">{t('appName')}</h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">{t('hello')}, {user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {t('heroSubtitle')}
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>
          
          <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t('whyKoreanName')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-2">{t('socialIntegration')}</h3>
                <p className="text-gray-600">{t('socialIntegrationDesc')}</p>
              </div>
              <div className="p-4 border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-800 mb-2">{t('culturalRespect')}</h3>
                <p className="text-gray-600">{t('culturalRespectDesc')}</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-800 mb-2">{t('officialUse')}</h3>
                <p className="text-gray-600">{t('officialUseDesc')}</p>
              </div>
              <div className="p-4 border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-800 mb-2">{t('personalMeaning')}</h3>
                <p className="text-gray-600">{t('personalMeaningDesc')}</p>
              </div>
            </div>
          </div>

          {user ? (
            <Link 
              href="/nationality"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
{t('getNameButton')}
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            <Link 
              href="/auth"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
{t('getNameButton')}
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
