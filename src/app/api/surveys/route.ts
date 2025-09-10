import { NextRequest, NextResponse } from 'next/server';
import { SurveyData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const surveyData: SurveyData = await request.json();
    
    const normalizedData = {
      englishName: surveyData.englishName.trim(),
      nationality: surveyData.nationality,
      gender: surveyData.gender,
      birthDate: surveyData.birthDate,
      birthTime: surveyData.birthTime,
      familyRole: surveyData.familyRole || null,
      favoriteFood: surveyData.favoriteFood?.trim() || null,
      favoriteMusic: surveyData.favoriteMusic?.trim() || null,
      timestamp: new Date().toISOString()
    };

    console.log('Survey data received and normalized:', normalizedData);

    return NextResponse.json({ 
      success: true, 
      data: normalizedData 
    });
  } catch (error) {
    console.error('Survey API error:', error);
    return NextResponse.json(
      { error: 'Failed to process survey data' },
      { status: 500 }
    );
  }
}