import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    let projects = profile.projects;
    
    if (skill) {
      projects = projects.filter(project => 
        project.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );
    }
    
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Sort skills by proficiency (simplified)
    const topSkills = profile.skills;
    
    res.json(topSkills);
  } catch (error) {
    console.error('Get top skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const searchTerm = q.toLowerCase();
    const results = {};
    
    // Search in skills
    results.skills = profile.skills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm)
    );
    
    // Search in projects
    results.projects = profile.projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) || 
      project.description.toLowerCase().includes(searchTerm) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    
    // Search in work experience
    results.work = profile.work.filter(job => 
      job.company.toLowerCase().includes(searchTerm) || 
      job.position.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    
    // Search in education
    results.education = profile.education.filter(edu => 
      edu.institution.toLowerCase().includes(searchTerm) || 
      edu.degree.toLowerCase().includes(searchTerm) ||
      edu.field.toLowerCase().includes(searchTerm)
    );
    
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};