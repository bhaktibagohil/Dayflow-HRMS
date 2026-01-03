from flask import Blueprint, request, jsonify
import jwt
from config import Config
from utils.password_hash import hash_password, check_password
from database.db_connection import get_db_connection

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    password = hash_password(data["password"])

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO hrms.users
        (employee_id, company_code, first_name, last_name, email,
         password_hash, role, year_of_joining)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        data["employee_id"],
        data["company_code"],
        data["first_name"],
        data["last_name"],
        data["email"],
        password,
        data["role"],
        data["year_of_joining"]
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "User registered"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, password_hash, role FROM hrms.users WHERE email=%s",
        (data["email"],)
    )
    user = cur.fetchone()

    if not user or not check_password(data["password"], user[1]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {"user_id": user[0], "role": user[2]},
        Config.SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"token": token})
