from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Image, Like
from sqlalchemy import and_

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

@like_routes.route('/<int:image_id>', methods=["DELETE"])
@login_required
def unmake_like(image_id):


    image = Image.query.get(image_id)

    likes = Like.query.all()

    user_likes = [like for like in likes if like.user_id == current_user.id]

    for like in user_likes:
        if like.image_id == image_id:
            likeToDelete = like

    db.session.query(Like).filter(likeToDelete.id == like.id).delete()

    db.session.commit()
    return likeToDelete.to_dict()