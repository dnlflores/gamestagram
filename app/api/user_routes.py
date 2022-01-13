from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/followings')
def get_followings(id):
    user = User.query.get(id)
    followings = user.followers.all()

    return {"followings": [user.to_dict() for user in followings]}


@user_routes.route('/<int:id>/followers')
def get_followers(id):
    user = User.query.get(id)
    followers = user.following.all()

    return {"followers": [user.to_dict() for user in followers]}


@user_routes.route('/<int:id>/games')
def get_user_images(id):
    images = list(Image.query.filter(Image.user_id == id))

    print("         THESES ARE THE IMAGES => ", images)

    return {"user_images": [image.to_dict() for image in images]}