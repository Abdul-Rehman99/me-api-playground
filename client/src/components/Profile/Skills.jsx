import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const Skills = () => {
  const { token } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await authAPI.getTopSkills(token);
      console.log("Profile/Skill.jsx data", data);
      setSkills(data);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case "Expert":
        return "bg-green-100 text-green-800";
      case "Advanced":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Beginner":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProficiencyLevel = (proficiency) => {
    switch (proficiency) {
      case "Expert":
        return 100;
      case "Advanced":
        return 80;
      case "Intermediate":
        return 60;
      case "Beginner":
        return 40;
      default:
        return 0;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Skills</h1>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Technical Skills
        </h2>

        {/* Fixed height + scrollable container */}
        <div className="space-y-6 max-h-80 overflow-y-auto pr-2">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getProficiencyColor(
                    skill.proficiency
                  )}`}
                >
                  {skill.proficiency}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    getProficiencyColor(skill.proficiency).split(" ")[0]
                  }`}
                  style={{
                    width: `${getProficiencyLevel(skill.proficiency)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No skills added yet. Edit your profile to add skills.
          </div>
        )}
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Skill Distribution
          </h3>
          <div className="space-y-3">
            {["Expert", "Advanced", "Intermediate", "Beginner"].map((level) => {
              const count = skills.filter(
                (s) => s.proficiency === level
              ).length;
              const percentage =
                skills.length > 0 ? (count / skills.length) * 100 : 0;

              return (
                <div key={level} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{level}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          getProficiencyColor(level).split(" ")[0]
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Skills</span>
              <span className="font-medium">{skills.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Expert Level</span>
              <span className="font-medium">
                {skills.filter((s) => s.proficiency === "Expert").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Advanced Level</span>
              <span className="font-medium">
                {skills.filter((s) => s.proficiency === "Advanced").length}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
