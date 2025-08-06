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

// --- Header/Navigation ---
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
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
      <div className="max-w-3xl px-4 flex flex-col md:flex-row items-center justify-center md:space-x-8">
        <div className="mb-8 md:mb-0">
          {/* User's provided image for profile */}
          <img
            src="/uploaded/WhatsApp Image 2025-08-03 at 19.01.15_c231ef4a.jpg"
            alt="Siam Bin Hasan Profile"
            className="rounded-full w-44 h-44 object-cover shadow-lg ring-4 ring-indigo-300 dark:ring-indigo-600"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-4">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Siam Bin Hasan</span> 👋
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            An economics student, entrepreneur, and aspiring developer passionate about building impactful solutions.
          </p>
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
          <li>B.S. in Economics - [Your University Name], [Year of Graduation]</li>
          <li>[Any relevant certifications or courses]</li>
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
            <div className="flex space-x-4 mt-4"> {/* Added mt-4 for spacing */}
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

// --- Testimonials Section ---
const Testimonials = () => {
  const testimonialsData = [
    {
      quote: "Siam is a highly motivated and intelligent individual. His understanding of economic principles combined with his growing technical skills make him a valuable asset to any team.",
      author: "John Doe",
      title: "Professor of Economics, [University Name]",
      imageUrl: "https://placehold.co/80x80/E0E7FF/4F46E5?text=JD", // Placeholder image
    },
    {
      quote: "Working with Siam on our startup project was a fantastic experience. He brings a unique blend of analytical thinking and entrepreneurial drive to the table.",
      author: "Jane Smith",
      title: "Startup Mentor",
      imageUrl: "https://placehold.co/80x80/818CF8/FFFFFF?text=JS", // Placeholder image
    },
    {
      quote: "Siam quickly grasped complex technical concepts and contributed significantly to our web development projects. His dedication to learning is truly impressive.",
      author: "Michael Johnson",
      title: "Senior Developer, Tech Solutions Inc.",
      imageUrl: "https://placehold.co/80x80/6366F1/FFFFFF?text=MJ", // Placeholder image
    },
  ];

  return (
    <Section id="testimonials" title="Nice things professionals said about me:">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <Card key={index} className="flex flex-col items-center text-center">
            {testimonial.imageUrl && (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.author}
                className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E7FF/4F46E5?text=Error'; }}
              />
            )}
            <p className="italic text-gray-700 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">{testimonial.author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
          </Card>
        ))}
      </div>
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

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Find Me On</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/siambinhasan" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com/in/siambinhasan" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <LinkedInIcon />
            </a>
            <a href="https://twitter.com/siambinhasan" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <TwitterIcon />
            </a>
          </div>
        </div>
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
          <Testimonials />
          {/* Resume Download Button - placed here for visibility, could be integrated into About or Hero */}
          <Section id="resume-download" title="Download My Resume">
            <div className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Click the button below to download my latest resume.
              </p>
              <Button
                onClick={() => {
                  // Replace with your actual resume PDF URL
                  const resumeUrl = 'https://example.com/your-resume.pdf';
                  window.open(resumeUrl, '_blank');
                }}
                primary
              >
                Download Resume (PDF)
              </Button>
            </div>
          </Section>
          {/* Optional Blog Section Placeholder */}
          <Section id="blog" title="My Blog (Coming Soon!)">
            <div className="text-center text-lg text-gray-700 dark:text-gray-300">
              <p>
                I'm planning to share my thoughts on economics, entrepreneurship, and development here soon.
                Stay tuned for articles and insights!
              </p>
            </div>
          </Section>
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
