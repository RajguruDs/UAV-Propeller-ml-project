from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import psycopg2
import os

# -------------------- BASE DIR --------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -------------------- APP SETUP --------------------
app = Flask(__name__)
CORS(app)

# -------------------- DATABASE CONNECTION --------------------
def get_db_connection():
    return psycopg2.connect(
        os.getenv("DATABASE_URL"),
        sslmode="require",
        connect_timeout=5   # 🔥 prevents hanging
    )

# -------------------- LOAD MODELS --------------------
modelA_CT = joblib.load(os.path.join(BASE_DIR, "Models", "modelA_CT.pkl"))
modelA_CP = joblib.load(os.path.join(BASE_DIR, "Models", "modelA_CP.pkl"))
modelA_EF = joblib.load(os.path.join(BASE_DIR, "Models", "modelA_EF.pkl"))

modelB_CT = joblib.load(os.path.join(BASE_DIR, "Models", "modelB_CT.pkl"))
modelB_CP = joblib.load(os.path.join(BASE_DIR, "Models", "modelB_CP.pkl"))
modelB_EF = joblib.load(os.path.join(BASE_DIR, "Models", "modelB_EF.pkl"))

# -------------------- LOAD DATA --------------------
dfA = pd.read_pickle(os.path.join(BASE_DIR, "Data", "df_modelA_runtime.pkl"))
dfB = pd.read_pickle(os.path.join(BASE_DIR, "Data", "df_modelB.pkl"))

# -------------------- HELPER --------------------
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

# -------------------- ROUTES --------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend is running"}), 200


@app.route("/api/experiment", methods=["GET"])
def experiment():
    try:
        df = pd.read_pickle(
            os.path.join(BASE_DIR, "Data", "experiment_runtime.pkl")
        ).head(250)

        df = df.replace({np.nan: None})
        return jsonify(df.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/geometry", methods=["GET"])
def geometry():
    try:
        df = pd.read_pickle(
            os.path.join(BASE_DIR, "Data", "geometry_runtime.pkl")
        ).head(250)

        return jsonify(df.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- PREDICTION --------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
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

        # 🔥 MODEL PREDICTION
        y_pred_CT = float(model_CT.predict(X)[0])
        y_pred_CP = float(model_CP.predict(X)[0])
        y_pred_EF = float(model_EF.predict(X)[0])

        # ---------------- DRONE LOGIC ----------------
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

        # ---------------- DB INSERT (SAFE) ----------------
        try:
            print("➡️ Attempting DB insert...")

            db = get_db_connection()
            cursor = db.cursor()

            cursor.execute("""
                INSERT INTO prediction_logs (
                    blades, diameter, pitch, advance_ratio,
                    thrust_coefficient, power_coefficient,
                    efficiency, drone_type
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                blades,
                diameter,
                pitch,
                adv_ratio,
                y_pred_CT,
                y_pred_CP,
                y_pred_EF,
                drone_type
            ))

            db.commit()
            cursor.close()
            db.close()

            print("DB INSERT SUCCESS")

        except Exception as db_error:
            print("DB ERROR:", db_error)

        # ALWAYS RETURN RESPONSE (IMPORTANT)
        return jsonify({
            "matched_brand": matched_row["propeller_brand"],
            "matched_diameter": float(matched_row["propeller_diameter"]),
            "matched_pitch": float(matched_row["propeller_pitch"]),
            "thrust_coefficient": y_pred_CT,
            "power_coefficient": y_pred_CP,
            "efficiency": y_pred_EF,
            "drone_type": drone_type
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


# -------------------- RUN --------------------
if __name__ == "__main__":
    app.run(debug=True)