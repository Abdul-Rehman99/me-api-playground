import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  links: {
    github: String,
    demo: String,
    documentation: String
  }
});

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    start: Date,
    end: Date
  },
  description: String,
  skills: [String]
});

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    trim: true
  },
  duration: {
    start: Date,
    end: Date
  }
});

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  about: {
    type: String,
    trim: true
  },
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    }
  }],
  education: [educationSchema],
  work: [workExperienceSchema],
  projects: [projectSchema],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    twitter: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
profileSchema.index({ 'skills.name': 1 });
profileSchema.index({ 'projects.skills': 1 });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;