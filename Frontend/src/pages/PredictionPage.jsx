import { useState } from "react";
import {
  Sparkles,
  Tractor,
  Package,
  Video,
  Map,
  Zap,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    blades: "",
    diameter: "",
    pitch: "",
    advanceRatio: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- Drone Recommendation Logic ---------------- */

  const getDroneRecommendation = (ct, cp, efficiency, pitch, advRatio) => {
    if (advRatio >= 0.7 && pitch >= 6.5) {
      return {
        title: "Racing / Performance Drone",
        icon: Zap,
        color: "from-red-500 to-orange-600",
        description:
          "High advance ratio and aggressive pitch indicate a speed-focused racing configuration.",
      };
    }

    if (ct >= 0.085 && advRatio <= 0.5) {
      return {
        title: "Agriculture Drone",
        icon: Tractor,
        color: "from-lime-500 to-green-700",
        description:
          "High thrust at lower advance ratios makes this configuration suitable for agricultural payload lifting.",
      };
    }

    if (ct >= 0.085 && cp >= 0.06) {
      return {
        title: "Delivery Drone",
        icon: Package,
        color: "from-blue-500 to-indigo-600",
        description:
          "High thrust combined with higher power usage is suitable for payload delivery operations.",
      };
    }

    if (efficiency >= 0.58) {
      return {
        title: "Surveillance Drone",
        icon: Video,
        color: "from-emerald-500 to-green-600",
        description:
          "Higher aerodynamic efficiency makes this propeller suitable for long-endurance surveillance missions.",
      };
    }

    if (efficiency >= 0.52 && cp <= 0.065) {
      return {
        title: "Mapping Drone",
        icon: Map,
        color: "from-sky-500 to-cyan-600",
        description:
          "Balanced thrust and efficiency enable stable hovering for mapping and surveying tasks.",
      };
    }

    return {
      title: "General Purpose UAV",
      icon: Map,
      color: "from-gray-500 to-slate-600",
      description:
        "This configuration provides moderate performance suitable for general UAV applications.",
    };
  };

  /* ---------------- Inline Guidance (Neutral) ---------------- */

  const getFieldGuidance = () => {
    const guidance = {};

    const blades = Number(formData.blades);
    const diameter = Number(formData.diameter);
    const pitch = Number(formData.pitch);
    const advRatio = Number(formData.advanceRatio);

    if (!formData.blades) {
      guidance.blades = "Select blade count to view valid input ranges.";
      return guidance;
    }

    if (Number.isNaN(diameter))
      guidance.diameter = "Enter a valid numeric value.";
    if (Number.isNaN(pitch))
      guidance.pitch = "Enter a valid numeric value.";
    if (Number.isNaN(advRatio))
      guidance.advanceRatio = "Enter a valid numeric value.";

    if (blades === 2) {
      if (diameter < 9 || diameter > 19)
        guidance.diameter =
          "Valid range for 2-blade propellers: 9–19 inches.";

      if (pitch < 4 || pitch > 13)
        guidance.pitch =
          "Valid range for 2-blade propellers: 4–13 inches.";

      if (advRatio < 0.2 || advRatio > 0.7)
        guidance.advanceRatio =
          "Valid advance ratio for 2-blade propellers: 0.2–0.7.";
    }

    if (blades === 3 || blades === 4) {
      if (diameter < 5 || diameter > 9)
        guidance.diameter =
          "Valid range for 3/4-blade propellers: 5–9 inches.";

      if (pitch < 3 || pitch > 7.7)
        guidance.pitch =
          "Valid range for 3/4-blade propellers: 3–7.7 inches.";

      if (advRatio < 0.2 || advRatio > 0.8)
        guidance.advanceRatio =
          "Valid advance ratio for 3/4-blade propellers: 0.2–0.8.";
    }

    return guidance;
  };

  const fieldGuidance = getFieldGuidance();
  const hasInvalidInput = Object.keys(fieldGuidance).length > 0;

  /* ---------------- API Call ---------------- */

  const handlePredict = async () => {
    if (hasInvalidInput) return;

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blades: Number(formData.blades),
          diameter: Number(formData.diameter),
          pitch: Number(formData.pitch),
          advance_ratio: Number(formData.advanceRatio),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Prediction failed");

      const recommendation = getDroneRecommendation(
        data.thrust_coefficient,
        data.power_coefficient,
        data.efficiency,
        Number(formData.pitch),
        Number(formData.advanceRatio)
      );

      setPrediction({
        thrust: data.thrust_coefficient,
        power: data.power_coefficient,
        efficiency: data.efficiency,
        recommendation,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            UAV Propeller Performance Prediction
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Predict aerodynamic performance and receive intelligent drone-type
            recommendations using machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Input Card */}
          <Card className="bg-white/80 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">Input Parameters</h2>

            <div className="space-y-4">
              <Select
                label="Number of Blades"
                placeholder="Select blade count"
                options={["2", "3", "4"]}
                value={formData.blades}
                onChange={(e) =>
                  setFormData({ ...formData, blades: e.target.value })
                }
              />
              {fieldGuidance.blades && (
                <p className="text-xs text-slate-500 italic">
                  {fieldGuidance.blades}
                </p>
              )}

              <Input
                label="Propeller Diameter (inches)"
                type="number"
                value={formData.diameter}
                onChange={(e) =>
                  setFormData({ ...formData, diameter: e.target.value })
                }
              />
              {fieldGuidance.diameter && (
                <p className="text-xs text-slate-500 italic">
                  {fieldGuidance.diameter}
                </p>
              )}

              <Input
                label="Propeller Pitch (inches)"
                type="number"
                value={formData.pitch}
                onChange={(e) =>
                  setFormData({ ...formData, pitch: e.target.value })
                }
              />
              {fieldGuidance.pitch && (
                <p className="text-xs text-slate-500 italic">
                  {fieldGuidance.pitch}
                </p>
              )}

              <Input
                label="Advance Ratio"
                type="number"
                step="0.01"
                value={formData.advanceRatio}
                onChange={(e) =>
                  setFormData({ ...formData, advanceRatio: e.target.value })
                }
              />
              {fieldGuidance.advanceRatio && (
                <p className="text-xs text-slate-500 italic">
                  {fieldGuidance.advanceRatio}
                </p>
              )}

              <Button
                onClick={handlePredict}
                disabled={loading || hasInvalidInput}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 mr-2 inline" />
                {loading ? "Predicting..." : "Predict Performance"}
              </Button>

              {hasInvalidInput && (
                <p className="text-xs text-slate-500 text-center">
                  Prediction is enabled only for values within the trained data
                  range.
                </p>
              )}
            </div>
          </Card>

          {/* Results Card */}
          <Card className="bg-white/80 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">Prediction Results</h2>

            {!prediction ? (
              <div className="text-center py-16 text-slate-400">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter valid parameters to view results</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Metric
                    title="Thrust Coefficient (Ct)"
                    value={prediction.thrust.toFixed(3)}
                    gradient="from-indigo-500 to-blue-600"
                  />
                  <Metric
                    title="Power Coefficient (Cp)"
                    value={prediction.power.toFixed(3)}
                    gradient="from-purple-500 to-fuchsia-600"
                  />
                  <Metric
                    title="Efficiency"
                    value={`${(prediction.efficiency * 100).toFixed(1)}%`}
                    gradient="from-emerald-500 to-green-600"
                  />
                </div>

                <DroneRecommendation {...prediction.recommendation} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sub Components ---------------- */

function Metric({ title, value, gradient }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}>
      <p className="text-xs uppercase tracking-wide opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function DroneRecommendation({ title, description, icon: Icon, color }) {
  return (
    <div className={`rounded-2xl p-6 text-white bg-gradient-to-r ${color} shadow-xl`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-7 h-7" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}
