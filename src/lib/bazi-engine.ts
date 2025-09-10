import { SurveyData, BaziAnalysis, Element } from '@/types';
import elementsData from '@/data/elements.json';
import baziRules from '@/data/bazi_rules.json';

/**
 * Analyzes deficit elements based on birth date and time using traditional Bazi principles
 */
export function getDeficitElements(surveyData: SurveyData): string[] {
  const { birthDate, birthTime } = surveyData;
  
  try {
    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = parseInt(birthTime.split(':')[0]);

    const yearData = baziRules.yearBranches.find(y => y.year === year) || 
                    baziRules.yearBranches[year % baziRules.yearBranches.length];
    
    const monthBranch = baziRules.monthBranches[month.toString() as keyof typeof baziRules.monthBranches];
    
    const hourKey = getHourBranch(hour);
    const hourBranch = baziRules.hourBranches[hourKey as keyof typeof baziRules.hourBranches];

    const yearElement = elementsData.earthlyBranches[yearData.branch as keyof typeof elementsData.earthlyBranches]?.element;
    const monthElement = elementsData.earthlyBranches[monthBranch as keyof typeof elementsData.earthlyBranches]?.element;
    const hourElement = elementsData.earthlyBranches[hourBranch as keyof typeof elementsData.earthlyBranches]?.element;

    const elementCounts: Record<string, number> = {
      wood: 0, fire: 0, earth: 0, metal: 0, water: 0
    };

    if (yearElement) elementCounts[yearElement]++;
    if (monthElement) elementCounts[monthElement]++;
    if (hourElement) elementCounts[hourElement]++;
    
    const sortedElements = Object.entries(elementCounts)
      .sort(([,a], [,b]) => a - b)
      .map(([element]) => element);

    return sortedElements.slice(0, 2);
  } catch (error) {
    console.error('Bazi analysis error:', error);
    return ['wood', 'fire'];
  }
}

function getHourBranch(hour: number): string {
  if (hour >= 23 || hour < 1) return '23-01';
  if (hour >= 1 && hour < 3) return '01-03';
  if (hour >= 3 && hour < 5) return '03-05';
  if (hour >= 5 && hour < 7) return '05-07';
  if (hour >= 7 && hour < 9) return '07-09';
  if (hour >= 9 && hour < 11) return '09-11';
  if (hour >= 11 && hour < 13) return '11-13';
  if (hour >= 13 && hour < 15) return '13-15';
  if (hour >= 15 && hour < 17) return '15-17';
  if (hour >= 17 && hour < 19) return '17-19';
  if (hour >= 19 && hour < 21) return '19-21';
  return '21-23';
}