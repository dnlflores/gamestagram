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

# existing = User.query.join(User.spaces).filter(User.username=='Bob', Space.name=='Mainspace').first()

    # exitA = Like.query.join(Like.image_id).filter(Image.user_id == current_user.id Image.id == image_id)

    image = Image.query.get(image_id)
    # print('                 ****hitting this route')
    # print('                 ****image.user_id', image.user_id)
    # print('                 ****current_user.id', current_user.id)
    like = Like.query.where(image.id == image_id).where(Like.user_id == current_user.id).first()
    # like = Like.query.filter(Like.user_id == current_user.id).first()

    # print('                 ****like', like)
    # like = Like.query.filter(image.id == image_id).where(image.user_id == current_user.id).first()
    db.session.query(Like).filter(image.id == image_id).filter(Like.user_id == current_user.id).delete()
    # unlike = db.session.query(Like).where(Image.id == image_id).where(Image.user_id == current_user.id).delete()

    db.session.commit()
    return like.to_dict()