import React, { useState, useEffect, createContext, useContext } from 'react';

// Tailwind CSS is assumed to be available in this environment.
// For a real project, you would typically import your Tailwind CSS file.

// --- Context for Dark/Light Mode ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default to light mode

  useEffect(() => {
    // Check local storage for preferred theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      // Check user's system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Reusable Components ---

const Button = ({ children, onClick, className = '', primary = true }) => {
  const baseClasses = `px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75`;
  const primaryClasses = `bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-700`; // Adjusted hover color
  const secondaryClasses = `bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400`;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
    >
      {children}
    </button>
  );
};

const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

// --- Icons (using inline SVG for simplicity) ---
const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707-.707M4.343 19.071l-.707-.707m12.728 0l-.707.707M6.343 4.929l-.707.707"></path>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017 2 16.484 4.844 20.323 8.292 21.734c.471.085.642-.204.642-.457 0-.225-.008-.827-.013-1.62-2.587.563-3.132-1.246-3.132-1.246-.424-1.07-1.034-1.353-1.034-1.353-.842-.572.064-.561.064-.561.935.066 1.423.967 1.423.967.831 1.422 2.181 1.007 2.716.766.085-.596.327-1.007.594-1.238-2.07-.233-4.246-1.037-4.246-4.629 0-1.025.367-1.862 1.02-2.513-.103-.234-.446-1.185.099-2.474 0 0 .837-.252 2.746.966.793-.221 1.635-.332 2.47-.337.835.005 1.677.116 2.47.337 1.907-1.218 2.745-.966 2.745-.966.545 1.289.202 2.24.099 2.474.654.651 1.02 1.488 1.02 2.513 0 3.599-2.179 4.39-4.258 4.622.337.29.634.879.634 1.777 0 1.288-.011 2.327-.011 2.646 0 .255.17.546.645.456C19.156 20.322 22 16.485 22 12.017 22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.362-.485-2.299-1.773-2.299-1.042 0-1.66.75-1.935 1.48-.108.27-.105.644-.105 1.364v5.025H9.277s.02-9.14 0-10.124h3.554v1.517h.048c.49-.774 1.378-1.897 3.102-1.897 2.252 0 3.94 1.493 3.94 4.61v5.994zM7.274 9.172h-.048c-1.215 0-2.017-.798-2.017-1.815 0-.964.802-1.815 2.065-1.815 1.262 0 2.017.851 2.017 1.815 0 1.017-.802 1.815-2.065 1.815zm1.881 11.28h-3.554V10.32h3.554v10.132zM22.227 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.456c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.209 0 22.227 0z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.162 5.658c-.694.308-1.442.515-2.228.608.8-.48 1.416-1.24 1.706-2.148-.75.447-1.58.773-2.46.953-.708-.755-1.72-1.228-2.842-1.228-2.147 0-3.888 1.74-3.888 3.888 0 .304.034.6.1.882-3.23-.162-6.09-1.707-8.006-4.053-.334.572-.527 1.238-.527 1.95 0 1.347.684 2.535 1.724 3.228-.636-.02-1.233-.195-1.758-.485v.048c0 1.88 1.338 3.447 3.108 3.806-.326.088-.67.135-1.026.135-.25 0-.49-.025-.726-.068.494 1.536 1.92 2.658 3.61 2.69-1.328 1.04-3.004 1.66-4.836 1.66-.314 0-.62-.018-.92-.054 1.71 1.096 3.73 1.734 5.903 1.734 7.08 0 10.94-5.86 10.94-10.94 0-.167-.004-.334-.012-.502.75-.542 1.4-1.217 1.91-1.988z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.004 0C8.743 0 8.332.015 7.054.073c-1.28.058-2.157.26-2.924.555A5.885 5.885 0 001.995 2.76a5.885 5.885 0 00-2.132 2.135c-.295.767-.497 1.644-.555 2.924C-.073 8.332-.088 8.743-.088 12.004c0 3.26.015 3.67.073 4.95.058 1.28.26 2.156.555 2.923a5.885 5.885 0 002.132 2.135 5.885 5.885 0 002.135 2.133c.767.295 1.644.497 2.924.555 1.278.058 1.689.073 4.95.073s3.67-.015 4.948-.073c1.28-.058 2.157-.26 2.924-.555a5.885 5.885 0 002.135-2.133 5.885 5.885 0 002.133-2.135c.295-.767.497-1.643.555-2.923.058-1.28.073-1.69.073-4.95s-.015-3.672-.073-4.95c-.058-1.28-.26-2.157-.555-2.924A5.885 5.885 0 0019.078 2.76a5.885 5.885 0 00-2.135-2.133C16.176.332 15.299.13 14.02.072 12.741.014 12.33-.001 12.004-.001h.004zm0 2.162c3.203 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.414.56.218.96.477 1.38.896.42.42.679.821.896 1.381.164.423.36 1.057.413 2.227.059 1.266.07 1.646.07 4.85s-.011 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228-.218.56-.477.96-.896 1.38-.42.42-.821.679-1.38.896-.424.164-1.058.36-2.228.413-1.266.059-1.646.07-4.85.07s-3.584-.011-4.849-.07c-1.17-.053-1.804-.249-2.228-.413a3.723 3.723 0 01-1.38-.896 3.723 3.723 0 01-.896-1.38c-.164-.423-.36-1.057-.413-2.228-.059-1.265-.07-1.645-.07-4.849s.011-3.584.07-4.85c.053-1.17.249-1.804.413-2.227.218-.56.477-.96.896-1.381a3.723 3.723 0 011.38-.896c.424-.164 1.058-.36 2.228-.413 1.266-.058 1.646-.07 4.85-.07zM12.004 5.838a6.166 6.166 0 100 12.332 6.166 6.166 0 000-12.332zm0 10.162a3.996 3.996 0 110-7.992 3.996 3.996 0 010 7.992zM19.846 5.595a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Header/Navigation ---
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Siam Bin Hasan
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-4">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <Section id="home" className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-950 dark:to-gray-800">
      <div className="max-w-6xl px-4 flex flex-col md:flex-row items-center justify-center md:space-x-12">
        <div className="mb-8 md:mb-0 flex-shrink-0">
          {/* Profile Image - Replace with your actual image */}
          <img
            src="/images/profile.jpg"
            alt="Siam Bin Hasan Profile"
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl ring-4 ring-indigo-300 dark:ring-indigo-600"
            onError={(e) => {
              // Fallback to a placeholder if image doesn't exist
              e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format";
            }}
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-4">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Siam Bin Hasan</span> 👋
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
            An economics student, entrepreneur, and aspiring developer passionate about building impactful solutions.
          </p>
          
          {/* Social Media Links */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Connect with me:</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a 
                href="https://github.com/siambinhasan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 transform hover:scale-110"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
              <a 
                href="https://linkedin.com/in/siambinhasan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="https://facebook.com/siambinhasan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://instagram.com/siambinhasan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 transform hover:scale-110"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://wa.me/+8801XXXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 transform hover:scale-110"
                title="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a 
                href="https://twitter.com/siambinhasan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 transform hover:scale-110"
                title="Twitter"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={() => window.location.href = '#projects'} primary>View My Work</Button>
            <Button onClick={() => window.location.href = '#contact'} primary={false}>Get In Touch</Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

// --- About Me Section ---
const About = () => {
  return (
    <Section id="about" title="Curious about me? Here you have it:">
      {/* Removed image from About Me section */}
      <div className="text-lg leading-relaxed text-center md:text-left">
        <p className="mb-4">
          Hello! I'm Siam Bin Hasan, a driven individual with a diverse background in economics, entrepreneurship, and software development. My journey began with a strong interest in understanding market dynamics and financial systems, leading me to pursue a degree in Economics.
        </p>
        <p className="mb-4">
          Beyond academics, I've always been drawn to creating and innovating. This entrepreneurial spirit has led me to explore various ventures, constantly seeking opportunities to solve problems and build value.
        </p>
        <p>
          My passion for technology grew alongside my entrepreneurial pursuits, as I realized the immense power of code to bring ideas to life. I'm currently focused on honing my development skills, particularly in web technologies, to build robust and user-friendly applications. I believe in continuous learning and enjoy tackling complex challenges.
        </p>
        <h3 className="text-2xl font-semibold mb-4 mt-8 text-indigo-600 dark:text-indigo-400">Education</h3>
        <ul className="list-disc list-inside text-lg mb-8">
          <li>B.S. in Economics - Bangladesh University of Professionals (BUP)</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Skills</h3>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Python', 'SQL', 'Data Analysis', 'Financial Modeling', 'Entrepreneurship', 'Problem Solving'].map((skill) => (
            <span key={skill} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

// --- Projects Section ---
const projectsData = [
  {
    id: 1,
    title: 'Econometric Analysis of Market Trends',
    description: 'A comprehensive study using statistical models to predict stock market fluctuations based on macroeconomic indicators. Utilized Python for data cleaning and analysis, and R for econometric modeling and visualization.',
    techStack: ['Python', 'R', 'Pandas', 'NumPy', 'StatsModels', 'Econometrics', 'Time Series Analysis'],
    githubLink: 'https://github.com/siambinhasan/econometric-analysis',
    liveLink: '#', // Placeholder
    imageUrl: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=Econometrics', // Placeholder image
  },
  {
    id: 2,
    title: 'Interactive Data Dashboard for Public Health',
    description: 'Developed a responsive web dashboard using React and D3.js to visualize public health data, allowing users to filter by region and demographic. Focus on clear, actionable insights.',
    techStack: ['React', 'D3.js', 'JavaScript', 'API Integration', 'Data Visualization'],
    githubLink: 'https://github.com/siambinhasan/health-dashboard',
    liveLink: '#', // Placeholder
    imageUrl: 'https://placehold.co/600x400/818CF8/FFFFFF?text=Data+Dashboard', // Placeholder image
  },
  {
    id: 3,
    title: 'Blockchain-based Supply Chain Prototype',
    description: 'Explored the application of blockchain technology to enhance transparency and traceability in supply chains. Built a proof-of-concept using Solidity and Ganache.',
    techStack: ['Solidity', 'Ganache', 'Blockchain', 'Supply Chain Management'],
    githubLink: 'https://github.com/siambinhasan/blockchain-supplychain',
    liveLink: '#', // Placeholder
    imageUrl: 'https://placehold.co/600x400/6366F1/FFFFFF?text=Blockchain', // Placeholder image
  },
  {
    id: 4,
    title: 'Personal Finance Tracker (Web App)',
    description: 'A full-stack web application for tracking personal income and expenses, with features for budgeting and financial goal setting. Developed with Node.js, Express, and PostgreSQL.',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'Full-Stack Development'],
    githubLink: 'https://github.com/siambinhasan/finance-tracker',
    liveLink: '#', // Placeholder
    imageUrl: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Finance+Tracker', // Placeholder image
  },
  {
    id: 5,
    title: 'Machine Learning Model for Credit Scoring',
    description: 'Implemented and evaluated various machine learning algorithms (Logistic Regression, Random Forest) for predicting credit risk based on historical financial data. Jupyter Notebooks and scikit-learn were used.',
    techStack: ['Python', 'Scikit-learn', 'Jupyter', 'Machine Learning', 'Credit Risk'],
    githubLink: 'https://github.com/siambinhasan/credit-scoring-ml',
    liveLink: '#', // Placeholder
    imageUrl: 'https://placehold.co/600x400/7C3AED/FFFFFF?text=ML+Credit', // Placeholder image
  },
];

const Projects = () => {
  return (
    <Section id="projects" title="Some of the noteworthy projects I have built:">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <Card key={project.id}>
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E7FF/4F46E5?text=Image+Error'; }}
              />
            )}
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{project.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span key={tech} className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <GitHubIcon className="mr-1" /> GitHub
                </a>
              )}
              {project.liveLink && project.liveLink !== '#' && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
      <p className="text-center text-gray-700 dark:text-gray-300 mt-8 text-lg">
        Find more of my work on my <a href="https://github.com/siambinhasan" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">GitHub profile</a>.
      </p>
    </Section>
  );
};


// --- Contact Section ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to an API endpoint
    // using EmailJS, Formspree, or your own backend.
    console.log('Form submitted:', formData);
    // Using a simple alert for demo, replace with custom modal for better UX
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Section id="contact" title="What's next? Feel free to reach out to me if you're looking for a developer, have a question, or just want to connect.">
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300">
          You can reach me directly at: <a href="mailto:siambinhasan@email.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">siambinhasan@email.com</a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </Section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} Siam Bin Hasan. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">
          Designed and coded with ❤️ by Siam Bin Hasan.
        </p>
      </div>
    </footer>
  );
};

// --- Main App Component ---
export default function App() {
  // Add a global style for smooth scrolling and font
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.fontFamily = 'Inter, sans-serif'; // Set Inter font
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Header />
        <main className="pt-20"> {/* Padding to account for fixed header */}
          <Hero />
          <About />
          <Projects />
          
          {/* Resume Download Section */}
          <Section id="resume" title="My Resume">
            <div className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Download my latest resume to learn more about my background and experience.
              </p>
              <Button
                onClick={() => {
                  // Add your resume PDF to public folder
                  window.open('/resume-siam-bin-hasan.pdf', '_blank');
                }}
                primary
              >
                📄 Download Resume (PDF)
              </Button>
            </div>
          </Section>
          
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
