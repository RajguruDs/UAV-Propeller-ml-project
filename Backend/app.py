from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Loading Model A
modelA_CT=joblib.load("Models/modelA_CT.pkl")
modelA_CP=joblib.load("Models/modelA_CP.pkl")
modelA_EF=joblib.load("Models/modelA_EF.pkl")

# Loading Model B
modelB_CT=joblib.load("Models/modelB_CT.pkl")
modelB_CP=joblib.load("Models/modelB_CP.pkl")
modelB_EF=joblib.load("Models/modelB_EF.pkl")

# Loading Dataset
dfA=pd.read_csv("Data/df_modelA.csv")
dfB=pd.read_csv("Data/df_modelB.csv")

# Finding nearest match function

def find_nearest_row(df, diameter, pitch, blades):
    """
    Find the closest matching propeller based on:
    1. Number of blades
    2. Nearest diameter
    3. Nearest pitch
    """

    # Step 1: Filter by blade count
    df_blade = df[df["number_of_blades"] == blades]

    # Fallback if blade count not found (safety)
    if df_blade.empty:
        df_blade = df.copy()

    # Step 2: Find nearest diameter
    df_blade = df_blade.copy()
    df_blade["dia_diff"] = abs(df_blade["propeller_diameter"] - diameter)
    min_dia = df_blade["dia_diff"].min()
    df_dia = df_blade[df_blade["dia_diff"] == min_dia]

    # Step 3: Find nearest pitch
    df_dia = df_dia.copy()
    df_dia["pitch_diff"] = abs(df_dia["propeller_pitch"] - pitch)
    min_pitch = df_dia["pitch_diff"].min()
    df_final = df_dia[df_dia["pitch_diff"] == min_pitch]

    # Step 4: Return best match
    return df_final.iloc[0]
# Experimental Dataset
@app.route("/api/experiment",methods=["GET","POST"])
def get_experiment_data():
    df = pd.read_csv("Data/experiment_brand_diverse.csv")
    df = df.head(250)
    df = df.replace({np.nan: None}) 
    return jsonify(df.to_dict(orient="records"))

# Geometrical Dataset
@app.route("/api/geometry",methods=["GET","POST"])
def get_geometry_data():
    df = pd.read_csv("Data/geometry_brand_diverse.csv")
    df = df.head(250)
    return jsonify(df.to_dict(orient="records"))

# Prediction Endpoint
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    # Read user inputs
    diameter = float(data["diameter"])
    pitch = float(data["pitch"])
    blades = int(data["blades"])
    adv_ratio = float(data["advance_ratio"])
    
    # Select models and dataset
    if blades == 2:
        model_CT=modelA_CT
        model_CP=modelA_CP
        model_EF=modelA_EF
        df = dfA
    else:
        model_CT=modelB_CT
        model_CP=modelB_CP
        model_EF=modelB_EF
        df = dfB
    
    # Find best matching propeller from dataset
    matched_row = find_nearest_row(df,diameter,pitch,blades)

    # Extract engineered aerodynamic features
    blade_area = matched_row["blade_area"]
    disc_area = matched_row["disc_area"]
    total_blade_area = matched_row['total_blade_area']
    solidity = matched_row["solidity"]

    # Prepare model input vector
    X = np.array([[
    diameter,
    pitch,
    adv_ratio,
    blade_area,
    disc_area,
    total_blade_area,
    solidity
    ]])

    # Predict Outputs
    y_pred_CT = model_CT.predict(X)[0]
    y_pred_CP = model_CP.predict(X)[0]
    y_pred_EF = model_EF.predict(X)[0]

    return jsonify({
        "matched_brand": matched_row["propeller_brand"],
        "matched_diameter": float(matched_row["propeller_diameter"]),
        "matched_pitch": float(matched_row["propeller_pitch"]),
        "thrust_coefficient": float(y_pred_CT),
        "power_coefficient": float(y_pred_CP),
        "efficiency": float(y_pred_EF),
    })



if __name__ == "__main__":
    app.run(debug=True)


