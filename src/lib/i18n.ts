export const translations = {
  ko: {
    // Home page
    heroTitle: "외국인을 위한 진지한 한국 이름 추천",
    heroSubtitle: "Korean Name Recommendation Service for Foreigners",
    heroDescription: "전통 오행 이론과 개인의 특성을 바탕으로 의미 있는 한국 이름을 찾아드립니다.",
    getNameButton: "내 한국 이름 받기",
    whyKoreanName: "왜 한국 이름이 필요한가요?",
    socialIntegration: "사회 적응",
    socialIntegrationDesc: "한국 동료들과의 원활한 소통과 신뢰 구축을 위해",
    culturalRespect: "문화적 존중",
    culturalRespectDesc: "한국 전통 작명법을 통한 정체성 형성",
    officialUse: "공식 사용",
    officialUseDesc: "학교, 직장에서 공식적으로 사용할 수 있는 이름",
    personalMeaning: "개인적 의미",
    personalMeaningDesc: "생년월일과 성격을 반영한 맞춤 추천",
    
    // Survey page
    profileCreation: "프로필 생성",
    basicInfo: "기본 정보",
    birthInfo: "출생 정보",
    additionalInfo: "추가 정보 (선택사항)",
    englishName: "영문 이름",
    nationality: "국적",
    gender: "성별",
    birthDate: "생년월일",
    birthTime: "출생 시간",
    familyRole: "가족 관계",
    favoriteFood: "좋아하는 음식",
    favoriteMusic: "좋아하는 음악",
    
    // Result page
    nameRecommendation: "당신을 위한 한국 이름 추천",
    resultDescription: "전통 오행 이론과 개인 특성을 바탕으로 선별된 4개의 이름 후보입니다.",
    compatibility: "적합도",
    meaning: "의미",
    explanation: "설명",
    saveThisName: "이 이름 저장하기",
    saved: "저장됨 ✓",
    startOver: "다시하기",
    
    // Common
    next: "다음",
    previous: "이전",
    submit: "제출",
    loading: "로딩 중...",
    male: "남성",
    female: "여성",
    other: "기타"
  },
  
  en: {
    // Home page
    heroTitle: "Serious Korean Name Recommendation for Foreigners",
    heroSubtitle: "Korean Name Recommendation Service for Foreigners",
    heroDescription: "Find meaningful Korean names based on traditional Five Elements theory and your personal characteristics.",
    getNameButton: "Get My Korean Name",
    whyKoreanName: "Why do you need a Korean name?",
    socialIntegration: "Social Integration",
    socialIntegrationDesc: "For smooth communication and trust building with Korean colleagues",
    culturalRespect: "Cultural Respect",
    culturalRespectDesc: "Identity formation through traditional Korean naming methods",
    officialUse: "Official Use",
    officialUseDesc: "Names that can be officially used in schools and workplaces",
    personalMeaning: "Personal Meaning",
    personalMeaningDesc: "Customized recommendations reflecting birth date and personality",
    
    // Survey page
    profileCreation: "Profile Creation",
    basicInfo: "Basic Information",
    birthInfo: "Birth Information",
    additionalInfo: "Additional Information (Optional)",
    englishName: "English Name",
    nationality: "Nationality",
    gender: "Gender",
    birthDate: "Birth Date",
    birthTime: "Birth Time",
    familyRole: "Family Role",
    favoriteFood: "Favorite Food",
    favoriteMusic: "Favorite Music",
    
    // Result page
    nameRecommendation: "Korean Name Recommendations for You",
    resultDescription: "4 name candidates selected based on traditional Five Elements theory and personal characteristics.",
    compatibility: "Compatibility",
    meaning: "Meaning",
    explanation: "Explanation",
    saveThisName: "Save This Name",
    saved: "Saved ✓",
    startOver: "Start Over",
    
    // Common
    next: "Next",
    previous: "Previous", 
    submit: "Submit",
    loading: "Loading...",
    male: "Male",
    female: "Female",
    other: "Other"
  },

  zh: {
    // Home page
    heroTitle: "为外国人提供的正式韩文名字推荐",
    heroSubtitle: "Korean Name Recommendation Service for Foreigners",
    heroDescription: "基于传统五行理论和个人特征，为您找到有意义的韩文名字。",
    getNameButton: "获取我的韩文名字",
    whyKoreanName: "为什么需要韩文名字？",
    socialIntegration: "社会融入",
    socialIntegrationDesc: "与韩国同事顺畅沟通和建立信任",
    culturalRespect: "文化尊重",
    culturalRespectDesc: "通过韩国传统命名法形成身份认同",
    officialUse: "正式使用",
    officialUseDesc: "可在学校、职场正式使用的名字",
    personalMeaning: "个人意义",
    personalMeaningDesc: "反映出生日期和性格的定制推荐",
    
    // Survey page
    profileCreation: "创建档案",
    basicInfo: "基本信息",
    birthInfo: "出生信息",
    additionalInfo: "附加信息（可选）",
    englishName: "英文名",
    nationality: "国籍",
    gender: "性别",
    birthDate: "出生日期",
    birthTime: "出生时间",
    familyRole: "家庭关系",
    favoriteFood: "最喜欢的食物",
    favoriteMusic: "最喜欢的音乐",
    
    // Result page
    nameRecommendation: "为您推荐的韩文名字",
    resultDescription: "基于传统五行理论和个人特征选出的4个名字候选。",
    compatibility: "匹配度",
    meaning: "含义",
    explanation: "说明",
    saveThisName: "保存此名字",
    saved: "已保存 ✓",
    startOver: "重新开始",
    
    // Common
    next: "下一步",
    previous: "上一步",
    submit: "提交",
    loading: "加载中...",
    male: "男",
    female: "女",
    other: "其他"
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ko;