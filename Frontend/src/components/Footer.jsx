import { Plane, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1e] text-white mt-0"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Branding */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-8 h-8 text-[#38bdf8]" />
              <span className="text-xl font-bold tracking-wide">PropVision</span>
            </div>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Advanced UAV propeller performance analysis and prediction system.
              Empower your drone design with data-driven aerodynamic intelligence.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://github.com/RajguruDs" target="_blank" className="text-gray-400 hover:text-[#38bdf8] transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/rajguru-mathiyalagan-63b921244" target="_blank" className="text-gray-400 hover:text-[#38bdf8] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:rajguru21.ds@gmail.com"
                aria-label="Email Rajguru"
                onClick={() =>
                  navigator.clipboard.writeText("rajguru21.ds@gmail.com")
                }
                className="text-gray-400 hover:text-[#38bdf8] transition-colors cursor-pointer"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#38bdf8]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/dataset" className="text-gray-300 hover:text-[#38bdf8]">Dataset Explorer</Link></li>
              <li><Link to="/prediction" className="text-gray-300 hover:text-[#38bdf8]">Prediction Tool</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-[#38bdf8]">Dashboard</Link></li>
              <li><Link to="/insights" className="text-gray-300 hover:text-[#38bdf8]">Insights</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#38bdf8]">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-[#38bdf8]">About</Link></li>
              <li><a href="https://www.notion.so/Documentation-301d12fcb094809785aefe35087cb1f5?source=copy_link" target="_blank" className="text-gray-300 hover:text-[#38bdf8]">Documentation</a></li>
              <li><a href="https://flask.palletsprojects.com/en/stable/api/" target="_blank" className="text-gray-300 hover:text-[#38bdf8]">API Reference</a></li>
              <li><a href="mailto:rajguru21.ds@gmail.com" aria-label="Email Rajguru" onClick={() => navigator.clipboard.writeText("rajguru21.ds@gmail.com")} className="text-gray-300 hover:text-[#38bdf8]">Support</a></li>
            </ul> 
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; 2026 PropVision — All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
