from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import mysql.connector
import os

# -------------------- BASE DIR --------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -------------------- APP SETUP --------------------

app = Flask(__name__)
CORS(app)

# -------------------- DATABASE CONNECTION --------------------

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DB"),
        port=int(os.getenv("MYSQL_PORT"))
    )

# -------------------- LOAD MODELS --------------------
# Model A (2 blades)

modelA_CT = joblib.load(os.path.join(BASE_DIR, "Models", "modelA_CT.pkl"))
modelA_CP = joblib.load(os.path.join(BASE_DIR, "Models", "modelA_CP.pkl"))
modelA_EF = joblib.load(os.path.join(BASE_DIR, "Models", "modelA_EF.pkl"))

# Model B (3 & 4 blades)

modelB_CT = joblib.load(os.path.join(BASE_DIR, "Models", "modelB_CT.pkl"))
modelB_CP = joblib.load(os.path.join(BASE_DIR, "Models", "modelB_CP.pkl"))
modelB_EF = joblib.load(os.path.join(BASE_DIR, "Models", "modelB_EF.pkl"))

# -------------------- LOAD RUNTIME DATASETS --------------------
# NOTE: These are REDUCED pickle files (<100 MB)

dfA = pd.read_pickle(os.path.join(BASE_DIR, "Data", "df_modelA_runtime.pkl"))
dfB = pd.read_pickle(os.path.join(BASE_DIR, "Data", "df_modelB.pkl"))
# -------------------- HELPER FUNCTION --------------------

def find_nearest_row(df, diameter, pitch, blades):
    df_blade = df[df["number_of_blades"] == blades]
    if df_blade.empty:
        df_blade = df.copy()

    df_blade = df_blade.copy()
    df_blade["dia_diff"] = abs(df_blade["propeller_diameter"] - diameter)
    df_dia = df_blade[df_blade["dia_diff"] == df_blade["dia_diff"].min()]

    df_dia = df_dia.copy()
    df_dia["pitch_diff"] = abs(df_dia["propeller_pitch"] - pitch)
    df_final = df_dia[df_dia["pitch_diff"] == df_dia["pitch_diff"].min()]

    return df_final.iloc[0]

# -------------------- API ROUTES --------------------

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "Backend is running"}), 200

@app.route("/api/experiment", methods=["GET"])
def get_experiment_data():
    df = pd.read_csv(
        os.path.join(BASE_DIR, "Data", "experiment_brand_diverse.csv")
    ).head(250)
    df = df.replace({np.nan: None})
    return jsonify(df.to_dict(orient="records"))

@app.route("/api/geometry", methods=["GET"])
def get_geometry_data():
    df = pd.read_csv(
        os.path.join(BASE_DIR, "Data", "geometry_brand_diverse.csv")
    ).head(250)
    return jsonify(df.to_dict(orient="records"))

# -------------------- PREDICTION ENDPOINT --------------------

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    diameter = float(data["diameter"])
    pitch = float(data["pitch"])
    blades = int(data["blades"])
    adv_ratio = float(data["advance_ratio"])

    # Model selection
    if blades == 2:
        model_CT, model_CP, model_EF = modelA_CT, modelA_CP, modelA_EF
        df = dfA
    else:
        model_CT, model_CP, model_EF = modelB_CT, modelB_CP, modelB_EF
        df = dfB

    matched_row = find_nearest_row(df, diameter, pitch, blades)

    blade_area = matched_row["blade_area"]
    disc_area = matched_row["disc_area"]
    total_blade_area = matched_row["total_blade_area"]
    solidity = matched_row["solidity"]

    X = np.array([[
        diameter,
        pitch,
        adv_ratio,
        blade_area,
        disc_area,
        total_blade_area,
        solidity
    ]])

    y_pred_CT = float(model_CT.predict(X)[0])
    y_pred_CP = float(model_CP.predict(X)[0])
    y_pred_EF = float(model_EF.predict(X)[0])

    # Drone type logic
    drone_type = "General Purpose UAV"

    if adv_ratio >= 0.7 and pitch >= 6.5:
        drone_type = "Racing Drone"
    elif y_pred_CT >= 0.085 and adv_ratio <= 0.5:
        drone_type = "Agriculture Drone"
    elif y_pred_CT >= 0.085 and y_pred_CP >= 0.06:
        drone_type = "Delivery Drone"
    elif y_pred_EF >= 0.58:
        drone_type = "Surveillance Drone"
    elif y_pred_EF >= 0.52 and y_pred_CP <= 0.065:
        drone_type = "Mapping Drone"

    # Store in MySQL
    db = get_db_connection()
    cursor = db.cursor()

    insert_query = """
        INSERT INTO prediction_logs (
            blades,
            diameter,
            pitch,
            advance_ratio,
            thrust_coefficient,
            power_coefficient,
            efficiency,
            drone_type
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        blades,
        diameter,
        pitch,
        adv_ratio,
        y_pred_CT,
        y_pred_CP,
        y_pred_EF,
        drone_type
    )

    cursor.execute(insert_query, values)
    db.commit()
    cursor.close()
    db.close()

    return jsonify({
        "matched_brand": matched_row["propeller_brand"],
        "matched_diameter": float(matched_row["propeller_diameter"]),
        "matched_pitch": float(matched_row["propeller_pitch"]),
        "thrust_coefficient": y_pred_CT,
        "power_coefficient": y_pred_CP,
        "efficiency": y_pred_EF,
        "drone_type": drone_type
    })

# -------------------- RUN APP --------------------

if __name__ == "__main__":
    app.run()
