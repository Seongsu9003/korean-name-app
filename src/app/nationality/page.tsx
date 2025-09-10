'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { AuthGuard } from '@/components/ui/AuthGuard'
import { Button } from '@/components/ui/button'

export default function NationalitySelection() {
  const [selectedNationality, setSelectedNationality] = useState<string>('')
  const { user } = useAuth()
  const router = useRouter()

  const handleContinue = () => {
    if (selectedNationality) {
      // Store nationality in localStorage for now
      localStorage.setItem('userNationality', selectedNationality)
      router.push('/survey-new')
    }
  }

  const nationalities = [
    {
      code: 'US',
      name: 'United States',
      nameKr: '미국',
      nameCn: '美国',
      flag: '🇺🇸'
    },
    {
      code: 'CN', 
      name: 'China',
      nameKr: '중국',
      nameCn: '中国',
      flag: '🇨🇳'
    }
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen gradient-bg">
        {/* Modern Navigation Header */}
        <header className="glass-effect border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">한</span>
                </div>
                <h1 className="text-xl font-bold text-white">Korean Name App</h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">
                  Hello, {user?.email?.split('@')[0]}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                Select your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> nationality</span>
              </h1>
              <p className="text-xl text-gray-400 mb-2">
                Please select your nationality
              </p>
              <p className="text-lg text-gray-500">
                请选择您的国籍
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {nationalities.map((nationality) => (
                <div
                  key={nationality.code}
                  className={`
                    card-gradient border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:transform hover:scale-105
                    ${selectedNationality === nationality.code 
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                      : 'border-gray-700 hover:border-gray-600'
                    }
                  `}
                  onClick={() => setSelectedNationality(nationality.code)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6">{nationality.flag}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {nationality.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="text-gray-300 text-lg">{nationality.nameKr}</div>
                      <div className="text-gray-400">{nationality.nameCn}</div>
                    </div>
                    
                    {selectedNationality === nationality.code && (
                      <div className="mt-6">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button
                onClick={handleContinue}
                disabled={!selectedNationality}
                className={`
                  btn-primary px-12 py-4 rounded-xl font-semibold text-lg 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  ${!selectedNationality ? 'grayscale' : ''}
                `}
              >
                Continue to Survey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}