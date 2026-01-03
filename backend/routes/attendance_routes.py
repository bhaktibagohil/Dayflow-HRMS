from flask import Blueprint, jsonify, request
from utils.auth_middleware import token_required
from database.db_connection import get_db_connection
from datetime import date, datetime

attendance_bp = Blueprint("attendance", __name__, url_prefix="/attendance")

@attendance_bp.route("/checkin", methods=["POST"])
@token_required
def checkin():
    user_id = request.user["user_id"]

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO hrms.attendance (user_id, date, check_in, status)
        VALUES (%s, %s, %s, 'PRESENT')
    """, (
        user_id,
        date.today(),
        datetime.now().time()
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Checked in successfully"})
