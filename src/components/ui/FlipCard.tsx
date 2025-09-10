'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface FlipCardProps {
  name: {
    hangul: string
    hanja: string
    pronunciation: string
    meaning: string
    explanation: string
    compatibility: number
  }
  isSelected: boolean
  onFlip: () => void
}

export const FlipCard = ({ name, isSelected, onFlip }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    if (!isSelected) {
      onFlip()
    }
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative w-full h-80 perspective-1000">
      <div 
        className={`
          relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer
          ${isFlipped ? 'rotate-y-180' : ''}
          ${isSelected ? 'z-10' : 'z-0'}
        `}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div className={`
          absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg
          bg-gradient-to-br from-white to-blue-50 border-2 
          ${isSelected ? 'border-blue-500 shadow-2xl' : 'border-gray-200'}
          flex flex-col items-center justify-center p-6
        `}>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">
              {name.hangul}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {name.hanja}
            </p>
            <div className="text-sm text-gray-500 mb-4">
              클릭하여 의미 확인
            </div>
            <div className="bg-blue-100 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-blue-800">
                적합도: {name.compatibility}%
              </span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`
          absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg
          bg-gradient-to-br from-blue-500 to-purple-600 text-white
          ${isSelected ? 'shadow-2xl' : ''}
          flex flex-col justify-between p-6
        `}>
          <div>
            <h3 className="text-2xl font-bold mb-3">
              {name.hangul}
            </h3>
            <div className="mb-4">
              <p className="text-sm opacity-90 mb-1">발음</p>
              <p className="text-lg">{name.pronunciation}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm opacity-90 mb-1">의미</p>
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
              }}
              className="w-full"
            >
              이 이름 저장하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}