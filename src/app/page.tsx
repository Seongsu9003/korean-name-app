import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            외국인을 위한 진지한 한국 이름 추천
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Korean Name Recommendation Service for Foreigners
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            전통 오행 이론과 개인의 특성을 바탕으로 의미 있는 한국 이름을 찾아드립니다.
            <br />
            Find meaningful Korean names based on traditional Five Elements theory and your personal characteristics.
          </p>
          
          <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              왜 한국 이름이 필요한가요? / Why do you need a Korean name?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-2">사회 적응 / Social Integration</h3>
                <p className="text-gray-600">한국 동료들과의 원활한 소통과 신뢰 구축을 위해</p>
              </div>
              <div className="p-4 border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-800 mb-2">문화적 존중 / Cultural Respect</h3>
                <p className="text-gray-600">한국 전통 작명법을 통한 정체성 형성</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-800 mb-2">공식 사용 / Official Use</h3>
                <p className="text-gray-600">학교, 직장에서 공식적으로 사용할 수 있는 이름</p>
              </div>
              <div className="p-4 border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-800 mb-2">개인적 의미 / Personal Meaning</h3>
                <p className="text-gray-600">생년월일과 성격을 반영한 맞춤 추천</p>
              </div>
            </div>
          </div>

          <Link 
            href="/survey"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            내 한국 이름 받기 / Get My Korean Name
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
