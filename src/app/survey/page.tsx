'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SurveyData } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/components/ui/AuthGuard';

export default function Survey() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SurveyData>({
    englishName: '',
    nationality: '',
    gender: 'male',
    birthDate: '',
    birthTime: '',
    familyRole: undefined,
    favoriteFood: '',
    favoriteMusic: ''
  });

  const handleInputChange = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log('survey_started');
      
      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log('survey_completed');
        localStorage.setItem('surveyData', JSON.stringify(formData));
        router.push('/result');
      }
    } catch (error) {
      console.error('Survey submission error:', error);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.englishName && formData.nationality && formData.gender;
      case 2:
        return formData.birthDate && formData.birthTime;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>개인정보 수집 안내:</strong> 생년월일과 출생시간은 전통 작명법 분석을 위해 수집되며, 
                    서비스 완료 후 삭제됩니다. 언제든 데이터 삭제를 요청하실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  프로필 생성 {step}/3
                </h2>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i <= step ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">기본 정보</h3>
                
                <div>
                  <label htmlFor="englishName" className="block text-sm font-medium text-gray-700 mb-2">
                    영문 이름 (English Name) *
                  </label>
                  <Input
                    type="text"
                    id="englishName"
                    value={formData.englishName}
                    onChange={(e) => handleInputChange('englishName', e.target.value)}
                    placeholder="예: John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                    국적 (Nationality) *
                  </label>
                  <select
                    id="nationality"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                  >
                    <option value="">선택해주세요</option>
                    <option value="American">미국 (American)</option>
                    <option value="Chinese">중국 (Chinese)</option>
                    <option value="Japanese">일본 (Japanese)</option>
                    <option value="British">영국 (British)</option>
                    <option value="German">독일 (German)</option>
                    <option value="French">프랑스 (French)</option>
                    <option value="Other">기타 (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    성별 (Gender) *
                  </label>
                  <div className="flex space-x-4">
                    {[
                      { value: 'male', label: '남성 (Male)' },
                      { value: 'female', label: '여성 (Female)' },
                      { value: 'other', label: '기타 (Other)' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={formData.gender === option.value}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">출생 정보</h3>
                
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    생년월일 (Birth Date) *
                  </label>
                  <Input
                    type="date"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700 mb-2">
                    출생 시간 (Birth Time) *
                  </label>
                  <Input
                    type="time"
                    id="birthTime"
                    value={formData.birthTime}
                    onChange={(e) => handleInputChange('birthTime', e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    전통 사주 분석을 위해 정확한 출생시간이 필요합니다.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">추가 정보 (선택사항)</h3>
                
                <div>
                  <label htmlFor="familyRole" className="block text-sm font-medium text-gray-700 mb-2">
                    가족 관계 (Family Role)
                  </label>
                  <select
                    id="familyRole"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.familyRole || ''}
                    onChange={(e) => handleInputChange('familyRole', e.target.value)}
                  >
                    <option value="">선택해주세요</option>
                    <option value="eldest">장남/장녀 (Eldest)</option>
                    <option value="middle">둘째 (Middle)</option>
                    <option value="youngest">막내 (Youngest)</option>
                    <option value="only">외동 (Only child)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="favoriteFood" className="block text-sm font-medium text-gray-700 mb-2">
                    좋아하는 음식 (Favorite Food)
                  </label>
                  <Input
                    type="text"
                    id="favoriteFood"
                    value={formData.favoriteFood}
                    onChange={(e) => handleInputChange('favoriteFood', e.target.value)}
                    placeholder="예: 매운음식, 피자, 파스타"
                  />
                </div>

                <div>
                  <label htmlFor="favoriteMusic" className="block text-sm font-medium text-gray-700 mb-2">
                    좋아하는 음악 (Favorite Music)
                  </label>
                  <Input
                    type="text"
                    id="favoriteMusic"
                    value={formData.favoriteMusic}
                    onChange={(e) => handleInputChange('favoriteMusic', e.target.value)}
                    placeholder="예: 클래식, 락, 재즈"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrev}
                disabled={step === 1}
                variant="outline"
                size="lg"
              >
                이전
              </Button>
              
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  size="lg"
                >
                  다음
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  이름 추천받기
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}