import React, { useState, useEffect } from 'react'
import { Users, Music, Calendar, MapPin, Mail, Github, Linkedin, Star, Zap, Coffee, Code, Puzzle, Play, Send, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { loadClient } from '../redux/actions/clientActions'

export default function AboutView() {
  const [activeSection, setActiveSection] = useState('squad')
  const [nextProjectDate, setNextProjectDate] = useState({ seconds: 5, milliseconds: 0 })
  const [countdownStarted, setCountdownStarted] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  // window.scrollTo(0, 0);
  const client = useSelector((state) => state.client.client);

  const dispatch = useDispatch();
  useEffect(() => {
    if(client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  
    }, [dispatch]);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((current) => {
        const sections = ['squad', 'vibes', 'projects', 'contact']
        const currentIndex = sections.indexOf(current)
        return sections[(currentIndex + 1) % sections.length]
      })
    }, 100000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timer
    if (countdownStarted) {
      timer = setInterval(() => {
        setNextProjectDate(prev => {
          if (prev.seconds === 0 && prev.milliseconds === 0) {
            clearInterval(timer)
            setShowEmailForm(true)
            return { seconds: 0, milliseconds: 0 }
          }
          if (prev.milliseconds === 0) {
            return { seconds: prev.seconds - 1, milliseconds: 99 }
          }
          return { ...prev, milliseconds: prev.milliseconds - 1 }
        })
      }, 10)
    }
    return () => clearInterval(timer)
  }, [countdownStarted])

  const startCountdown = () => {
    setCountdownStarted(true)
    setNextProjectDate({ seconds: 5, milliseconds: 0 })
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
    setEmail('')
  }

  const squadMembers = [
    { name: 'Carolina Pineiro', role: 'Full Stack Developer', bio: 'Coffee enthusiast. Turns caffeine into code.' },
    { name: 'William Ocanto', role: 'Full Stack Developer', bio: 'Bug hunter extraordinaire. Debugger of dreams.' },
    { name: 'Amparo Perez', role: 'Full Stack Developer', bio: 'CSS wizard. Making the web beautiful, one div at a time.' },
    { name: 'Ludwing Valecillos', role: 'Full Stack Developer', bio: 'Algorithm whisperer. Speaks fluent JavaScript.' },
  ]
  const teamMembers = [
    { 
      name: 'Carolina Pineiro', 
      github: 'https://github.com/carolinabpineiro', 
      linkedin: 'https://www.linkedin.com/in/carolina-pineiro/' 
    },
    { 
      name: 'William Ocanto', 
      github: 'https://github.com/WilliamJOcanto', 
      linkedin: 'https://www.linkedin.com/in/william-ocanto-462b122aa' 
    },
    { 
      name: 'Amparo Perez', 
      github: 'https://github.com/psilocyamp', 
      linkedin: 'https://www.linkedin.com/in/amparo-p%C3%A9rez/' 
    },
    { 
      name: 'Ludwing Valecillos', 
      github: 'https://github.com/LudwingValecillos', 
      linkedin: 'https://www.linkedin.com/in/ludwingvalecillos/' 
    }
  ]
  const coolProjects = [
    { name: 'Carolina\'s HomeBank',  text: 'See the proyect here!',url: 'https://frontend-homebanking-pineiro.onrender.com/' },
    { name: 'William\'s HomeBank',   text: 'See the proyect here!',url: 'https://frontend-react-homebanking.onrender.com/' },
    { name: 'Amparo\'s HomeBank',  text: 'See the proyect here!',url: 'https://homebankingfront-6n5u.onrender.com/' },
    { name: 'Ludwing\'s HomeBank',  text: 'See the proyect here!', url: 'https://homebankig-frontend.onrender.com/' },
  ]

  const squadSkills = [
    { icon: <Star className="w-8 h-8" />, title: 'Collaborative Synergy', description: 'We are like a well-oiled machine, but cooler' },
    { icon: <Zap className="w-8 h-8" />, title: 'Innovative Problem Solving', description: 'We dont think outside the box, we redesign it' },
    { icon: <Coffee className="w-8 h-8" />, title: 'Caffeine-Powered Coding', description: 'Our blood type is Java (the drink and the language)' },
  ]

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4 sm:p-8">
      <header className="mb-8 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#0D0D0D] mb-4 bg-[#F2BB13] inline-block px-4 sm:px-8 py-2 sm:py-3 rounded-full border-4 border-[#0D0D0D] shadow-[8px_8px_0px_0px_rgba(13,13,13,1)]">
          Wave Cultural Center
        </h1>
        <p className="text-lg sm:text-xl mt-4 font-semibold text-[#0D0D0D]">Where Creativity Meets Technology</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        <section className="bg-[#BFBFBF] border-4 border-[#0D0D0D] rounded-lg shadow-[8px_8px_0px_0px_rgba(13,13,13,1)] p-4 sm:p-6 space-y-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {['squad', 'vibes', 'projects', 'contact'].map((section) => (
              <motion.button
                key={section}
                className={`px-3 sm:px-4 py-2 rounded-full border-2 border-[#0D0D0D] font-bold text-sm sm:text-base ${
                  activeSection === section ? 'bg-[#F28D35] text-[#0D0D0D]' : 'bg-[#F2F2F2] text-[#0D0D0D]'
                }`}
                onClick={() => setActiveSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === 'squad' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {squadMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)]"
                  >
                    <Users className="w-12 h-12 mb-2 mx-auto text-[#0D0D0D]" />
                    <h3 className="text-lg font-bold text-center text-[#0D0D0D]">{member.name}</h3>
                    <p className="text-sm text-center font-semibold mb-2 text-[#0D0D0D]">{member.role}</p>
                    <p className="text-sm text-center text-[#0D0D0D]">{member.bio}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'vibes' && (
              <div className="bg-[#F2BB13] p-4 sm:p-6 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)]">
                <Music className="w-12 h-12 mb-4 mx-auto text-[#0D0D0D]" />
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-[#0D0D0D]">Our Vibe</h2>
                <p className="text-center mb-4 text-[#0D0D0D] text-sm sm:text-base">
                  We're not just coders, we're digital artists painting the web with pixels and functions.
                  Born from the MindHub bootcamp crucible, we've emerged as a squad of full-stack ninjas,
                  ready to tackle any challenge the digital realm throws our way.
                </p>
                <p className="text-center font-semibold text-[#0D0D0D] text-sm sm:text-base">
                  "Turning coffee into code and dreams into digital reality."
                </p>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-4">
                {coolProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Calendar className="w-6 h-6 mr-2 text-[#0D0D0D]" />
                      <span className="font-bold text-[#0D0D0D]">{project.name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <span className="text-[#0D0D0D] text-sm">{project.date}</span>
                      <a target='_blank' href={project.url}>
                      <span className="font-bold text-[#0D0D0D] text-sm">{project.text}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'contact' && (
             <div className="bg-[#F2BB13] p-4 sm:p-6 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] space-y-6">
            <div className="flex items-center justify-center">
        <Share2 className="w-6 h-6 mr-2 text-[#0D0D0D]" />
        <span className="text-[#0D0D0D] text-sm sm:text-base">Follow our journey on GitHub and LinkedIn!</span>
      </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {teamMembers.map((member, index) => (
                 <div key={index} className="bg-white p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[2px_2px_0px_0px_rgba(13,13,13,1)]">
                   <h3 className="font-bold text-[#0D0D0D] mb-2">{member.name}</h3>
                   <div className="flex justify-start space-x-4">
                     <motion.a
                       href={member.github}
                       target="_blank"
                       rel="noopener noreferrer"
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                     >
                       <Github className="w-6 h-6 text-[#0D0D0D]" />
                     </motion.a>
                     <motion.a
                       href={member.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                     >
                       <Linkedin className="w-6 h-6 text-[#0D0D0D]" />
                     </motion.a>
                   </div>
                 </div>
               ))}
             </div>
           </div>
            )}
         </motion.div>
        </section>

        <section className="bg-[#BFBFBF] border-4 border-[#0D0D0D] rounded-lg shadow-[8px_8px_0px_0px_rgba(13,13,13,1)] p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#0D0D0D]">Squad Superpowers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {squadSkills.map((skill, index) => (
              <div key={index} className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] text-center">
                <div className="mb-2 text-[#0D0D0D]">{skill.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-[#0D0D0D]">{skill.title}</h3>
                <p className="text-sm text-[#0D0D0D]">{skill.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#BFBFBF] border-4 border-[#0D0D0D] rounded-lg shadow-[8px_8px_0px_0px_rgba(13,13,13,1)] p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#0D0D0D]">Be Part of Our Next Big Project!</h2>
          <p className="text-center mb-4 text-[#0D0D0D] text-sm sm:text-base">
            Ready for a quick tech adventure? Join our mailing list in just 5 seconds!
          </p>
          <div className="flex flex-col items-center justify-center space-y-4">
            {!countdownStarted ? (
              <button
                onClick={startCountdown}
                className="bg-[#F28D35] text-[#0D0D0D] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-[#F2BB13] transition-colors duration-300 text-sm sm:text-base"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Start the 5-second challenge!</span>
              </button>
            ) : (
              <div className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] text-center">
                <span className="text-3xl sm:text-4xl font-bold text-[#0D0D0D]">
                  {nextProjectDate.seconds.toString().padStart(2, '0')}.
                  {nextProjectDate.milliseconds.toString().padStart(2, '0')}
                </span>
                <p className="text-sm font-semibold text-[#0D0D0D] mt-2">Quick! The future is loading...</p>
              </div>
            )}
            {showEmailForm && !emailSubmitted && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleEmailSubmit}
                className="mt-4 w-full max-w-md"
              >
                <div className="flex items-center border-2 border-[#0D0D0D] rounded-full overflow-hidden bg-white">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 focus:outline-none text-[#0D0D0D]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#F28D35] text-[#0D0D0D] px-4 py-2 font-bold hover:bg-[#F2BB13] transition-colors duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </motion.form>
            )}
            {emailSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl font-bold text-[#0D0D0D] mt-4"
              >
                Awesome! You're now part of our digital wave. Stay tuned for exciting updates!
              </motion.p>
            )}
          </div>
        </section>

        <section className="bg-[#BFBFBF] border-4 border-[#0D0D0D] rounded-lg shadow-[8px_8px_0px_0px_rgba(13,13,13,1)] p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#0D0D0D]">Why Choose Our Squad?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] text-center">
              <Code className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-[#0D0D0D]" />
              <h3 className="text-lg font-bold mb-2 text-[#0D0D0D]">Full-Stack Mastery</h3>
              <p className="text-sm text-[#0D0D0D]">From front-end finesse to back-end brilliance</p>
            </div>
            <div className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] text-center">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-[#0D0D0D]" />
              <h3 className="text-lg font-bold mb-2 text-[#0D0D0D]">Innovative Tools</h3>
              <p className="text-sm text-[#0D0D0D]">Asana ninjas with AI superpowers</p>
            </div>
            <div className="bg-[#F2BB13] p-4 rounded-lg border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] text-center">
              <Puzzle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-[#0D0D0D]" />
              <h3 className="text-lg font-bold mb-2 text-[#0D0D0D]">Creative Solutions</h3>
              <p className="text-sm text-[#0D0D0D]">We don't just code, we craft digital experiences</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 sm:mt-12 text-center">
        <p className="font-semibold text-[#0D0D0D] text-sm sm:text-base">&copy; 2023 Wave Cultural Center. Riding the digital wave since our MindHub days.</p>
      </footer>
    </div>
  )
}