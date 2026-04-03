# 🚁 UAV Propeller Performance Analysis using Machine Learning

## 📌 Overview
This project presents a **data-driven framework** to analyze and predict the performance of UAV (Unmanned Aerial Vehicle) propellers using **Machine Learning and Data Science techniques**.

The system focuses on improving **thrust, efficiency, and aerodynamic performance**, while also providing **practical recommendations for drone applications** such as agriculture, delivery, and mapping.

---

## 🎯 Objectives
- Perform **data preprocessing and feature engineering** on UAV datasets  
- Build ML models to predict:
  - Thrust Coefficient  
  - Power Coefficient  
  - Efficiency  
- Derive extended metrics:
  - Payload Capacity  
  - Endurance  
  - RPM Range  
  - Noise Level  
- Develop a **Drone Type Recommender System**  
- Create a **web-based platform** for predictions & visualization  
- Deploy the system for real-world usability  

---

## 🧠 Key Features
✔️ Machine Learning-based Predictions  
✔️ Aerodynamic Performance Analysis  
✔️ Data Visualization Dashboard (Tableau)  
✔️ Drone Recommendation System  
✔️ Web Application (React + Flask)  
✔️ Real-time Input & Prediction  

---

## 🗂️ Project Structure
```bash
├── data/
│   ├── experiment_data/
│   ├── geometry_data/
│
├── notebooks/
│   ├── data_preprocessing.ipynb
│   ├── feature_engineering.ipynb
│   ├── model_training.ipynb
│
├── models/
│   ├── trained_model.pkl
│
├── backend/
│   ├── app.py
│   ├── routes/
│
├── frontend/
│   ├── React App
│
├── dashboard/
│   ├── Tableau Files
│
└── README.md
```

---

## ⚙️ Tech Stack

### 👨‍💻 Frontend
- HTML, CSS, JavaScript  
- React.js  

### 🔧 Backend
- Python (Flask)  
- REST APIs  

### 🗄️ Database
- MongoDB  

### 📊 Data Science & ML
- Pandas  
- NumPy  
- Scikit-learn  
- Gradient Boosting  

### 📈 Visualization
- Tableau  

---

## 📊 Dataset Description

The project uses **experimental and geometric datasets** containing:

### Input Features
- Number of Blades  
- Diameter  
- Pitch  
- Advanced Ratio  
- RPM  
- Blade Geometry (Chord, Radius, Angle)  

### Output Variables
- Thrust Coefficient  
- Power Coefficient  
- Efficiency  

### Derived Feature
- **Solidity (Blade Area / Disc Area)**  

---

## 🔍 Methodology

### 1. Data Preprocessing
- Merging multiple datasets  
- Handling missing values  
- Feature engineering (Solidity, Blade Area)  

### 2. Exploratory Data Analysis
- Correlation Heatmaps  
- Bivariate Analysis  
- Distribution Plots  

### 3. Model Building
- Gradient Boosting Algorithm  
- Model comparison:
  - Without missing value treatment  
  - With imputation  
  - Without solidity  

### 4. Model Evaluation
- MAE (Mean Absolute Error)  
- RMSE (Root Mean Square Error)  
- R² Score  

### 5. Deployment
- Flask API for predictions  
- React frontend for UI  
- Tableau dashboards  

---

## 🚀 How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/uav-propeller-analysis.git
cd uav-propeller-analysis
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Backend
```bash
python app.py
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📸 Screenshots
_Add screenshots of your project here (dashboard, prediction UI, results, etc.)_

---

## 📌 Applications
- UAV Design Optimization  
- Aerodynamic Research  
- Drone Manufacturing  
- Urban Air Mobility  
- Defense & Surveillance  

---

## 📈 Future Enhancements
- Deep Learning Models  
- Real-time UAV Sensor Integration  
- Cloud Deployment (AWS/GCP)  
- Mobile App Integration  

---

## 👨‍🎓 Author
**Rajguru Mathiyalagan**  
T.Y.B.Sc. Information Technology  

---

## 🙏 Acknowledgement
Special thanks to my project guide and faculty for their continuous support and guidance.

---

## 📜 License
This project is for academic purposes. You may reuse or modify with proper credit.
