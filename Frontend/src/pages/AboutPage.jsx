import {
  Target,
  Database,
  Code2,
  GitBranch,
  FileText,
  Users,
  Server,
  Calendar,
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function AboutPage() {
  const objectives = [
    "Develop a comprehensive database of UAV propeller performance metrics",
    "Build accurate machine learning models using scikit-learn",
    "Analyze the relationship between propeller geometry and aerodynamic performance",
    "Provide a web-based system for propeller analysis and prediction",
    "Deliver actionable insights for UAV designers and researchers",
  ];

  const tools = [
    { name: "Python", category: "Programming Language", icon: Code2 },
    { name: "Pandas", category: "Data Processing", icon: Database },
    { name: "Scikit-learn", category: "Machine Learning", icon: GitBranch },
    { name: "Flask", category: "Backend API", icon: Server },
    { name: "React", category: "Frontend", icon: Code2 },
    { name: "Vite", category: "Build Tool", icon: GitBranch },
    { name: "Tableau", category: "Data Visualization", icon: Database },
    { name: "Supabase", category: "PostgreSQL Database", icon: Database },
  ];


  return (
    <div className="min-h-screen bg-[#f8fafc] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1f2937] mb-2">
            About PropVision
          </h1>
          <p className="text-gray-600">
            UAV Propeller Performance Analysis using Machine Learning
          </p>
        </div>

        {/* Project Overview */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">
            Project Overview
          </h2>
          <div className="text-gray-700 space-y-4">
            <p>
              PropVision is a data-driven platform designed to analyze and predict
              the aerodynamic performance of UAV propellers using machine learning
              techniques. It supports efficient propeller selection and UAV design
              through data-backed insights.
            </p>
            <p>
              This project is developed as part of the{" "}
              <b>Third Year B.Sc. Information Technology</b> curriculum, focusing
              on applied data science, machine learning, and full-stack
              development.
            </p>
          </div>
        </Card>

        {/* Problem Statement */}
        <Card className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-[#2563eb]" />
            <h2 className="text-2xl font-bold text-[#1f2937]">
              Problem Statement
            </h2>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>
              Selecting an optimal UAV propeller is a complex task that directly
              affects thrust, efficiency, endurance, and payload. Traditional
              approaches rely on:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Manual experimentation</li>
              <li>Limited analytical models</li>
              <li>Incomplete manufacturer data</li>
              <li>Lack of predictive comparison tools</li>
            </ul>
            <p>
              PropVision overcomes these limitations by leveraging machine
              learning-based predictive modeling and structured data analysis.
            </p>
          </div>
        </Card>

        {/* Project Aim */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">
            Project Aim
          </h2>
          <div className="bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white p-6 rounded-lg">
            <p className="text-lg">
              To develop an intelligent predictive system that estimates UAV
              propeller performance metrics and supports optimized propeller
              selection for improved UAV efficiency.
            </p>
          </div>
        </Card>

        {/* Objectives */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-6">
            Objectives
          </h2>
          <div className="space-y-3">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg"
              >
                <div className="bg-[#2563eb] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 mt-1">{objective}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Who Can Use */}
        <Card className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#2563eb]" />
            <h2 className="text-2xl font-bold text-[#1f2937]">
              Who Can Use PropVision?
            </h2>
          </div>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>UAV and drone designers</li>
            <li>Aerospace and engineering students</li>
            <li>Researchers studying propeller aerodynamics</li>
            <li>Drone enthusiasts optimizing performance</li>
          </ul>
        </Card>

        {/* System Architecture */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-6">
            System Architecture
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Client Layer</h3>
              <p className="text-sm text-gray-600">
                React-based frontend built using Vite, enabling dataset
                exploration, prediction input, and visualization of results.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="font-semibold">API Layer</h3>
              <p className="text-sm text-gray-600">
                Flask REST APIs handle requests from the frontend and expose
                endpoints for prediction and data access.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-semibold">Machine Learning Layer</h3>
              <p className="text-sm text-gray-600">
                Trained scikit-learn models loaded via Joblib perform predictions
                for thrust coefficient, power coefficient, and efficiency.
              </p>
            </div>

            <div className="border-l-4 border-sky-500 pl-4">
              <h3 className="font-semibold">Data Layer</h3>
              <p className="text-sm text-gray-600">
                Supabase (PostgreSQL) stores experimental and geometry datasets
                and supports structured querying.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            React Client → Flask API → ML Models → PostgreSQL Database
          </p>
        </Card>

        {/* Project Workflow */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-6">
            Project Workflow
          </h2>

          <div className="overflow-x-auto">
            <div className="flex items-center gap-6 min-w-max py-6">
              {[
                "Data Collection",
                "Preprocessing",
                "Feature Engineering",
                "Model Training",
                "Model Evaluation",
                "Flask API",
                "Web Interface",
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="px-6 py-4 rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white text-sm font-semibold shadow-md whitespace-nowrap">
                    {step}
                  </div>
                  {index !== 6 && (
                    <span className="text-gray-400 text-2xl">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            End-to-end machine learning pipeline from raw data to real-time
            prediction
          </p>
        </Card>


        {/* Tools */}
        <Card>
          <h2 className="text-2xl font-bold text-[#1f2937] mb-6">
            Tools & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#f1f5f9] to-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow"
              >
                <tool.icon className="w-10 h-10 text-[#2563eb] mx-auto mb-2" />
                <h3 className="font-semibold">{tool.name}</h3>
                <p className="text-xs text-gray-600">{tool.category}</p>
              </div>
            ))}
          </div>
        </Card>
        {/* Project Timeline */}
        <Card className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-[#2563eb]" />
            <h2 className="text-2xl font-bold text-[#1f2937]">
              Project Timeline
            </h2>
          </div>

          <div className="text-gray-700 space-y-4">
            <p>
              The development of PropVision followed a structured, phase-wise approach
              spanning problem understanding, data preparation, model development,
              backend deployment, and frontend integration.
            </p>

            <p>
              A detailed timeline including milestones, weekly tasks, and progress
              tracking is maintained separately for clarity and continuous updates.
            </p>

            <Button
              as="a"
              href="YOUR_NOTION_TIMELINE_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
              onClick={() =>
                window.open("https://www.notion.so/UAV-PROPELLER-PERFORMANCE-ANALYSIS-PROJECT-DASHBOARD-2afd12fcb09480f5bf10edc3107777cd?source=copy_link", "_blank")
              }
            >
              <FileText className="w-4 h-4 mr-2 inline" />
              View Detailed Project Timeline (Notion)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
