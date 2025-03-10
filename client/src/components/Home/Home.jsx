"use client"

import { useState, useEffect } from "react"
import "../Home/Home.css"

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("French")
  const [dailyPhrase, setDailyPhrase] = useState({ phrase: "", translation: "" })
  const [showTranslation, setShowTranslation] = useState(false)
  const [email, setEmail] = useState("")
  
  const [activeTab, setActiveTab] = useState("beginner")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  

  // Check if user is logged in

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])
  // Daily phrases by language
  const dailyPhrases = {
    French: { phrase: "Comment allez-vous?", translation: "How are you?" },
    Spanish: { phrase: "¿Cómo estás?", translation: "How are you?" },
    Japanese: { phrase: "お元気ですか?", translation: "How are you?" },
    German: { phrase: "Wie geht es dir?", translation: "How are you?" },
  }

  // Update daily phrase when language changes
  useEffect(() => {
    setDailyPhrase(dailyPhrases[selectedLanguage] || dailyPhrases.French)
    setShowTranslation(false)
  }, [selectedLanguage])

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
  }

  const handleStartLearning = () => {
    const token = localStorage.getItem("token")
    if (token) {
      window.location.href = "/select-language"
    } else {
      window.location.href = "/user/signup"
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Thank you for subscribing with ${email}! You'll receive weekly language tips.`)
    setEmail("")
  }

  const languages = [
    { name: "French", flag: "/placeholder.svg?height=60&width=60", popular: true },
    { name: "Spanish", flag: "/placeholder.svg?height=60&width=60", popular: true },
    { name: "Japanese", flag: "/placeholder.svg?height=60&width=60", popular: true },
    { name: "German", flag: "/placeholder.svg?height=60&width=60", popular: true },
  ]

  const gameOptions = [
    { name: "Word Match", description: "Match words with their translations", icon: "🎮" },
    { name: "Flashcards", description: "Test your vocabulary knowledge", icon: "🃏" },
    { name: "Sentence Builder", description: "Create correct sentences", icon: "🔤" },
    { name: "Pronunciation", description: "Practice your accent", icon: "🎤" },
  ]

  const achievements = [
    { name: "First Lesson", description: "Complete your first lesson", icon: "🏆", xp: 50 },
    { name: "Week Streak", description: "Practice 7 days in a row", icon: "🔥", xp: 100 },
    { name: "Vocabulary Master", description: "Learn 100 words", icon: "📚", xp: 200 },
    { name: "Conversation Ready", description: "Complete all beginner lessons", icon: "💬", xp: 500 },
  ]

  const learningPaths = {
    beginner: [
      { title: "Greetings & Introductions", level: "Beginner", lessons: 5, time: "25 min" },
      { title: "Basic Phrases", level: "Beginner", lessons: 8, time: "40 min" },
      { title: "Numbers & Counting", level: "Beginner", lessons: 6, time: "30 min" },
    ],
    intermediate: [
      { title: "Daily Conversations", level: "Intermediate", lessons: 10, time: "50 min" },
      { title: "Travel Vocabulary", level: "Intermediate", lessons: 12, time: "60 min" },
      { title: "Past Tense Mastery", level: "Intermediate", lessons: 8, time: "40 min" },
    ],
    advanced: [
      { title: "Complex Discussions", level: "Advanced", lessons: 15, time: "75 min" },
      { title: "Idioms & Expressions", level: "Advanced", lessons: 10, time: "50 min" },
      { title: "Cultural Nuances", level: "Advanced", lessons: 12, time: "60 min" },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="text-teal-600 text-3xl">🌐</span>
              <span className="text-xl font-bold">SpeakEasy</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Home
            </a>
            <a href="/lessons" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Lessons
            </a>
            <a href="/practice" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Practice
            </a>
            <a href="/community" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Community
            </a>
            <a href="/pricing" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <a href="/profile" className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                    👤
                  </span>
                  <span>Profile</span>
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("token")
                    setIsLoggedIn(false)
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <a href="/user/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                  Log in
                </a>
                <a
                  href="/user/signup"
                  className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Sign up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="/lessons" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Lessons
              </a>
              <a href="/practice" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Practice
              </a>
              <a href="/community" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Community
              </a>
              <a href="/pricing" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </a>

              <div className="pt-4 border-t">
                {isLoggedIn ? (
                  <>
                    <a href="/profile" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token")
                        setIsLoggedIn(false)
                        setIsMenuOpen(false)
                      }}
                      className="block py-2 text-sm font-medium text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/user/login"
                      className="block py-2 text-sm font-medium border border-gray-300 rounded-md text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </a>
                    <a
                      href="/user/signup"
                      className="block py-2 mt-2 text-sm font-medium bg-teal-600 text-white rounded-md text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </a>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Speak a new language in <span className="text-teal-600">10 minutes</span> a day
              </h1>
              <p className="text-lg text-gray-700 max-w-lg">
                Set realistic goals. Get advice from native speakers. Make real progress. Discover a world of
                opportunities by learning another language.
              </p>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★★★★</span>
                <span className="text-yellow-400">★</span>
                <span className="ml-2 text-sm text-gray-600">4.8/5 from over 10,000 learners</span>
              </div>
              <button
                onClick={handleStartLearning}
                className="px-8 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-base font-medium flex items-center"
              >
                Start learning now
                <span className="ml-2">→</span>
              </button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-3 rounded-lg shadow-md mb-2 text-center font-medium">Hello!</div>
                  <img
                    alt="Person with Hello speech bubble"
                    className="rounded-full border-4 border-white shadow-lg"
                    height="120"
                    width="120"
                    src="/placeholder.svg?height=120&width=120"
                  />
                </div>
                <div className="flex flex-col items-center mt-12">
                  <div className="bg-white p-3 rounded-lg shadow-md mb-2 text-center font-medium">Salut!</div>
                  <img
                    alt="Person with Salut speech bubble"
                    className="rounded-full border-4 border-white shadow-lg"
                    height="120"
                    width="120"
                    src="/placeholder.svg?height=120&width=120"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-3 rounded-lg shadow-md mb-2 text-center font-medium">Ciao!</div>
                  <img
                    alt="Person with Ciao speech bubble"
                    className="rounded-full border-4 border-white shadow-lg"
                    height="120"
                    width="120"
                    src="/placeholder.svg?height=120&width=120"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Phrase Section - NEW */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Daily Phrase in {selectedLanguage}</h2>
            <p className="text-3xl font-bold mb-4">{dailyPhrase.phrase}</p>

            {showTranslation ? (
              <p className="text-xl mb-6">{dailyPhrase.translation}</p>
            ) : (
              <button
                onClick={() => setShowTranslation(true)}
                className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-100 transition-colors mb-6"
              >
                Reveal Translation
              </button>
            )}

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {languages.map((language) => (
                <button
                  key={language.name}
                  onClick={() => handleLanguageSelect(language.name)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedLanguage === language.name
                      ? "bg-white text-teal-600 font-bold"
                      : "bg-teal-600/30 text-white hover:bg-teal-600/50"
                  }`}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">I want to learn</h2>
          <div className="relative max-w-3xl mx-auto">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 text-gray-600">
              ←
            </button>
            <div className="flex justify-center gap-6 overflow-hidden px-10">
              {languages.map((language) => (
                <div
                  key={language.name}
                  onClick={() => setSelectedLanguage(language.name)}
                  className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
                    selectedLanguage === language.name
                      ? "bg-teal-50 border-2 border-teal-500"
                      : "bg-white border-2 border-transparent hover:border-teal-300"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-3">
                    <img
                      src={language.flag || "/placeholder.svg"}
                      alt={`${language.name} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className={`font-medium ${selectedLanguage === language.name ? "text-teal-600" : "text-gray-700"}`}
                  >
                    {language.name}
                  </p>
                </div>
              ))}
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 text-gray-600">
              →
            </button>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => (window.location.href = "/all-languages")}
              className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              View all languages
            </button>
          </div>
        </div>
      </section>

      {/* Learning Paths Section - NEW */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Personalized Learning Paths</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the path that matches your current level and goals
          </p>

          <div className="flex justify-center mb-8 border-b">
            <button
              onClick={() => setActiveTab("beginner")}
              className={`px-6 py-3 font-medium ${
                activeTab === "beginner"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => setActiveTab("intermediate")}
              className={`px-6 py-3 font-medium ${
                activeTab === "intermediate"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Intermediate
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`px-6 py-3 font-medium ${
                activeTab === "advanced"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Advanced
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths[activeTab].map((path, index) => (
              <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium">
                      {path.level}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{path.lessons} lessons</span>
                    <span className="mx-2">•</span>
                    <span>{path.time}</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Master essential {activeTab} concepts with interactive lessons and native speaker audio.
                  </p>
                  <button
                    onClick={handleStartLearning}
                    className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Games Section - NEW */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Learn Through Play</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Make learning fun with our interactive language games
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameOptions.map((game, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <button
                  onClick={() => (window.location.href = `/games/${game.name.toLowerCase().replace(" ", "-")}`)}
                  className="px-4 py-2 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 transition-colors"
                >
                  Play Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement System - NEW */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Earn Achievements</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Track your progress and earn rewards as you learn
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{achievement.name}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm inline-block">
                  +{achievement.xp} XP
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleStartLearning}
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Start Earning Achievements
            </button>
          </div>
        </div>
      </section>

      {/* Community Section - NEW */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Join Our Global Community</h2>
          <p className="text-center max-w-2xl mx-auto mb-12 text-white/90">
            Connect with language learners and native speakers from around the world
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Language Exchange</h3>
              <p className="mb-4 text-white/90">Practice with native speakers and help others learn your language</p>
              <button
                onClick={() => (window.location.href = "/community/exchange")}
                className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                Find Partners
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Discussion Forums</h3>
              <p className="mb-4 text-white/90">Ask questions and share tips with fellow language learners</p>
              <button
                onClick={() => (window.location.href = "/community/forums")}
                className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                Join Discussions
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Group Challenges</h3>
              <p className="mb-4 text-white/90">Participate in weekly challenges and compete with friends</p>
              <button
                onClick={() => (window.location.href = "/community/challenges")}
                className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                View Challenges
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section - NEW */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=600&width=300"
                alt="SpeakEasy Mobile App"
                className="mx-auto md:ml-0 max-w-[300px] rounded-3xl shadow-xl"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Learn Anytime, Anywhere</h2>
              <p className="text-lg text-gray-700">
                Download the SpeakEasy mobile app and continue your language learning journey on the go. Practice
                offline, set reminders, and track your progress from your phone.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => (window.location.href = "/download/ios")}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-base font-semibold">App Store</div>
                  </div>
                </button>

                <button
                  onClick={() => (window.location.href = "/download/android")}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-base font-semibold">Google Play</div>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <span>4.8/5 on App Store</span>
                <span className="text-gray-300">|</span>
                <div className="flex">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <span>4.7/5 on Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - NEW */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get Weekly Language Tips</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for free language learning resources, tips, and updates
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-teal-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your language journey?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join the SpeakEasy community and discover the joy of speaking a new language
          </p>
          <button
            onClick={handleStartLearning}
            className="px-8 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-base font-medium"
          >
            Start learning for free
          </button>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-teal-400 text-2xl">🌐</span>
                <span className="text-xl font-bold text-white">SpeakEasy</span>
              </div>
              <p className="text-gray-400 mb-4">
                Learn a new language in just 10 minutes a day with our scientifically-proven method.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="text-2xl">📱</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="text-2xl">💻</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="text-2xl">📧</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/lessons" className="text-gray-400 hover:text-white transition-colors">
                    Lessons
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Popular Languages</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/languages/english" className="text-gray-400 hover:text-white transition-colors">
                    English
                  </a>
                </li>
                <li>
                  <a href="/languages/spanish" className="text-gray-400 hover:text-white transition-colors">
                    Spanish
                  </a>
                </li>
                <li>
                  <a href="/languages/french" className="text-gray-400 hover:text-white transition-colors">
                    French
                  </a>
                </li>
                <li>
                  <a href="/languages/german" className="text-gray-400 hover:text-white transition-colors">
                    German
                  </a>
                </li>
                <li>
                  <a href="/languages/japanese" className="text-gray-400 hover:text-white transition-colors">
                    Japanese
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2 mt-0.5">📍</span>
                  <span className="text-gray-400">
                    123 Language Street
                    <br />
                    San Francisco, CA 94103
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-400 mr-2">📞</span>
                  <a href="tel:+1-555-123-4567" className="text-gray-400 hover:text-white">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-400 mr-2">📧</span>
                  <a href="mailto:info@speakeasy.com" className="text-gray-400 hover:text-white">
                    info@speakeasy.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SpeakEasy. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-white text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

