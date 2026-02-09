import {
  Lightbulb,
  TrendingUp,
  Cpu,
  Eye,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function InsightsPage() {
  const navigate = useNavigate();

  const insights = [
    {
      category: "Key Findings",
      icon: Lightbulb,
      color: "bg-yellow-500",
      source: "Experimental Data",
      why:
        "Helps identify propeller configurations that maximize efficiency without increasing power draw.",
      items: [
        {
          metric: "+8–12% Efficiency",
          description:
            "Two-blade propellers outperform three-blade designs across all tested diameters."
        },
        {
          metric: "Optimal P/D = 0.45–0.5",
          description:
            "Pitch-to-diameter ratio in this range yields maximum efficiency."
        },
        {
          metric: "Highest Avg Ct = 0.098",
          description:
            "T-Motor propellers show the highest average thrust coefficient."
        },
        {
          metric: "r = 0.87",
          description:
            "Strong correlation observed between Reynolds number and efficiency."
        }
      ]
    },
    {
      category: "Aerodynamic Insights",
      icon: TrendingUp,
      color: "bg-blue-500",
      source: "Experimental + Statistical Analysis",
      why:
        "Prevents operation in inefficient RPM ranges that reduce endurance and increase thermal stress.",
      items: [
        {
          metric: "Advance Ratio J ≤ 0.6",
          description:
            "Thrust coefficient increases linearly up to this point, then plateaus."
        },
        {
          metric: "R² = 0.94",
          description:
            "Power coefficient follows an exponential relationship with RPM."
        },
        {
          metric: "Solidity 0.28–0.32",
          description:
            "This range produces the best thrust-to-power balance."
        },
        {
          metric: "Mach > 0.6",
          description:
            "Tip speeds beyond this cause significant efficiency loss."
        }
      ]
    },
    {
      category: "Geometry Insights",
      icon: Eye,
      color: "bg-green-500",
      source: "Geometry Dataset Analysis",
      why:
        "Guides geometry selection for hover vs forward-flight optimization.",
      items: [
        {
          metric: '14"–16" Diameter',
          description:
            "Improves hover efficiency but reduces forward-flight performance."
        },
        {
          metric: "Blade Area Ratio 0.15–0.18",
          description:
            "Optimizes thrust while minimizing drag."
        },
        {
          metric: "Taper Ratio > 0.6",
          description:
            "Improves aerodynamic efficiency by 5–7%."
        },
        {
          metric: "Chord Distribution",
          description:
            "Strongly influences stall behavior at high angles of attack."
        }
      ]
    },
    {
      category: "ML Model Insights",
      icon: Cpu,
      color: "bg-purple-500",
      source: "Machine Learning Models",
      why:
        "Validates that non-linear aerodynamic behavior can be reliably predicted using ML.",
      items: [
        {
          metric: "R² = 96.8%",
          description:
            "Random Forest model achieves highest thrust prediction accuracy."
        },
        {
          metric: "Top Features",
          description:
            "Diameter (32%), RPM (28%), Pitch (24%), Blades (16%)."
        },
        {
          metric: "RMSE = 0.003",
          description:
            "XGBoost performs best for power coefficient prediction."
        },
        {
          metric: "−45% Variance",
          description:
            "Neural ensemble significantly reduces prediction variability."
        }
      ]
    }
  ];

  const droneRecommendations = [
    {
      type: "Agriculture",
      propeller: '15" × 5.5" (2-blade)',
      reasoning:
        "High thrust for payload capacity with stable hover performance."
    },
    {
      type: "Delivery",
      propeller: '12" × 5" (2-blade)',
      reasoning:
        "Balanced efficiency and thrust for mixed flight profiles."
    },
    {
      type: "Surveillance",
      propeller: '10" × 4.5" (2-blade)',
      reasoning:
        "Low noise, long endurance, efficient cruise."
    },
    {
      type: "Mapping",
      propeller: '11" × 5" (2-blade)',
      reasoning:
        "Stable hovering and precise control."
    },
    {
      type: "Racing",
      propeller: '9" × 4" (3-blade)',
      reasoning:
        "High thrust-to-weight ratio and fast throttle response."
    }
  ];

  const limitations = [
    "Dataset restricted to 8–16 inch propellers",
    "Wind tunnel data may not fully replicate real flight conditions",
    "Limited high-altitude (>2000 m) data",
  ];

  const futureScope = [
    "CFD-based performance integration",
    "Real-time adaptive propeller tuning",
    "Multi-rotor interaction modeling",
    "Noise and vibration analytics",
    "Custom propeller design recommender"
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#1f2937]">
            Insights & Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Data-driven findings derived from experimental, geometric, and ML analysis
          </p>
        </div>

        {/* Insight Sections */}
        {insights.map((section, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`${section.color} w-12 h-12 rounded-full flex items-center justify-center`}
              >
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1f2937]">
                  {section.category}
                </h2>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {section.source}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="bg-white border rounded-lg p-4">
                  <p className="font-semibold text-[#1f2937]">{item.metric}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-900">
              <strong>Why this matters:</strong> {section.why}
            </div>
          </Card>
        ))}

        {/* Model Reliability */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Model Reliability</h2>
          <p className="text-gray-700">
            Predictions are most reliable within the trained diameter range
            (8–16 inches) and mid-RPM values. Extrapolation beyond this range may
            reduce accuracy.
          </p>
        </Card>

        {/* Drone Recommendations */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">
            Drone-Specific Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {droneRecommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg">
                  {rec.type} Drones
                </h3>
                <p className="font-mono text-[#2563eb] mt-1">
                  {rec.propeller}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {rec.reasoning}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Derived from efficiency, thrust coefficient & RPM stability
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Limitations & Future Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-2xl font-bold mb-4">Limitations</h2>
            {limitations.map((item, idx) => (
              <p key={idx} className="flex gap-2 text-gray-700">
                <AlertCircle className="w-5 h-5 text-red-500" />
                {item}
              </p>
            ))}
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4">Future Scope</h2>
            {futureScope.map((item, idx) => (
              <p key={idx} className="flex gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                {item}
              </p>
            ))}
          </Card>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/prediction")}
            className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white px-8 py-3 text-lg flex items-center gap-2 "
          >
            Apply Insights to Prediction
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
