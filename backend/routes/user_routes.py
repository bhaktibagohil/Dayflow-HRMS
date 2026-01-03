from flask import Blueprint, request, jsonify
from utils.auth_middleware import token_required
from database.db_connection import get_db_connection

user_bp = Blueprint("user", __name__, url_prefix="/user")

@user_bp.route("/profile", methods=["POST"])
@token_required
def create_profile():
    data = request.json
    user_id = request.user["user_id"]

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO hrms.employee_profiles
        (user_id, first_name, last_name, phone, designation, department)
        VALUES (%s,%s,%s,%s,%s,%s)
    """, (
        user_id,
        data["first_name"],
        data["last_name"],
        data["phone"],
        data["designation"],
        data["department"]
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Profile created"})
