import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, ExternalLink, Building, GraduationCap, Github, Linkedin, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProfileView = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await authAPI.getProfile(token);
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!profile) return <div className="text-center">No profile found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <Link
          to="/profile/edit"
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Edit size={18} className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">
                {profile.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              {profile.title && (
                <p className="text-lg text-gray-600 mt-1">{profile.title}</p>
              )}
              <p className="text-gray-600 mt-2">{profile.email}</p>
              
              {profile.about && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">About</h3>
                  <p className="text-gray-700 mt-1">{profile.about}</p>
                </div>
              )}

              {/* Social Links */}
              {profile.links && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {profile.links.github && (
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Github size={18} className="mr-1" />
                      GitHub
                    </a>
                  )}
                  {profile.links.linkedin && (
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Linkedin size={18} className="mr-1" />
                      LinkedIn
                    </a>
                  )}
                  {profile.links.portfolio && (
                    <a
                      href={profile.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Globe size={18} className="mr-1" />
                      Portfolio
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Skills Preview */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Skills</h3>
          <div className="space-y-3">
            {profile.skills?.slice(0, 5).map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                  {skill.proficiency}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/skills"
            className="block text-center text-primary-600 hover:text-primary-700 mt-4 font-medium"
          >
            View all skills
          </Link>
        </Card>
      </div>

      {/* Work Experience */}
      {profile.work && profile.work.length > 0 && (
        <Card className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h3>
          <div className="space-y-6">
            {profile.work.map((job, index) => (
              <div key={index} className="border-l-2 border-primary-500 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.position}</h4>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Building size={16} className="mr-1" />
                      {job.company}
                    </div>
                    {job.duration && (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(job.duration.start).toLocaleDateString()} -{' '}
                        {job.duration.end ? new Date(job.duration.end).toLocaleDateString() : 'Present'}
                      </p>
                    )}
                  </div>
                </div>
                {job.description && (
                  <p className="text-gray-700 mt-2">{job.description}</p>
                )}
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <Card className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
          <div className="space-y-6">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-primary-500 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <div className="flex items-center text-gray-600 mt-1">
                      <GraduationCap size={16} className="mr-1" />
                      {edu.institution}
                    </div>
                    {edu.field && (
                      <p className="text-sm text-gray-600 mt-1">{edu.field}</p>
                    )}
                    {edu.duration && (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(edu.duration.start).toLocaleDateString()} -{' '}
                        {edu.duration.end ? new Date(edu.duration.end).toLocaleDateString() : 'Present'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Projects Preview */}
      {profile.projects && profile.projects.length > 0 && (
        <Card className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Recent Projects</h3>
            <Link
              to="/projects"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all projects
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.slice(0, 2).map((project, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900">{project.title}</h4>
                <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                {project.skills && project.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                {project.links && (
                  <div className="mt-4 flex space-x-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                      >
                        <Github size={16} className="mr-1" />
                        Code
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProfileView;