from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db

message_routes = Blueprint('messages', __name__)

@message_routes.route('')
def messages():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}