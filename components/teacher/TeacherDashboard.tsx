"use client"
import { useState } from "react";
import { Users, BookOpen, FileText, BarChart3, ArrowRight, ChevronRight, Clock, Edit, TrendingUp, TrendingDown } from "lucide-react";

export default function TeacherDashboard() {
  const stats = [
    {
      icon: Users,
      value: "115",
      label: "Total étudiants",
      change: "+12%",
      changeType: "up",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-primary",
    },
    {
      icon: BookOpen,
      value: "4",
      label: "Cours actifs",
      change: "-8%",
      changeType: "down",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      icon: FileText,
      value: "16",
      label: "Devoirs en attente",
      change: "+8%",
      changeType: "up",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      icon: BarChart3,
      value: "15.2/20",
      label: "Note moyenne classe",
      change: "+16.5",
      changeType: "up",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      studentName: "Marie Dubois",
      avatar: "MD",
      title: "Projet Machine Learning",
      course: "Intelligence Artificielle",
      date: "01/12/2025 14:38",
      score: null,
    },
    {
      id: 2,
      studentName: "Thomas Martin",
      avatar: "TM",
      title: "Optimisation SQL",
      course: "Bases de Données Avancées",
      date: "01/12/2025 11:15",
      score: null,
    },
    {
      id: 3,
      studentName: "Sophie Laurent",
      avatar: "SL",
      title: "Analyse de vulnérabilités",
      course: "Sécurité Informatique",
      date: "30/11/2025 16:45",
      score: "17/20",
    },
    {
      id: 4,
      studentName: "Lucas Bernard",
      avatar: "LB",
      title: "Réseaux de neurones",
      course: "Intelligence Artificielle",
      date: "30/11/2025 09:28",
      score: null,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Créer un cours",
      subtitle: "Préparez vos modules de matière",
      icon: BookOpen,
      bgColor: "bg-blue-500",
      link: "/admin/cours/creer",
    },
    {
      id: 2,
      title: "Nouveau devoir",
      subtitle: "Créer une évaluation",
      icon: FileText,
      bgColor: "bg-orange-500",
      link: "#",
    },
    {
      id: 3,
      title: "Publier annonce",
      subtitle: "Informer les étudiants",
      icon: FileText,
      bgColor: "bg-orange-500",
      link: "#",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Intelligence Artificielle et Machine Learning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      description: 'Intelligence Artificielle et Machine Learning',
      schedule: "Lundi 04/12 à 14h00",
    },
    {
      id: 2,
      title: "Bases de Données Avancées",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
      description: "Bases de Données Avancées",
      schedule: "Mardi 05/12 à 10h00",
    },
    {
      id: 3,
      title: "Sécurité Informatique",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      description: "Sécurité Informatique",
      schedule: "Mercredi 06/12 à 16h00",
    },
    {
      id: 4,
      title: "Développement Web Avancé",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      description: "Développement Web Avancé",
      schedule: "Jeudi 07/12 à 09h00",
    },
  ];

  return (
      <div className="px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <a href="/" className="text-sm font-open-sans text-gray-600 hover:text-blue-primary transition-colors">
            Accueil
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-open-sans text-gray-900">Tableau de bord enseignant</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-open-sans font-bold text-gray-900">Tableau de bord enseignant</h1>
          <p className="text-sm font-open-sans text-gray-600 mt-1">
            Gérez vos cours, évaluez les étudiants et suivez les performances
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center gap-1">
                  {stat.changeType === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-xs font-open-sans ${stat.changeType === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-3xl font-open-sans font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-open-sans text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-[1fr,400px] gap-6 mb-8">
          {/* Recent Submissions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-open-sans font-semibold text-gray-900">Soumissions récentes</h2>
              <a href="#" className="text-sm font-open-sans text-blue-primary hover:underline">
                Voir tout
              </a>
            </div>

            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-white font-open-sans">{submission.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-sm font-open-sans font-semibold text-gray-900">
                          {submission.studentName}
                        </div>
                        <div className="text-sm font-open-sans text-gray-900 mt-0.5">
                          {submission.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-xs font-open-sans text-gray-600">{submission.course}</div>
                          {submission.score && (
                            <div className="text-xs font-open-sans text-emerald-600 font-semibold">
                              ✓ {submission.score}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs font-open-sans text-gray-500">{submission.date}</div>
                        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-open-sans font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <a
                  key={action.id}
                  href={action.link}
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-open-sans font-semibold text-gray-900">{action.title}</div>
                      <div className="text-xs font-open-sans text-gray-600 mt-0.5">{action.subtitle}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mes Cours Section */}
        <div>
          <h2 className="text-lg font-open-sans font-semibold text-gray-900 mb-4">Mes cours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative h-40 bg-gray-200">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-open-sans font-semibold text-gray-900 mb-1 line-clamp-2 h-10">
                    {course.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs font-open-sans text-gray-600">
                      <span>{course.description}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-open-sans text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.schedule}</span>
                    </div>
                   
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 h-9 bg-primary text-white text-sm font-open-sans font-semibold rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Gérer
                    </button>
                    <button className="w-9 h-9 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
