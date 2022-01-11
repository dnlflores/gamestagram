from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Image, Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('')
def get_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/<int:image_id>', methods=["POST"])
@login_required
def make_like(image_id):
    new_like = Like(user_id=current_user.id, image_id=image_id)
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()