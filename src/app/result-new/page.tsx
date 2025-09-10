'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthGuard } from '@/components/ui/AuthGuard'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/lib/i18n'
import genderNames from '@/data/gender_appropriate_names.json'

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
  const [nameResults, setNameResults] = useState<NameCandidate[]>([])

  useEffect(() => {
    // Get survey data from localStorage
    const surveyDataStr = localStorage.getItem('surveyData')
    if (surveyDataStr) {
      const surveyData = JSON.parse(surveyDataStr)
      const generatedNames = generateGenderAppropriateNames(surveyData)
      setNameResults(generatedNames)
    } else {
      // Fallback to default names if no survey data
      setNameResults(getDefaultNames())
    }
  }, [])

  const generateGenderAppropriateNames = (surveyData: {
    gender: string;
    nameStyle: string;
    workplaceContext: string;
    culturalIntegration: string;
  }): NameCandidate[] => {
    const { gender, nameStyle, workplaceContext } = surveyData
    const results: NameCandidate[] = []

    if (nameStyle === 'traditional_gendered') {
      if (gender === 'male') {
        // Generate traditional male names
        const firstOptions = genderNames.male_traditional.first_syllables
        const secondOptions = genderNames.male_traditional.second_syllables
        
        for (let i = 0; i < 4; i++) {
          const first = firstOptions[i % firstOptions.length]
          const second = secondOptions[i % secondOptions.length]
          
          results.push({
            hangul: first.hangul + second.hangul,
            hanja: first.hanja + second.hanja,
            pronunciation: romanize(first.hangul + second.hangul),
            meaning: `${first.meaning} and ${second.meaning}`,
            explanation: `A traditional masculine name combining ${first.meaning} with ${second.meaning}, perfect for ${workplaceContext} environment.`,
            compatibility: Math.floor(Math.random() * 10) + 90
          })
        }
      } else if (gender === 'female') {
        // Generate traditional female names
        const firstOptions = genderNames.female_traditional.first_syllables
        const secondOptions = genderNames.female_traditional.second_syllables
        
        for (let i = 0; i < 4; i++) {
          const first = firstOptions[i % firstOptions.length]
          const second = secondOptions[i % secondOptions.length]
          
          results.push({
            hangul: first.hangul + second.hangul,
            hanja: first.hanja + second.hanja,
            pronunciation: romanize(first.hangul + second.hangul),
            meaning: `${first.meaning} and ${second.meaning}`,
            explanation: `A traditional feminine name combining ${first.meaning} with ${second.meaning}, reflecting grace and elegance.`,
            compatibility: Math.floor(Math.random() * 10) + 90
          })
        }
      }
    } else if (nameStyle === 'modern_balanced') {
      // Generate modern balanced names
      const firstOptions = genderNames.modern_balanced.unisex_first
      const secondOptions = genderNames.modern_balanced.unisex_second
      
      for (let i = 0; i < 4; i++) {
        const first = firstOptions[i % firstOptions.length]
        const second = secondOptions[i % secondOptions.length]
        
        results.push({
          hangul: first.hangul + second.hangul,
          hanja: first.hanja + second.hanja,
          pronunciation: romanize(first.hangul + second.hangul),
          meaning: `${first.meaning} and ${second.meaning}`,
          explanation: `A modern balanced name that works well in contemporary Korean society while honoring traditional elements.`,
          compatibility: Math.floor(Math.random() * 15) + 85
        })
      }
    } else if (nameStyle === 'gender_neutral') {
      // Generate gender neutral names
      const natureNames = genderNames.gender_neutral.nature_based
      const virtueNames = genderNames.gender_neutral.virtue_based
      const allNeutral = [...natureNames, ...virtueNames]
      
      for (let i = 0; i < 4; i++) {
        const name = allNeutral[i % allNeutral.length]
        
        results.push({
          hangul: name.hangul,
          hanja: name.hangul, // These names don't use hanja
          pronunciation: romanize(name.hangul),
          meaning: name.meaning,
          explanation: `A gender-neutral name that allows you to express your unique identity while fitting naturally in Korean society.`,
          compatibility: Math.floor(Math.random() * 20) + 80
        })
      }
    }

    return results.length > 0 ? results : getDefaultNames()
  }

  const romanize = (hangul: string): string => {
    // Simple romanization - in real app, use proper library
    const romanizationMap: {[key: string]: string} = {
      '지혜': 'ji-hye', '서연': 'seo-yeon', '은아': 'eun-ah', '민서': 'min-seo',
      '민준': 'min-jun', '현우': 'hyeon-woo', '태진': 'tae-jin', '성한': 'seong-han',
      '도윤': 'do-yoon', '하영': 'ha-young', '서우': 'seo-woo', '지현': 'ji-hyeon',
      '하늘': 'ha-neul', '새롬': 'sae-rom', '이슬': 'i-seul', '참': 'cham'
    }
    return romanizationMap[hangul] || hangul
  }

  const getDefaultNames = (): NameCandidate[] => [
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