import { useState, useEffect } from "react";
import { Download, FileText, Info } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import {
  Cog,
  BarChart,
  Ruler,
  Filter as FilterIcon,
  Layers,
  Scan,
} from "lucide-react";

export default function DatasetExplorer() {
  const [activeTab, setActiveTab] = useState("experiment");
  const [experimentData, setExperimentData] = useState([]);
  const [geometryData, setGeometryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const API_BASE_URL = "https://uav-propeller-ml-project.onrender.com";

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    setLoading(true);
    const apiUrl =
      activeTab === "experiment"
        ? `${API_BASE_URL}/api/experiment`
        : `${API_BASE_URL}/api/geometry`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        activeTab === "experiment"
          ? setExperimentData(data)
          : setGeometryData(data);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const data = activeTab === "experiment" ? experimentData : geometryData;

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  /* ---------------- CSV DOWNLOAD ---------------- */
  const downloadCSV = (dataset, filename) => {
    if (!dataset.length) return;

    const headers = Object.keys(dataset[0]).join(",");
    const rows = dataset.map((row) =>
      Object.values(row)
        .map((v) => `"${v}"`)
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------- SUMMARY STATS ---------------- */
  const uniqueBrands = [...new Set(data.map(d => d.propeller_brand))].length;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1f2937]">
            Dataset Explorer
          </h1>
          <p className="text-gray-600">
            Explore experimental and geometrical UAV propeller datasets
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6">
          {["experiment", "geometry"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium ${
                activeTab === tab
                  ? "bg-[#2563eb] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {tab === "experiment"
                ? "Experimental Dataset"
                : "Geometrical Dataset"}
            </button>
          ))}
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <SummaryCard title="Records Displayed" value={data.length} />
          <SummaryCard title="Unique Brands" value={uniqueBrands} />
          <SummaryCard title="Rows / Page" value={rowsPerPage} />
          <SummaryCard
            title="Dataset Type"
            value={activeTab === "experiment" ? "Performance" : "Geometry"}
          />
        </div>

        {/* SAMPLE DATASET DISCLAIMER */}
        <Card className="mb-6 border-l-4 border-blue-500">
          <div className="flex gap-3">
            <Info className="text-blue-500" />
            <p className="text-gray-700 text-sm">
              This page displays a <strong>representative sample</strong> of the
              dataset for exploration. The complete dataset is available via CSV
              download for detailed analysis.
            </p>
          </div>
        </Card>

        {/* DATA TABLE */}
        <Card className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {activeTab === "experiment"
                ? "Experimental Data"
                : "Geometrical Data"}
            </h2>

            <div className="flex gap-3 items-center">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                {[10, 25, 50].map(n => (
                  <option key={n} value={n}>{n} rows</option>
                ))}
              </select>

              <Button
                variant="outline"
                onClick={() =>
                  downloadCSV(
                    data,
                    activeTab === "experiment"
                      ? "experimental_dataset.csv"
                      : "geometrical_dataset.csv"
                  )
                }
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-6">Loading...</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border shadow-sm">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr className="border-b">
                    {activeTab === "experiment" ? (
                      <>
                        <th className="py-3 px-4 text-left">Brand</th>
                        <th className="py-3 px-4 text-right">Diameter</th>
                        <th className="py-3 px-4 text-right">Pitch</th>
                        <th className="py-3 px-4 text-right">Blades</th>
                        <th className="py-3 px-4 text-right">RPM</th>
                        <th className="py-3 px-4 text-right">Ct</th>
                        <th className="py-3 px-4 text-right">Cp</th>
                        <th className="py-3 px-4 text-right font-semibold">Efficiency</th>
                      </>
                    ) : (
                      <>
                        <th className="py-3 px-4">Blade</th>
                        <th className="py-3 px-4">Brand</th>
                        <th className="py-3 px-4 text-right">Diameter</th>
                        <th className="py-3 px-4 text-right">Pitch</th>
                        <th className="py-3 px-4 text-right">c/R</th>
                        <th className="py-3 px-4 text-right">r/R</th>
                        <th className="py-3 px-4 text-right">Beta</th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}
                    >
                      {activeTab === "experiment" ? (
                        <>
                          <td className="py-3 px-4 font-medium">
                            {row.propeller_brand}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.propeller_diameter}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.propeller_pitch}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.number_of_blades}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.rpm_rotation_input}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.thrust_coefficient_output?.toFixed(3)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.power_coefficient_output?.toFixed(3)}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-green-700">
                            {row.efficiency_output?.toFixed(3)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4 font-medium">
                            {row.blade_name}
                          </td>
                          <td className="py-3 px-4">
                            {row.propeller_brand}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.propeller_diameter}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row.propeller_pitch}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row["c/R"]}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row["r/R"]}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {row["beta_-_angle_relative_to_rotation"]}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}

          {/* PAGINATION */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </Button>
            <span>Page {currentPage} / {totalPages || 1}</span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </Card>

        {/* REPEATED ROW EXPLANATION */}
        <Card className="mb-10">
          <h3 className="font-semibold mb-2">
            Why do some rows appear similar?
          </h3>
          <p className="text-sm text-gray-700">
            Similar rows represent repeated experimental measurements of the
            same propeller geometry under different aerodynamic operating
            conditions. These observations are essential for capturing complete
            performance curves and are intentionally preserved.
          </p>
        </Card>

        {/* PREPROCESSING PIPELINE */}
        <Card className="mt-12">
          <h2 className="text-2xl font-bold mb-2">
            Data Preprocessing Pipeline
          </h2>
          <p className="text-gray-600 mb-8">
            The following steps were applied sequentially to transform raw experimental
            and geometrical data into a clean, consistent, and machine-learning-ready dataset.
          </p>

          <div className="space-y-6">

            <PipelineStep
              step="01"
              icon={<Scan />}
              title="Missing Value Treatment"
              purpose="Ensure dataset completeness"
              desc="Missing numerical values were handled using KNN imputation and curve interpolation techniques to preserve geometric continuity."
            />

            <PipelineStep
              step="02"
              icon={<FilterIcon />}
              title="Outlier Removal"
              purpose="Remove unstable experimental noise"
              desc="Extreme RPM readings and abnormal aerodynamic coefficients were filtered using statistical thresholds and stability checks."
            />

            <PipelineStep
              step="03"
              icon={<Cog />}
              title="Feature Engineering"
              purpose="Extract meaningful aerodynamic information"
              desc="Derived additional features such as advance ratio, solidity, and performance indicators to enhance predictive capability."
            />

            <PipelineStep
              step="04"
              icon={<BarChart />}
              title="Normalization"
              purpose="Ensure balanced model learning"
              desc="Thrust coefficient, power coefficient, and efficiency values were scaled to avoid dominance of large-magnitude features."
            />

            <PipelineStep
              step="05"
              icon={<Ruler />}
              title="Geometry Mapping"
              purpose="Convert non-dimensional inputs"
              desc="Blade geometry parameters (c/R, r/R) were converted into usable chord and radius distributions."
            />

            <PipelineStep
              step="06"
              icon={<Layers />}
              title="Dataset Merging"
              purpose="Create ML-ready dataset"
              desc="Cleaned experimental and geometrical datasets were merged to form the final dataset used for model training and evaluation."
            />

          </div>

          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-sm text-gray-600">
              ✔ All preprocessing steps were validated before model training
            </p>

            <Button
              onClick={() =>
                window.open("https://www.notion.so/UAV-Propeller-Dataset-2cdd12fcb09480aa8249e61cc43b4e15?source=copy_link", "_blank")
              }
            >
              <FileText className="w-4 h-4 mr-2" />
              View Detailed Dataset Documentation
            </Button>
          </div>
        </Card>


      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function SummaryCard({ title, value }) {
  return (
    <Card>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}

function ProcessCard({ icon, title, desc }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow border flex gap-3">
      <div className="text-[#2563eb]">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
function PipelineStep({ step, icon, title, purpose, desc }) {
  return (
    <div className="flex gap-5 items-start bg-white p-5 rounded-xl border shadow-sm">
      <div className="flex flex-col items-center">
        <div className="text-sm font-bold text-blue-600">
          STEP {step}
        </div>
        <div className="mt-2 text-[#2563eb]">
          {icon}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
        <p className="text-sm text-blue-600 mb-1">
          {purpose}
        </p>
        <p className="text-sm text-gray-600">
          {desc}
        </p>
      </div>
    </div>
  );
}
