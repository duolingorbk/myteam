"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { Calendar, BookOpen, Award, LogOut, Settings, Edit3, Camera } from "lucide-react"
import './Profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [lessons, setLessons] = useState([])
  const [averageProgress, setAverageProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("progress")

  const getLessonProgress = (lessonId) => {
    const progress = localStorage.getItem(`lesson${lessonId}Progress`)
    return progress ? Number.parseInt(progress) : 0
  }

  const calculateAverageProgress = (lessonsArray) => {
    if (!lessonsArray.length) return 0
    const totalProgress = lessonsArray.reduce((sum, lesson) => sum + getLessonProgress(lesson.id), 0)
    return Math.round(totalProgress / lessonsArray.length)
  }

  const fetchLessonsAndProgress = async (language) => {
    try {
      const res = await axios.get(`http://localhost:3000/lesson/all/${language}`)
      setLessons(res.data)
      const average = calculateAverageProgress(res.data)
      setAverageProgress(average)
    } catch (err) {
      console.error("Error fetching lessons:", err)
    }
  }

  const handleAvatar = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/image/${id}`)
      setAvatar(res.data.image)
    } catch (err) {
      console.error("Error fetching avatar:", err)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setUser({
          id: decodedToken.id,
          name: decodedToken.name || "Unknown",
          email: decodedToken.email || "Unknown",
          joinDate: new Date(decodedToken.iat * 1000).toLocaleDateString(),
        })

        if (decodedToken.id) {
          handleAvatar(decodedToken.id)
        }

        fetchLessonsAndProgress("english")
      } catch (error) {
        console.error("Error decoding token:", error)
        window.location.href = "/user/login"
      }
    } else {
      window.location.href = "/user/login"
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/user/login"
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading profile...</div>
      </div>
    )
  }

  const achievements = [
    { name: "Fast Learner", description: "Complete 5 lessons in a day", icon: "🚀", progress: 3, total: 5 },
    { name: "Vocabulary Master", description: "Learn 100 new words", icon: "📚", progress: 75, total: 100 },
    { name: "Conversation Pro", description: "Complete all speaking exercises", icon: "🗣️", progress: 8, total: 10 },
    { name: "Grammar Guru", description: "Score 100% on 3 grammar quizzes", icon: "🏆", progress: 2, total: 3 },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {avatar ? (
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=96&width=96"
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-teal-200 flex items-center justify-center text-teal-600 text-3xl font-bold border-4 border-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full text-teal-600 hover:text-teal-800 transition-colors">
                    <Camera size={20} />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-teal-100">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                  <Settings size={20} />
                </button>
                <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                  <Edit3 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Member Since</h3>
                <p className="text-2xl font-bold text-gray-800">{user.joinDate}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Lessons Completed</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {lessons.filter((lesson) => getLessonProgress(lesson.id) === 100).length}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Overall Progress</h3>
                <div className="flex items-center">
                  <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${averageProgress}%` }}></div>
                  </div>
                  <span className="text-lg font-bold text-gray-800">{averageProgress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex justify-center -mb-px">
              <button
                onClick={() => setActiveTab("progress")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "progress"
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Lesson Progress
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "achievements"
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Achievements
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "progress" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Lesson Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lessons.map((lesson) => {
                    const progress = getLessonProgress(lesson.id)
                    return (
                      <div key={lesson.id} className="bg-white rounded-lg shadow p-4">
                        <h4 className="font-semibold mb-2">{lesson.title}</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">{progress}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="mt-2 flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-teal-600 h-2.5 rounded-full"
                              style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

