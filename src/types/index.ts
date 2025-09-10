export interface SurveyData {
  englishName: string;
  nationality: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  birthTime: string;
  familyRole?: 'eldest' | 'middle' | 'youngest' | 'only';
  favoriteFood?: string;
  favoriteMusic?: string;
}

export interface NameCandidate {
  hangul: string;
  hanja: string[];
  meaning: string;
  pronunciation: string;
  score: number;
  explanation: string;
}

export interface Element {
  element: 'wood' | 'fire' | 'earth' | 'metal' | 'water';
  strength: number;
}

export interface BaziAnalysis {
  year: string;
  month: string;
  day: string;
  hour: string;
  elements: Element[];
  deficits: string[];
}

export interface HanjaCharacter {
  character: string;
  element: string;
  meaning: string;
  pronunciation: string;
  strokes: number;
}

export interface NameRoot {
  root: string;
  element: string;
  meaning: string;
  gender: string;
}