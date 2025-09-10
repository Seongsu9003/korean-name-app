import { SurveyData, NameCandidate } from '@/types';
import nameRoots from '@/data/name_roots.json';
import hanjaBank from '@/data/hanja_bank.json';
import familyContext from '@/data/family_context.json';
import tasteHooks from '@/data/taste_hooks.json';
import scoringWeights from '@/data/scoring_weights.json';

/**
 * Composes name candidates based on deficit elements and user preferences
 */
export function composeCandidates(surveyData: SurveyData, deficitElements: string[]): NameCandidate[] {
  try {
    const gender = surveyData.gender === 'female' ? 'female' : 'male';
    const candidates: NameCandidate[] = [];

    for (let i = 0; i < 4; i++) {
      const element = deficitElements[i % deficitElements.length];
      const roots = nameRoots[gender][element as keyof typeof nameRoots.male] || [];
      const hanjaChars = hanjaBank[element as keyof typeof hanjaBank] || [];

      if (roots.length > 0 && hanjaChars.length > 0) {
        const root = roots[i % roots.length];
        const suffix = hanjaChars[Math.floor(Math.random() * hanjaChars.length)];
        
        const hangul = root.root + getHangulFromHanja(suffix.character);
        const hanja = [root.hanja, suffix.character];
        const meaning = `${root.meaning}, ${suffix.meaning}`;
        const pronunciation = `${root.root}-${suffix.pronunciation}`;
        
        const candidate: NameCandidate = {
          hangul,
          hanja,
          meaning,
          pronunciation,
          score: calculateScore(surveyData, element, root.meaning, suffix.meaning),
          explanation: generateExplanation(surveyData, element, root.meaning, suffix.meaning)
        };

        candidates.push(candidate);
      }
    }

    return candidates.length > 0 ? candidates : generateFallbackCandidates(surveyData);
  } catch (error) {
    console.error('Name composition error:', error);
    return generateFallbackCandidates(surveyData);
  }
}

function getHangulFromHanja(hanja: string): string {
  const hanjaToHangul: Record<string, string> = {
    '木': '목', '林': '림', '森': '삼', '竹': '죽', '春': '춘',
    '火': '화', '日': '일', '明': '명', '光': '광', '熙': '희',
    '土': '토', '山': '산', '石': '석', '田': '전', '地': '지',
    '金': '금', '銀': '은', '鐵': '철', '玉': '옥', '珠': '주',
    '水': '수', '江': '강', '海': '해', '雨': '우', '雪': '설'
  };
  return hanjaToHangul[hanja] || '은';
}

/**
 * Calculates compatibility score for name candidates
 */
function calculateScore(surveyData: SurveyData, element: string, rootMeaning: string, suffixMeaning: string): number {
  let score = 70; // base score
  
  // Element alignment bonus
  if (element) score += 15;
  
  // Family role alignment
  if (surveyData.familyRole && familyContext.familyRoles[surveyData.familyRole]?.preferredElements.includes(element)) {
    score += 10;
  }
  
  // Taste alignment
  if (surveyData.favoriteFood) {
    const foodTaste = Object.entries(tasteHooks.food).find(([key]) => 
      surveyData.favoriteFood?.toLowerCase().includes(key)
    );
    if (foodTaste && foodTaste[1].element === element) {
      score += 5;
    }
  }
  
  if (surveyData.favoriteMusic) {
    const musicTaste = Object.entries(tasteHooks.music).find(([key]) => 
      surveyData.favoriteMusic?.toLowerCase().includes(key)
    );
    if (musicTaste && musicTaste[1].element === element) {
      score += 5;
    }
  }
  
  // Add some randomness for variety
  score += Math.floor(Math.random() * 10) - 5;
  
  return Math.min(Math.max(score, 60), 95);
}

function generateExplanation(surveyData: SurveyData, element: string, rootMeaning: string, suffixMeaning: string): string {
  const explanations = [
    `${element} 기운을 보강하여 균형을 이루며, ${rootMeaning}의 의미로 ${surveyData.gender === 'female' ? '우아하고 지혜로운' : '강건하고 의지가 굳은'} 인상을 줍니다.`,
    `전통 오행에서 ${element} 요소가 부족한 당신에게 필요한 기운을 담고 있으며, ${rootMeaning}와 ${suffixMeaning}의 조화로 완성됩니다.`,
    `${surveyData.nationality} 출신으로서 한국 문화에 적응할 때 도움이 될 ${element} 기운과 함께, ${rootMeaning}의 깊은 의미를 담았습니다.`,
    `생년월일 분석 결과 ${element} 요소 보강이 필요하며, 이 이름은 ${rootMeaning}과 ${suffixMeaning}의 의미로 균형잡힌 인생을 상징합니다.`
  ];
  
  return explanations[Math.floor(Math.random() * explanations.length)];
}

function generateFallbackCandidates(surveyData: SurveyData): NameCandidate[] {
  const fallbacks = [
    {
      hangul: surveyData.gender === 'female' ? '지혜' : '현우',
      hanja: surveyData.gender === 'female' ? ['智', '慧'] : ['賢', '宇'],
      meaning: surveyData.gender === 'female' ? 'wisdom, intelligence' : 'wise, universe',
      pronunciation: surveyData.gender === 'female' ? 'ji-hye' : 'hyeon-u',
      score: 75,
      explanation: '전통적인 의미를 담은 균형잡힌 이름입니다.'
    },
    {
      hangul: surveyData.gender === 'female' ? '미영' : '준호',
      hanja: surveyData.gender === 'female' ? ['美', '英'] : ['俊', '浩'],
      meaning: surveyData.gender === 'female' ? 'beauty, flower' : 'handsome, vast',
      pronunciation: surveyData.gender === 'female' ? 'mi-yeong' : 'jun-ho',
      score: 70,
      explanation: '한국에서 널리 사랑받는 전통적인 이름입니다.'
    }
  ];
  
  return fallbacks;
}