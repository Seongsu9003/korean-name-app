'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthGuard } from '@/components/ui/AuthGuard'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/lib/i18n'

interface NameCandidate {
  hangul: string
  hanja: string
  pronunciation: string
  meaning: string
  explanation: string
  compatibility: number
}

export default function ResultNew() {
  const router = useRouter()
  const { t } = useTranslations()
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  
  // Mock data - in real app, this would come from API
  const nameResults: NameCandidate[] = [
    {
      hangul: '지혜',
      hanja: '智慧',
      pronunciation: 'ji-hye',
      meaning: 'Wisdom and Intelligence',
      explanation: 'A name that embodies deep wisdom and keen intelligence, perfect for someone who values knowledge and understanding.',
      compatibility: 95
    },
    {
      hangul: '민준',
      hanja: '敏俊',
      pronunciation: 'min-jun',
      meaning: 'Quick and Talented',
      explanation: 'Represents someone who is quick-witted and exceptionally talented, suited for leadership roles.',
      compatibility: 88
    },
    {
      hangul: '서연',
      hanja: '瑞姸',
      pronunciation: 'seo-yeon',
      meaning: 'Auspicious Beauty',
      explanation: 'A name that combines good fortune with natural beauty, bringing positive energy to its bearer.',
      compatibility: 92
    },
    {
      hangul: '태우',
      hanja: '太宇',
      pronunciation: 'tae-woo',
      meaning: 'Great Universe',
      explanation: 'Symbolizes vastness and greatness, representing someone with unlimited potential and cosmic perspective.',
      compatibility: 87
    }
  ]

  const handleCardClick = (index: number) => {
    if (selectedCard === index) {
      // If clicking the same card, just flip it
      setFlippedCards(prev => {
        const newSet = new Set(prev)
        if (newSet.has(index)) {
          newSet.delete(index)
        } else {
          newSet.add(index)
        }
        return newSet
      })
    } else {
      // Select new card and flip previous cards back
      setFlippedCards(new Set([index]))
      setSelectedCard(index)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {t('nameRecommendation')}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('resultDescription')}
              </p>
            </div>

            {/* Name Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {nameResults.map((name, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-300 ${
                    selectedCard === index ? 'transform scale-105' : ''
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`
                      relative w-full h-80 cursor-pointer transition-transform duration-700
                      ${flippedCards.has(index) ? 'transform rotateY-180' : ''}
                    `}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => handleCardClick(index)}
                  >
                    {/* Front Side */}
                    <div 
                      className={`
                        absolute inset-0 w-full h-full rounded-xl shadow-lg
                        bg-gradient-to-br from-white to-blue-50 border-2
                        ${selectedCard === index ? 'border-blue-500 shadow-2xl' : 'border-gray-200'}
                        flex flex-col items-center justify-center p-6
                      `}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-gray-800 mb-2">
                          {name.hangul}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">
                          {name.hanja}
                        </p>
                        <div className="text-sm text-gray-500 mb-4">
                          {t('clickToReveal')}
                        </div>
                        <div className="bg-blue-100 rounded-full px-4 py-2">
                          <span className="text-sm font-medium text-blue-800">
                            {t('compatibility')}: {name.compatibility}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div 
                      className={`
                        absolute inset-0 w-full h-full rounded-xl shadow-lg
                        bg-gradient-to-br from-blue-500 to-purple-600 text-white
                        ${selectedCard === index ? 'shadow-2xl' : ''}
                        flex flex-col justify-between p-6 transform rotateY-180
                      `}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div>
                        <h3 className="text-2xl font-bold mb-3">
                          {name.hangul}
                        </h3>
                        <div className="mb-4">
                          <p className="text-sm opacity-90 mb-1">{t('pronunciation')}</p>
                          <p className="text-lg">{name.pronunciation}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm opacity-90 mb-1">{t('meaning')}</p>
                          <p className="text-base">{name.meaning}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs opacity-80 mb-3">
                          {name.explanation}
                        </p>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle save functionality
                            console.log('Saving name:', name.hangul)
                          }}
                          className="w-full bg-white text-blue-600 hover:bg-gray-100"
                        >
                          {t('saveThisName')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <Button
                onClick={() => router.push('/survey-new')}
                variant="outline"
                className="px-8 py-3"
              >
                {t('startOver')}
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="px-8 py-3"
              >
                홈으로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}