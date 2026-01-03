from flask import Blueprint, request, jsonify
from utils.auth_middleware import token_required
from database.db_connection import get_db_connection

leave_bp = Blueprint("leave", __name__, url_prefix="/leave")

@leave_bp.route("/apply", methods=["POST"])
@token_required
def apply_leave():
    data = request.json
    user_id = request.user["user_id"]

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO hrms.leave_requests
        (user_id, leave_type_id, start_date, end_date, reason)
        VALUES (%s,%s,%s,%s,%s)
    """, (
        user_id,
        data["leave_type_id"],
        data["start_date"],
        data["end_date"],
        data["reason"]
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Leave applied"})
