'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthGuard } from '@/components/ui/AuthGuard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslations } from '@/lib/i18n'

interface SurveyData {
  name: string
  gender: 'male' | 'female' | 'other' | ''
  birthDate: string
  birthTime: string
  familyRole: 'eldest' | 'youngest' | 'middle' | 'only' | ''
  occupation: 'student' | 'engineer' | 'teacher' | 'doctor' | 'business' | 'artist' | 'researcher' | 'other' | ''
  phoneticPreference: 'soft' | 'strong' | 'balanced' | ''
  meaningPreference: 'wisdom' | 'strength' | 'peace' | 'success' | ''
  favoriteFood: string
  favoriteMusic: string
}

export default function SurveyNew() {
  const router = useRouter()
  const { t } = useTranslations()
  const [currentStep, setCurrentStep] = useState(1)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    name: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    familyRole: '',
    occupation: '',
    phoneticPreference: '',
    meaningPreference: '',
    favoriteFood: '',
    favoriteMusic: ''
  })

  const totalSteps = 10

  const updateSurveyData = (field: keyof SurveyData, value: string) => {
    setSurveyData(prev => ({ ...prev, [field]: value }))
  }

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData)
      })

      if (response.ok) {
        const result = await response.json()
        localStorage.setItem('surveyResult', JSON.stringify(result))
        router.push('/result-new')
      }
    } catch (error) {
      console.error('Survey submission error:', error)
    }
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return surveyData.name.trim() !== ''
      case 2: return surveyData.gender !== ''
      case 3: return surveyData.birthDate !== ''
      case 4: return surveyData.birthTime !== ''
      case 5: return surveyData.familyRole !== ''
      case 6: return surveyData.occupation !== ''
      case 7: return surveyData.phoneticPreference !== ''
      case 8: return surveyData.meaningPreference !== ''
      case 9: return surveyData.favoriteFood.trim() !== ''
      case 10: return surveyData.favoriteMusic.trim() !== ''
      default: return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('englishName')}</h2>
            <Input
              type="text"
              value={surveyData.name}
              onChange={(e) => updateSurveyData('name', e.target.value)}
              placeholder="John Smith"
              className="text-lg p-4 text-center max-w-md mx-auto"
            />
          </div>
        )

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('gender')}</h2>
            <div className="grid gap-4 max-w-md mx-auto">
              {[
                { key: 'male', label: t('male'), emoji: '👨' },
                { key: 'female', label: t('female'), emoji: '👩' },
                { key: 'other', label: t('other'), emoji: '🧑' }
              ].map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => updateSurveyData('gender', key as 'male' | 'female' | 'other')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    surveyData.gender === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('birthDate')}</h2>
            <Input
              type="date"
              value={surveyData.birthDate}
              onChange={(e) => updateSurveyData('birthDate', e.target.value)}
              className="text-lg p-4 text-center max-w-md mx-auto"
            />
          </div>
        )

      case 4:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('birthTime')}</h2>
            <Input
              type="time"
              value={surveyData.birthTime}
              onChange={(e) => updateSurveyData('birthTime', e.target.value)}
              className="text-lg p-4 text-center max-w-md mx-auto"
            />
          </div>
        )

      case 5:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('familyRole')}</h2>
            <div className="grid gap-4 max-w-md mx-auto">
              {[
                { key: 'eldest', label: t('eldest'), emoji: '1️⃣' },
                { key: 'middle', label: t('middle'), emoji: '2️⃣' },
                { key: 'youngest', label: t('youngest'), emoji: '3️⃣' },
                { key: 'only', label: t('only'), emoji: '👑' }
              ].map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => updateSurveyData('familyRole', key as 'eldest' | 'youngest' | 'middle' | 'only')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    surveyData.familyRole === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('occupation')}</h2>
            <div className="grid gap-4 max-w-md mx-auto">
              {[
                { key: 'student', label: t('student'), emoji: '🎓' },
                { key: 'engineer', label: t('engineer'), emoji: '🔧' },
                { key: 'teacher', label: t('teacher'), emoji: '📚' },
                { key: 'doctor', label: t('doctor'), emoji: '👩‍⚕️' },
                { key: 'business', label: t('business'), emoji: '💼' },
                { key: 'artist', label: t('artist'), emoji: '🎨' },
                { key: 'researcher', label: t('researcher'), emoji: '🔬' },
                { key: 'other', label: t('other'), emoji: '💼' }
              ].map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => updateSurveyData('occupation', key as 'student' | 'engineer' | 'teacher' | 'doctor' | 'business' | 'artist' | 'researcher' | 'other')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    surveyData.occupation === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">What sound do you prefer?</h2>
            <div className="grid gap-4 max-w-md mx-auto">
              {[
                { key: 'soft', label: t('soft'), emoji: '🌸' },
                { key: 'strong', label: t('strong'), emoji: '⚡' },
                { key: 'balanced', label: t('balanced'), emoji: '⚖️' }
              ].map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => updateSurveyData('phoneticPreference', key as 'soft' | 'strong' | 'balanced')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    surveyData.phoneticPreference === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 8:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">What meaning do you prefer?</h2>
            <div className="grid gap-4 max-w-md mx-auto">
              {[
                { key: 'wisdom', label: t('wisdom'), emoji: '🦉' },
                { key: 'strength', label: t('strength'), emoji: '💪' },
                { key: 'peace', label: t('peace'), emoji: '☮️' },
                { key: 'success', label: t('success'), emoji: '🏆' }
              ].map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => updateSurveyData('meaningPreference', key as 'wisdom' | 'strength' | 'peace' | 'success')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    surveyData.meaningPreference === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 9:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('favoriteFood')}</h2>
            <Input
              type="text"
              value={surveyData.favoriteFood}
              onChange={(e) => updateSurveyData('favoriteFood', e.target.value)}
              placeholder="Pizza, Sushi, etc."
              className="text-lg p-4 text-center max-w-md mx-auto"
            />
          </div>
        )

      case 10:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('favoriteMusic')}</h2>
            <Input
              type="text"
              value={surveyData.favoriteMusic}
              onChange={(e) => updateSurveyData('favoriteMusic', e.target.value)}
              placeholder="Rock, Jazz, Classical, etc."
              className="text-lg p-4 text-center max-w-md mx-auto"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 min-h-[400px] flex items-center">
              {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                onClick={goToPrevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="px-6 py-2"
              >
                {t('previous')}
              </Button>

              <Button
                onClick={goToNextStep}
                disabled={!isCurrentStepValid()}
                className="px-6 py-2"
              >
                {currentStep === totalSteps ? t('submit') : t('next')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}