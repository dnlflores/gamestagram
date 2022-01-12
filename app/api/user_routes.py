from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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


@user_routes.route('/<int:id>/follows')
def get_follows(id):
    # follows = User.query.filter(User.followers.user_id == id)
    user = User.query.get(id)
    print("         ANOTHER ATTEMPT AT USER FOLLOWERS => ", user.followers.all())

    followers = user.followers.all()

    print("         THIS IS THE COMPREHENSION => ", [user.to_dict() for user in followers])

    return {"follows": [user.to_dict() for user in followers]}