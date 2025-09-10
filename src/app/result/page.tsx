'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NameCandidate } from '@/types';

export default function Result() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<NameCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedName, setSelectedName] = useState<NameCandidate | null>(null);

  useEffect(() => {
    const generateNames = async () => {
      try {
        const surveyData = localStorage.getItem('surveyData');
        if (!surveyData) {
          router.push('/survey');
          return;
        }

        const response = await fetch('/api/names/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: surveyData
        });

        if (response.ok) {
          const data = await response.json();
          setCandidates(data.candidates);
          console.log('name_generated');
        }
      } catch (error) {
        console.error('Name generation error:', error);
      } finally {
        setLoading(false);
      }
    };

    generateNames();
  }, [router]);

  const handleSaveName = (candidate: NameCandidate) => {
    setSelectedName(candidate);
    localStorage.setItem('selectedName', JSON.stringify(candidate));
    console.log('name_saved');
  };

  const handleRestart = () => {
    localStorage.removeItem('surveyData');
    localStorage.removeItem('selectedName');
    router.push('/survey');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">당신을 위한 특별한 한국 이름을 만들고 있습니다...</p>
          <p className="text-gray-500">Creating your special Korean name...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              당신을 위한 한국 이름 추천
            </h1>
            <p className="text-gray-600">
              전통 오행 이론과 개인 특성을 바탕으로 선별된 4개의 이름 후보입니다.
            </p>
          </div>

          {selectedName && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 font-medium">
                  &ldquo;{selectedName.hangul}&rdquo;이(가) 저장되었습니다!
                </span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {candidates.map((candidate, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {candidate.hangul}
                  </h3>
                  <div className="text-xl text-gray-600 mb-2">
                    {candidate.hanja.map((char, i) => (
                      <span key={i} className="inline-block mx-1 hover:bg-gray-100 px-1 rounded" title={`${char} 의미 보기`}>
                        {char}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">[{candidate.pronunciation}]</p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">적합도</span>
                    <span className="text-sm font-bold text-blue-600">{candidate.score}점</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${candidate.score}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">의미</h4>
                  <p className="text-gray-600 text-sm">{candidate.meaning}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">설명</h4>
                  <p className="text-gray-600 text-sm">{candidate.explanation}</p>
                </div>

                <button
                  onClick={() => handleSaveName(candidate)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedName?.hangul === candidate.hangul
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {selectedName?.hangul === candidate.hangul ? '저장됨 ✓' : '이 이름 저장하기'}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
            >
              다시하기 / Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}