import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import SearchBar from '../Search/SearchBar';

const Projects = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, skillFilter]);

  const fetchProjects = async () => {
    try {
      const data = await authAPI.getProjects(null, token);
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (skillFilter) {
      filtered = filtered.filter(project =>
        project.skills?.some(skill =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  };

  const handleSkillClick = (skill) => {
    setSkillFilter(skill);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
      </div>

      {/* Search and Filter */}
      {/* <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            placeholder="Search projects..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Skill
            </label>
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="Enter skill..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        {skillFilter && (
          <div className="mt-3">
            <button
              onClick={() => setSkillFilter('')}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear filter
            </button>
          </div>
        )}
      </Card> */}
{/* Search and Filter */}
<Card className="mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Search Projects
      </label>
      <SearchBar
        placeholder="Search projects..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
    </div>
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Filter by Skill
      </label>
      <input
        type="text"
        value={skillFilter}
        onChange={(e) => setSkillFilter(e.target.value)}
        placeholder="Enter skill..."
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
      />
    </div>
  </div>
  {skillFilter && (
    <div className="mt-3">
      <button
        onClick={() => setSkillFilter('')}
        className="text-sm text-primary-600 hover:text-primary-700"
      >
        Clear filter
      </button>
    </div>
  )}
</Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <Card key={index} className="h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 flex-grow mb-4">
              {project.description}
            </p>
            
            {/* Skills */}
            {project.skills && project.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, skillIndex) => (
                    <button
                      key={skillIndex}
                      onClick={() => handleSkillClick(skill)}
                      className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded hover:bg-primary-200 transition-colors cursor-pointer"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {project.links && (
              <div className="flex space-x-3 pt-4 border-t">
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
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">
            {searchTerm || skillFilter
              ? 'Try adjusting your search or filter criteria'
              : 'No projects have been added yet'}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Projects;