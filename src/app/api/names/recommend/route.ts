import { NextRequest, NextResponse } from 'next/server';
import { SurveyData } from '@/types';
import { getDeficitElements } from '@/lib/bazi-engine';
import { composeCandidates } from '@/lib/name-composer';

export async function POST(request: NextRequest) {
  try {
    const surveyData: SurveyData = await request.json();
    
    console.log('Name recommendation request:', surveyData);

    // Step 1: Analyze deficit elements using Bazi
    const deficitElements = getDeficitElements(surveyData);
    console.log('Deficit elements identified:', deficitElements);

    // Step 2: Compose name candidates
    const candidates = composeCandidates(surveyData, deficitElements);
    console.log('Name candidates generated:', candidates.length);

    // AI Agent integration points (for future implementation)
    // TODO: Call survey-data-normalizer agent here
    // TODO: Call element-analyzer agent here  
    // TODO: Call korean-name-composer agent here
    // TODO: Call korean-name-explainer agent here

    return NextResponse.json({
      success: true,
      candidates,
      analysis: {
        deficitElements,
        totalCandidates: candidates.length
      }
    });

  } catch (error) {
    console.error('Name recommendation error:', error);
    
    // Fallback response
    const fallbackCandidates = [
      {
        hangul: '지민',
        hanja: ['智', '民'],
        meaning: 'wisdom, people',
        pronunciation: 'ji-min',
        score: 75,
        explanation: '지혜로운 시민이라는 뜻으로, 한국 사회에 잘 적응할 수 있는 이름입니다.'
      },
      {
        hangul: '현수',
        hanja: ['賢', '秀'],
        meaning: 'wise, excellent',
        pronunciation: 'hyeon-su',
        score: 72,
        explanation: '현명하고 뛰어나다는 의미로, 학업과 사회생활에서 성공을 기원하는 이름입니다.'
      },
      {
        hangul: '민정',
        hanja: ['敏', '靜'],
        meaning: 'quick, calm',
        pronunciation: 'min-jeong',
        score: 70,
        explanation: '빠르고 침착하다는 뜻으로, 균형잡힌 성격을 나타내는 이름입니다.'
      },
      {
        hangul: '서연',
        hanja: ['瑞', '娟'],
        meaning: 'auspicious, beautiful',
        pronunciation: 'seo-yeon',
        score: 68,
        explanation: '상서롭고 아름답다는 의미로, 밝은 미래를 상징하는 이름입니다.'
      }
    ];

    return NextResponse.json({
      success: true,
      candidates: fallbackCandidates,
      analysis: {
        deficitElements: ['wood', 'fire'],
        totalCandidates: 4,
        fallback: true
      }
    });
  }
}