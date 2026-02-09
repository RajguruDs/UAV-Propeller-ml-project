import { Info } from 'lucide-react';
import Card from '../components/Card';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">

      {/* EXACT TABLEAU WIDTH */}
      <div className="w-full flex justify-center">
        <div className="w-[1200px]">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#1F2937] mb-2">
              UAV Propeller Performance Dashboard
            </h1>
            <p className="text-gray-600">
              Visual analytics and performance insights powered by Machine Learning
            </p>
          </div>

          {/* TABLEAU DASHBOARD */}
          <div className="flex justify-center mb-12">
            <div className="w-[1200px]">

              {/* Container with rounded corners */}
              <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-[#E5E7EB]">
                  <h2 className="text-xl font-bold text-[#1F2937]">
                    Interactive Performance Analysis
                  </h2>
                </div>

                {/* Tableau iframe */}
                <iframe
                  src="https://public.tableau.com/views/UAV-Project/Dashboard1?:showVizHome=no&:embed=true&:tabs=no&:toolbar=yes"
                  width="1200"
                  height="2750"
                  frameBorder="0"
                  scrolling="no"
                  title="UAV Propeller Performance Dashboard"
                  className="block"
                />

              </div>
            </div>
          </div>



          {/* INFO */}
          <Card>
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-[#2563EB] mt-1" />
              <div className="w-full">
                <h2 className="text-xl font-bold text-[#1F2937] mb-3">
                  About This Dashboard
                </h2>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Visual analysis of UAV propeller performance using experimental data</li>
                  <li>Examines the effect of RPM, blade count, propeller diameter, and solidity</li>
                  <li>Highlights key performance metrics such as thrust coefficient and efficiency</li>
                  <li>Identifies performance trends and optimal operating ranges</li>
                  <li>Enables interactive exploration through embedded Tableau filters</li>
                  <li>Supports data-driven propeller selection and research analysis</li>
                </ul>

                {/* Notion Documentation Link */}
                <p className="mt-4 text-sm text-gray-600">
                  📘 For detailed methodology, metric selection rationale, and design decisions,  
                  view the full documentation on{' '}
                  <a
                    href="https://www.notion.so/Dashboard-Detailed-Overview-2fed12fcb09480b3b973ce4326669acf?source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Notion
                  </a>.
                </p>
              </div>
            </div>
          </Card>


        </div>
      </div>
    </div>
  );
}
