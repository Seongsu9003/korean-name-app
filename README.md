# Korean Name Recommendation Service

외국인을 위한 진지한 한국 이름 추천 서비스 - A serious Korean name recommendation service for foreigners living in Korea.

## Overview

This web application provides meaningful Korean name recommendations based on traditional Five Elements (오행) theory and personal characteristics. Users complete a survey about their birth information and preferences, and receive 4 culturally appropriate Korean name candidates with detailed explanations.

## Features

- **Multi-step Survey Form**: Collects essential information including birth date/time, family role, and personal preferences
- **Traditional Bazi Analysis**: Uses birth date/time to calculate Five Elements deficits 
- **Name Composition Engine**: Generates culturally appropriate names based on element analysis
- **Multilingual Support**: Korean, English, and Chinese interface (basic implementation)
- **Mobile-First Design**: Responsive card-based UI with accessibility features
- **Privacy Protection**: Clear data collection notices with localStorage-based storage

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with hero section
│   ├── survey/page.tsx    # Multi-step survey form
│   ├── result/page.tsx    # Name recommendations display
│   └── api/               # API routes
│       ├── surveys/       # Survey data processing
│       └── names/         # Name generation endpoint
├── components/
│   └── ui/                # Reusable UI components
│       └── LanguageToggle.tsx
├── lib/                   # Core business logic
│   ├── bazi-engine.ts     # Five Elements analysis
│   ├── name-composer.ts   # Name generation logic
│   └── i18n.ts           # Internationalization
├── data/                  # Static JSON datasets
│   ├── elements.json      # Five Elements mappings
│   ├── hanja_bank.json    # Character database (20 chars)
│   ├── name_roots.json    # Name root combinations
│   ├── bazi_rules.json    # Traditional calendar rules
│   ├── family_context.json # Family role preferences
│   ├── taste_hooks.json   # Food/music to element mapping
│   └── scoring_weights.json # Name scoring algorithm
└── types/
    └── index.ts          # TypeScript type definitions
```

## Core Algorithms

### Element Deficit Analysis (`getDeficitElements`)
Analyzes birth date/time using traditional Chinese calendar (간지/천간지지) to identify weakest elements in personal constitution.

### Name Candidate Composition (`composeCandidates`) 
Combines name roots and hanja characters based on:
- Deficit elements (primary factor)
- Family role preferences (eldest/middle/youngest)
- Personal taste alignment (food/music preferences)
- Cultural appropriateness and pronunciation

### Compatibility Scoring (`calculateScore`)
Weights multiple factors:
- Element balance restoration (40%)
- Family role alignment (20%) 
- Personal taste resonance (15%)
- Pronunciation ease (15%)
- Cultural significance (10%)

## Data Extension Guide

### Adding New Characters
Edit `src/data/hanja_bank.json`:
```json
{
  "element": [
    {
      "character": "新漢字",
      "meaning": "new meaning",
      "pronunciation": "hangul-pronunciation", 
      "strokes": 12
    }
  ]
}
```

### Extending Name Roots
Modify `src/data/name_roots.json` for gender-specific roots:
```json
{
  "male": {
    "wood": [
      { "root": "새루트", "hanja": "新漢字", "meaning": "new meaning" }
    ]
  }
}
```

### Cultural Rules Customization
Adjust scoring weights in `src/data/scoring_weights.json` and family preferences in `src/data/family_context.json`.

## AI Agent Integration Points

The application is designed to integrate with specialized AI agents for enhanced accuracy:

### Integration Locations

1. **Survey Data Normalizer** (`/api/surveys/route.ts:line 8`)
   ```typescript
   // TODO: Call survey-data-normalizer agent here
   const normalizedData = await normalizeSurveyData(surveyData);
   ```

2. **Element Analyzer** (`/api/names/recommend/route.ts:line 12`)
   ```typescript
   // TODO: Call element-analyzer agent here
   const elementAnalysis = await analyzeElements(surveyData);
   ```

3. **Name Composer** (`/api/names/recommend/route.ts:line 15`)
   ```typescript
   // TODO: Call korean-name-composer agent here
   const candidates = await composeNames(surveyData, deficitElements);
   ```

4. **Name Explainer** (`/api/names/recommend/route.ts:line 18`)
   ```typescript
   // TODO: Call korean-name-explainer agent here
   const explanations = await explainNames(candidates, surveyData);
   ```

### Agent Communication Format

Expected input/output formats for each agent:

```typescript
// Survey Data Normalizer
interface NormalizedSurveyData extends SurveyData {
  birthDateParsed: { year: number; month: number; day: number };
  birthTimeParsed: { hour: number; minute: number };
  tasteCategories: string[];
}

// Element Analyzer  
interface ElementAnalysis {
  deficitElements: string[];
  elementStrengths: Record<string, number>;
  recommendations: string[];
}

// Name Composer
interface NameComposition {
  candidates: NameCandidate[];
  reasoning: string;
  culturalNotes: string;
}
```

## Event Logging

Currently uses `console.log` for development. Events tracked:
- `survey_started` - User begins survey
- `survey_completed` - Survey submission successful
- `name_generated` - Name candidates created
- `name_saved` - User selects and saves a name

For production, replace with proper analytics:
```typescript
// Replace console.log with your analytics service
analytics.track('survey_started', { userId, timestamp });
```

## Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

Optimized for Vercel deployment:
```bash
# Deploy to Vercel
vercel --prod
```

Environment variables needed:
```env
# None required for basic functionality
# Add API keys here when integrating AI agents
```

## Contributing

1. Follow existing code patterns and TypeScript types
2. Maintain cultural sensitivity in name recommendations
3. Test with various birth date/time combinations
4. Ensure mobile responsiveness
5. Add comments for complex traditional calculations

## Cultural Considerations

- Names follow traditional Korean naming conventions
- Respects family hierarchy and gender considerations  
- Provides educational explanations for cultural elements
- Avoids overly casual or inappropriate combinations
- Maintains dignity and meaningfulness in all suggestions
