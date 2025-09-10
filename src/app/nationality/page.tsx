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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-gray-800">Korean Name App</h1>
              <span className="text-sm text-gray-600">안녕하세요, {user?.email}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                출신 국가를 선택해주세요
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Please select your nationality
              </p>
              <p className="text-lg text-gray-600">
                请选择您的国籍
              </p>
            </div>

            <div className="grid gap-6 max-w-md mx-auto">
              {nationalities.map((nationality) => (
                <div
                  key={nationality.code}
                  className={`
                    border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg
                    ${selectedNationality === nationality.code 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                  onClick={() => setSelectedNationality(nationality.code)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{nationality.flag}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {nationality.name}
                    </h3>
                    <div className="text-sm text-gray-600">
                      <div>{nationality.nameKr}</div>
                      <div>{nationality.nameCn}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={handleContinue}
                disabled={!selectedNationality}
                className="px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                계속하기 / Continue / 继续
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}