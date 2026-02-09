import { useNavigate } from "react-router-dom";
import { TrendingUp, Plane, Gauge, Layers, LineChart, ArrowRight, Wheat, Package, Map } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Button";

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Performance Prediction",
      desc: "Predict thrust coefficient, power coefficient, and efficiency using ML models.",
      icon: TrendingUp,
    },
    {
      title: "Extended Metrics",
      desc: "Calculate payload capacity, endurance, RPM range, and noise levels.",
      icon: Gauge,
    },
    {
      title: "Drone Recommender",
      desc: "Smart suggestions for agriculture, delivery, mapping, and industrial drones.",
      icon: Plane,
    },
    {
      title: "Geometry & Aerodynamic Insights",
      desc: "Understand aerodynamic behavior using blade geometry and chord–radius distributions.",
      icon: Layers,
    },
    {
      title: "Visual Analytics",
      desc: "Heatmaps, correlation analysis, and data storytelling dashboards.",
      icon: LineChart,
    },
  ];

  const pipelineSteps = [
    "Dataset Collection",
    "Preprocessing",
    "Feature Engineering",
    "Model Training",
    "Prediction & Insights",
  ];

  const useCases = [
    {
      title: "Agriculture Drones",
      icon: Wheat,
      desc: "Used for crop spraying, monitoring, and soil analysis. These drones require high endurance and stable RPM for covering large fields efficiently.",
      metrics: ["High Endurance", "Stable RPM", "Low Noise"],
    },
    {
      title: "Delivery Drones",
      icon: Package,
      desc: "Designed for carrying packages over short to mid-range distances. Propeller performance impacts payload capacity, thrust output, and power consumption.",
      metrics: ["High Payload", "Power Efficiency", "High Thrust"],
    },
    {
      title: "Aerial Mapping & Surveying",
      icon: Map,
      desc: "Used for 3D terrain mapping, construction surveys, and environmental monitoring. They demand high aerodynamic efficiency to maximize coverage per flight.",
      metrics: ["High Efficiency", "Long Endurance", "Consistent RPM"],
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">

      {/* ⭐ HERO */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-6xl font-bold mb-6">PropVision</h1>

          <p className="text-2xl text-[#38bdf8] mb-4">
            UAV Propeller Performance Analysis System
          </p>

          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            A machine-learning powered platform for aerodynamic analysis, propeller optimization,
            and UAV design enhancement.
          </p>

          {/* ⭐ 3 Buttons Here */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

            <Button
              onClick={() => navigate("/prediction")}
              className="px-8 py-3 text-lg"
            >
              Start Predicting <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/dataset")}
              className="px-8 py-3 text-lg border-white text-white hover:text-[#0f172a]"
            >
              Explore Dataset
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 text-lg"
            >
              View Dashboard
            </Button>

          </div>
        </motion.div>
      </section>


      {/* ⭐ ABOUT */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center text-[#1f2937] mb-6"
        >
          About the Project
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto"
        >
          PropVision aims to model and analyze UAV propeller performance using advanced
          machine learning techniques. It provides engineers and researchers with detailed
          aerodynamic predictions, extended performance metrics, and intelligent drone recommendations.
        </motion.p>
      </section>

      {/* ⭐ HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-12 mb-12">
        <div className="bg-blue-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#1f2937]">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-xl mb-3 text-[#1f2937]">Input Specs</h4>
              <p className="text-gray-600 leading-relaxed">
                Enter propeller diameter, pitch, RPM, and blade count into the prediction interface
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-xl mb-3 text-[#1f2937]">ML Processing</h4>
              <p className="text-gray-600 leading-relaxed">
                AI models analyze data and predict thrust, power coefficient, and efficiency
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-xl mb-3 text-[#1f2937]">Get Results</h4>
              <p className="text-gray-600 leading-relaxed">
                View predictions, drone recommendations, and interactive visualizations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⭐ FEATURES (NOT navigation, just information) */}
      <section className="bg-[#f1f5f9] py-20">
        <h2 className="text-3xl font-bold text-center text-[#1f2937] mb-12">
          What PropVision Can Do
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-md p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <item.icon className="w-12 h-12 text-[#2563eb] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#2563eb]">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⭐ STATS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center text-[#1f2937] mb-12"
          >
            By The Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-5xl font-bold text-blue-600 mb-2">5000+</p>
              <p className="text-gray-600 font-medium">Propeller Records</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-5xl font-bold text-blue-600 mb-2">95%</p>
              <p className="text-gray-600 font-medium">Model Accuracy</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-5xl font-bold text-blue-600 mb-2">4</p>
              <p className="text-gray-600 font-medium">Drone Categories</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-5xl font-bold text-blue-600 mb-2">10x</p>
              <p className="text-gray-600 font-medium">Faster Than CFD</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⭐ PIPELINE */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[#1f2937] mb-12">
          System Pipeline
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 px-6 text-center">
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white shadow-md p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-semibold text-[#2563eb]">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⭐ USE CASES */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Real-World Use Cases</h2>
          <p className="mb-12 text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            PropVision enables smarter UAV design by analyzing propeller performance and mapping it to
            real-world applications. Different industries require different aerodynamic behaviors — and
            this system helps engineers make those decisions with confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {useCases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg hover:-rotate-1 hover:scale-[1.03] transition-all"
              >
                <item.icon className="w-16 h-16 mb-4 mx-auto text-cyan-300" />
                <h3 className="text-2xl font-semibold mb-3 text-cyan-300">
                  {item.title}
                </h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {item.metrics.map((metric, mIndex) => (
                    <span
                      key={mIndex}
                      className="px-3 py-1 text-sm bg-white/20 rounded-full border border-white/20"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ FINAL CTA */}
      <section className="bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white py-16 mb-0 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Exploring PropVision</h2>
          <p className="text-xl mb-8 text-blue-100">
            Unlock aerodynamic insights and predictive intelligence for UAV propeller design.
          </p>

          <Button
            variant="outline"
            onClick={() => navigate("/prediction")}
            className="border-white text-white hover:text-[#000000] px-8 py-3 text-lg"
          >
            Go to Predictor <ArrowRight className="inline ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

    </div>
  );
}