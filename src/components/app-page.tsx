'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, Calendar, MapPin, Video, User, ExternalLink, MessageSquare, Layout, Zap, Search, Inbox, Clock, Mail, Brain, BarChart, Sparkles, BookOpen, Hourglass, Target, Check, Users, Headphones, Star, Shield, Briefcase } from 'lucide-react'
import Link from 'next/link'

export function AppPage() {  // Changed from Page to AppPage
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showPricing, setShowPricing] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedTier, setSelectedTier] = useState('premium')
  const intelligentFeaturesRef = useRef<HTMLElement>(null)
  const pricingSectionRef = useRef<HTMLElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const cards = document.querySelectorAll('.pricing-card')
      let maxHeight = 0
      cards.forEach((card) => {
        const height = card.getBoundingClientRect().height
        maxHeight = Math.max(maxHeight, height)
      })
      cards.forEach((card) => {
        ;(card as HTMLElement).style.height = `${maxHeight}px`
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
    setShowPricing(false)
  }

  const scrollToIntelligentFeatures = () => {
    intelligentFeaturesRef.current?.scrollIntoView({ behavior: 'smooth' })
    setShowPricing(false)
  }

  const togglePricing = () => {
    setShowPricing(!showPricing)
    if (!showPricing) {
      setTimeout(() => {
        pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      scrollToTop()
    }
  }

  const tiers = [
    {
      id: 'free',
      name: 'Free Tier',
      price: 'Free',
      features: [
        { text: 'Clutter-Free Interface', icon: <Mail className="w-5 h-5" /> },
        { text: 'Efficient Parsing', icon: <Zap className="w-5 h-5" /> },
        { text: 'Text to UI (10 emails/day)', icon: <Sparkles className="w-5 h-5" /> },
      ],
      cta: 'Get Started',
    },
    {
      id: 'premium',
      name: 'Premium Tier',
      price: isAnnual ? '$53.89/year' : '$4.99/month',
      features: [
        { text: 'All Free Tier Features', icon: <Star className="w-5 h-5" /> },
        { text: 'AI Summarization & Replies', icon: <Zap className="w-5 h-5" /> },
        { text: 'Unlimited Text to UI', icon: <Sparkles className="w-5 h-5" /> },
        { text: 'AI PowerSearch', icon: <Search className="w-5 h-5" /> },
      ],
      cta: 'Upgrade to Premium',
    },
    {
      id: 'business',
      name: 'Business Tier',
      price: isAnnual ? '$129.49/user/year' : '$11.99/user/month',
      features: [
        { text: 'All Premium Tier Features', icon: <Star className="w-5 h-5" /> },
        { text: 'Team Collaboration Tools', icon: <Users className="w-5 h-5" /> },
        { text: 'Advanced Analytics', icon: <BarChart className="w-5 h-5" /> },
        { text: 'Priority Customer Support', icon: <Headphones className="w-5 h-5" /> },
        { text: 'Job-Specific Summarization', icon: <Briefcase className="w-5 h-5" /> },
      ],
      cta: 'Contact Sales',
    },
  ]

  const featureComparison = [
    { name: 'Clutter-Free Interface', free: true, premium: true, business: true },
    { name: 'Efficient Parsing', free: true, premium: true, business: true },
    { name: 'Text to UI', free: '10 emails/day', premium: 'Unlimited', business: 'Unlimited' },
    { name: 'AI Summarization & Replies', free: false, premium: true, business: true },
    { name: 'AI PowerSearch', free: false, premium: true, business: true },
    { name: 'Team Collaboration Tools', free: false, premium: false, business: true },
    { name: 'Advanced Analytics', free: false, premium: false, business: true },
    { name: 'Priority Customer Support', free: false, premium: false, business: true },
    { name: 'Job-Specific Summarization', free: false, premium: false, business: true },
  ]

  return (
    <div ref={topRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-['Inter',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        .glassmorphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-divider {
          height: 2px;
          background: linear-gradient(to right, 
            rgba(59, 130, 246, 0), 
            rgba(59, 130, 246, 0.5), 
            rgba(168, 85, 247, 0.5), 
            rgba(59, 130, 246, 0)
          );
          margin: 4rem 0;
        }

        .moving-gradient {
          background: linear-gradient(270deg, #3b82f6, #a855f7, #3b82f6);
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        .navbar-blur {
          backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.5);
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .solution-card {
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .solution-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent,
            rgba(168, 85, 247, 0.1),
            transparent 30%
          );
          animation: rotate 4s linear infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 5px -5px #a855f7;
          }
          to {
            box-shadow: 0 0 20px 5px #a855f7;
          }
        }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .gradient-bg {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }

        .pricing-card {
          animation: float 6s ease-in-out infinite;
          backdrop-filter: blur(10px);
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          border-radius: 20px;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        .selected-tier {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
          border-color: #8b5cf6;
          background-color: rgba(139, 92, 246, 0.1);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: auto 1fr 1fr 1fr;
          gap: 1rem;
          border-radius: 15px;
          overflow: hidden;
        }

        .feature-grid > * {
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-grid > *:first-child {
          justify-content: flex-start;
        }

        .feature-grid > *:nth-child(odd) {
          background-color: rgba(255, 255, 255, 0.03);
        }
      `}</style>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition > 50 ? 'navbar-blur' : ''}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={scrollToTop} className="text-2xl font-semibold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">MailWave</span>
          </button>
          <div className="hidden md:flex space-x-8">
            <button onClick={scrollToIntelligentFeatures} className="text-sm font-medium hover:text-gray-300 transition-colors">
              Features
            </button>
            <button onClick={togglePricing} className="text-sm font-medium hover:text-gray-300 transition-colors">
              Pricing
            </button>
            <Link href="#" className="text-sm font-medium hover:text-gray-300 transition-colors">
              Support
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-black bg-opacity-90 p-6 md:hidden"
            >
              <button onClick={scrollToIntelligentFeatures} className="block py-2 text-lg font-medium hover:text-gray-300 transition-colors">
                Features
              </button>
              <button onClick={togglePricing} className="block py-2 text-lg font-medium hover:text-gray-300 transition-colors">
                Pricing
              </button>
              <Link href="#" className="block py-2 text-lg font-medium hover:text-gray-300 transition-colors">
                Support
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        {showPricing ? (
          <section ref={pricingSectionRef} className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Choose Your Plan
              </motion.h2>
              <motion.p
                className="text-xl text-center text-gray-400 mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Unlock the full potential of your inbox
              </motion.p>
              <motion.div
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white bg-opacity-10 p-1 rounded-full">
                  <button
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      !isAnnual ? 'bg-white text-black' : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                    onClick={() => setIsAnnual(false)}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      isAnnual ? 'bg-white text-black' : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                    onClick={() => setIsAnnual(true)}
                  >
                    Annual (Save 15%)
                  </button>
                </div>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8">
                {tiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    className={`pricing-card p-8 ${
                      selectedTier === tier.id ? 'selected-tier' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={tier.price}
                        className="text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {tier.price}
                      </motion.p>
                    </AnimatePresence>
                    <ul className="mb-8 space-y-4">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="mr-4 text-purple-400">{feature.icon}</div>
                          <span className="text-gray-300">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full gradient-bg text-white py-3 px-4 rounded-full hover:opacity-90 transition duration-300 font-semibold">
                      {tier.cta}
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Feature Comparison</h3>
                <div className="overflow-x-auto bg-white bg-opacity-5 p-4 rounded-lg">
                  <div className="feature-grid">
                    <div className="font-semibold text-purple-400">Feature</div>
                    <div className="font-semibold text-purple-400">Free</div>
                    <div className="font-semibold text-purple-400">Premium</div>
                    <div className="font-semibold text-purple-400">Business</div>
                    {featureComparison.map((feature, index) => (
                      <React.Fragment key={index}>
                        <div className="text-left">{feature.name}</div>
                        <div>{renderFeatureAvailability(feature.free)}</div>
                        <div>{renderFeatureAvailability(feature.premium)}</div>
                        <div>{renderFeatureAvailability(feature.business)}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <h3 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h3>
                <p className="text-gray-400 mb-6">Our team is here to help you find the perfect solution for your needs.</p>
                <button className="gradient-bg text-white py-3 px-8 rounded-full hover:opacity-90 transition duration-300 font-semibold inline-flex items-center">
                  <Headphones className="w-5 h-5 mr-2" />
                  Schedule a Consultation
                </button>
              </motion.div>

              <motion.div
                className="mt-20 bg-white bg-opacity-5 p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
                <p className="text-gray-400">
                  Try MailWave risk-free. If you're not completely satisfied, we'll refund your payment. No questions asked.
                </p>
              </motion.div>
            </div>
          </section>
        ) : (
          <>
            <section className="min-h-screen flex items-center justify-center text-center px-6">
              <div>
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Redefine Your Inbox
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-400 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Experience email like never before with AI-powered simplicity.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link 
                    href="#" 
                    className="inline-flex items-center px-8 py-3 moving-gradient text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </section>

            <div className="section-divider" />

            <section className="py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">The Email Challenge</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: <Clock className="h-12 w-12" />, title: 'Time Sink', description: '2.6 hours daily on emails', subtext: '28% of workweek' },
                    { icon: <Mail className="h-12 w-12" />, title: 'Information Overload', description: '121 emails per day', subtext: 'Constant interruptions' },
                    { icon: <Brain className="h-12 w-12" />, title: 'Shrinking Attention', description: '8 second attention span', subtext: 'Difficulty processing' },
                    { icon: <BarChart className="h-12 w-12" />, title: 'Productivity Loss', description: 'Check email 15 times daily', subtext: 'Every 37 minutes' },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="stat-card glassmorphism p-6 flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-blue-400 mb-4">{stat.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                      <p className="text-2xl font-bold text-purple-400 mb-2">{stat.description}</p>
                      <p className="text-sm text-gray-400">{stat.subtext}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20 z-0"></div>
              <div className="container mx-auto px-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 glow inline-block p-2 rounded-lg">
                    Introducing the MailWave Solution
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                    Revolutionize your inbox with AI-powered tools that transform email chaos into streamlined productivity.
                  </p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 relative">
                  {[
                    { icon: <Sparkles className="h-8 w-8" />, title: 'AI-Powered Simplicity', description: 'Intelligent features that streamline your email workflow' },
                    { icon: <BookOpen className="h-8 w-8" />, title: 'Enhanced Readability', description: 'Clear, concise email summaries for quick comprehension' },
                    { icon: <Zap className="h-8 w-8" />, title: 'Efficiency Boost', description: 'Smart organization and prioritization of your inbox' },
                    { icon: <Hourglass className="h-8 w-8" />, title: 'Time-Saving', description: 'Reduce email processing time by up to 50%' },
                  ].map((solution, index) => (
                    <motion.div 
                      key={index}
                      className="solution-card glassmorphism p-6 flex flex-col items-center text-center relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-purple-400 mb-4 floating">{solution.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                      <p className="text-gray-300">{solution.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <div className="section-divider" />

            <section ref={intelligentFeaturesRef} className="py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Intelligent Features</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: <MessageSquare className="h-8 w-8" />, title: 'AI Summarization', description: 'Grasp email content quickly with AI summaries' },
                    { icon: <Layout className="h-8 w-8" />, title: 'Smart Replies', description: 'Respond effortlessly with suggested replies' },
                    { icon: <Inbox className="h-8 w-8" />, title: 'Visual Organization', description: 'Transform emails into easy-to-read cards' },
                    { icon: <Zap className="h-8 w-8" />, title: 'Efficient Parsing', description: 'Extract key information instantly' },
                    { icon: <Search className="h-8 w-8" />, title: 'AI PowerSearch', description: 'Find any information with advanced AI search' },
                    { icon: <Target className="h-8 w-8" />, title: 'Priority Inbox', description: 'Focus on what matters most with smart filtering' },
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="glassmorphism p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-blue-400 mb-4">{feature.icon}</div>
                      <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <div className="section-divider" />

            <section className="py-20">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-12 md:mb-0">
                    <motion.div 
                      className="glassmorphism p-6 shadow-lg max-w-md mx-auto"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h3 className="text-2xl font-bold mb-2">Tech Innovators Summit</h3>
                      <p className="text-blue-400 mb-2">Dr. Aria Chen</p>
                      <p className="text-gray-300 mb-4">"The Future of Quantum Computing in AI"</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-sm">Nov 15, 2024</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-sm">Virtual Event</span>
                        </div>
                      </div>
                      <div className="glassmorphism p-4 mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Video className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-sm">Online Attendance</span>
                        </div>
                        <span className="text-sm text-gray-400">Zoom Webinar</span>
                      </div>
                      <div className="glassmorphism p-4 mb-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <User className="h-5 w-5 text-orange-400 mr-2" />
                          About the Speaker
                        </h4>
                        <p className="text-sm text-gray-300">
                          Leading researcher in quantum computing and its applications in artificial intelligence.
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </button>
                        <button className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                          <Video className="h-4 w-4 mr-2" />
                          Join Online
                        </button>
                        <button className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          More Details
                        </button>
                      </div>
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <motion.h2 
                      className="text-4xl font-bold mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      Transform Your Email Experience
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-400 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      MailWave turns chaotic inboxes into streamlined communication hubs. Our AI-powered tools help you focus on what matters most.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Link 
                        href="#" 
                        className="inline-flex items-center px-6 py-3 moving-gradient text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            <div className="section-divider" />

            <section className="py-20">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Revolutionize Your Inbox?</h2>
                <p className="text-xl text-gray-400 mb-12">Join thousands of users who have transformed their email experience with MailWave.</p>
                <form className="max-w-md mx-auto">
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-grow px-4 py-3 rounded-l-full bg-white text-black focus:outline-none"
                    />
                    <button 
                      type="submit" 
                      className="px-6 py-3 moving-gradient text-white rounded-r-full font-semibold hover:opacity-90 transition-all"
                    >
                      Join Waitlist
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">MailWave</span>
              </h3>
              <p className="text-gray-400">Revolutionizing email management with AI-powered solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><button onClick={scrollToIntelligentFeatures} className="text-gray-400 hover:text-white transition-colors">Features</button></li>
                <li><button onClick={togglePricing} className="text-gray-400 hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="https://www.linkedin.com/in/vinayak-verma-1847181b3/" target='blank' className="text-gray-400 hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="https://www.instagram.com/vnykvrma/" target='blank' className="text-gray-400 hover:text-white transition-colors">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2023 MailWave. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function renderFeatureAvailability(availability: boolean | string) {
  if (typeof availability === 'boolean') {
    return availability ? (
      <Check className="text-green-400 mx-auto" />
    ) : (
      <X className="text-red-400 mx-auto" />
    )
  }
  return <span className="text-blue-400">{availability}</span>
}
