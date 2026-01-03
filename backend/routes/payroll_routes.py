from flask import Blueprint, jsonify
from utils.auth_middleware import token_required
from database.db_connection import get_db_connection

payroll_bp = Blueprint("payroll", __name__, url_prefix="/payroll")

@payroll_bp.route("/<int:user_id>", methods=["GET"])
@token_required
def view_payroll(user_id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT month, net_salary
        FROM hrms.payroll
        WHERE user_id=%s
    """, (user_id,))

    data = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(data)
