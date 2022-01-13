from flask import Blueprint, jsonify, request, Request
from flask_login import login_required
from app.models import User, Image, db

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

    return {"user_images": [image.to_dict() for image in images]}


@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_user(id):
    follower_id = request.get_json()['follower_id']
    user_to_follow = User.query.get(id)
    user_that_follows = User.query.get(follower_id)
    user_to_follow.following.append(user_that_follows)

    db.session.commit()

    return user_that_follows.to_dict()


@user_routes.route('/<int:id>/follow', methods=["DELETE"])
@login_required
def unfollow_user(id):
    follower_id = request.get_json()['follower_id']
    user_to_unfollow = User.query.get(id)
    user_that_unfollows = User.query.get(follower_id)
    user_to_unfollow.following.remove(user_that_unfollows)

    db.session.commit()

    return user_that_unfollows.to_dict()
