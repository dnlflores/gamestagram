from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image

image_routes = Blueprint('images', __name__)

@image_routes.route('')
def images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}
