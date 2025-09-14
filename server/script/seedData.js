import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/me-api');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});
    console.log('Cleared existing data');

    // Create a sample user
    const user = new User({
      email: 'john.doe@example.com',
      password: 'password123'
    });
    await user.save();
    console.log('Created user:', user.email);

    // --- More Skills ---
    const skills = [
      { name: 'JavaScript', proficiency: 'Expert' },
      { name: 'Node.js', proficiency: 'Advanced' },
      { name: 'React', proficiency: 'Advanced' },
      { name: 'MongoDB', proficiency: 'Intermediate' },
      { name: 'Express.js', proficiency: 'Advanced' },
      { name: 'Python', proficiency: 'Intermediate' },
      { name: 'HTML/CSS', proficiency: 'Advanced' },
      { name: 'TypeScript', proficiency: 'Intermediate' },
      { name: 'Next.js', proficiency: 'Intermediate' },
      { name: 'Redux', proficiency: 'Intermediate' },
      { name: 'Tailwind CSS', proficiency: 'Advanced' },
      { name: 'GraphQL', proficiency: 'Beginner' },
      { name: 'Docker', proficiency: 'Beginner' },
      { name: 'AWS', proficiency: 'Intermediate' },
      { name: 'PostgreSQL', proficiency: 'Beginner' },
      { name: 'Vue.js', proficiency: 'Beginner' }
    ];

    // --- More Work Experiences ---
    const work = [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Developer',
        duration: { start: new Date('2020-01-15'), end: new Date() },
        description: 'Led a team of developers in building scalable web applications.',
        skills: ['JavaScript', 'React', 'Node.js', 'AWS']
      },
      {
        company: 'WebDev Agency',
        position: 'Frontend Developer',
        duration: { start: new Date('2019-06-01'), end: new Date('2019-12-20') },
        description: 'Developed responsive web applications using React and Vue.js.',
        skills: ['JavaScript', 'React', 'Vue.js', 'CSS']
      },
      {
        company: 'Cloudify Pvt Ltd',
        position: 'Backend Engineer',
        duration: { start: new Date('2018-05-01'), end: new Date('2019-05-30') },
        description: 'Designed REST APIs and optimized MongoDB queries.',
        skills: ['Node.js', 'Express.js', 'MongoDB']
      },
      {
        company: 'AI Labs',
        position: 'Machine Learning Intern',
        duration: { start: new Date('2017-06-01'), end: new Date('2017-12-31') },
        description: 'Worked on NLP and chatbot development.',
        skills: ['Python', 'TensorFlow', 'NLP']
      },
      {
        company: 'Freelance',
        position: 'Full Stack Developer',
        duration: { start: new Date('2016-01-01'), end: new Date('2017-05-30') },
        description: 'Delivered multiple freelance projects including dashboards and e-commerce sites.',
        skills: ['JavaScript', 'React', 'Node.js', 'MySQL']
      }
    ];

    // --- More Projects ---
    const projects = [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce solution with React frontend and Node.js backend.',
        skills: ['React', 'Node.js', 'MongoDB', 'Express'],
        links: { github: 'https://github.com/johndoe/ecommerce-platform', demo: 'https://ecommerce-demo.example.com' }
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates.',
        skills: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        links: { github: 'https://github.com/johndoe/task-manager', demo: 'https://tasks.example.com' }
      },
      {
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard using weather API with historical data.',
        skills: ['JavaScript', 'React', 'API Integration', 'CSS'],
        links: { github: 'https://github.com/johndoe/weather-dashboard', demo: 'https://weather.example.com' }
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio website with blog and animations.',
        skills: ['Next.js', 'Tailwind CSS'],
        links: { github: 'https://github.com/johndoe/portfolio', demo: 'https://johndoe-portfolio.example.com' }
      },
      {
        title: 'Chat Application',
        description: 'Real-time chat app with authentication and rooms.',
        skills: ['Node.js', 'Socket.io', 'MongoDB'],
        links: { github: 'https://github.com/johndoe/chat-app', demo: 'https://chat.example.com' }
      },
      {
        title: 'Analytics Dashboard',
        description: 'Dashboard for visualizing API usage statistics.',
        skills: ['React', 'Chart.js', 'Express.js'],
        links: { github: 'https://github.com/johndoe/analytics-dashboard', demo: 'https://analytics.example.com' }
      }
    ];

    // --- One Big Profile ---
    const profile = new Profile({
      userId: user._id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      title: 'Full Stack Developer',
      about: 'Passionate developer with expertise in frontend, backend, and cloud technologies, problem-solving, and proficiency with AI tools to contribute to innovative projects, while continuously improving and expanding my technical skills in a dynamic work environment.',
      skills,
      education: [
        {
          institution: 'Tech University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          duration: { start: new Date('2015-09-01'), end: new Date('2019-05-30') }
        }
      ],
      work,
      projects,
      links: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        portfolio: 'https://johndoe-portfolio.example.com'
      }
    });

    await profile.save();
    console.log('Created large profile with many nested docs for:', profile.name);

    console.log('✅ Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};


seedData();