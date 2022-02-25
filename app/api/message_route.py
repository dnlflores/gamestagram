from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db

message_routes = Blueprint('messages', __name__)

@message_routes.route('')
@login_required
def messages():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/<int:receiver_id>', methods=['POST'])
@login_required
def create_message(receiver_id):
    form = CreateMessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        content = form.data['content']
        new_message = Message(sender_id=current_user.id, receiver_id=receiver_id, content=content)
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
