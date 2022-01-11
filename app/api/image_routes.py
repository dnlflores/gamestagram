from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import Image, db
from app.forms import CreateGameForm, EditGameForm

image_routes = Blueprint('images', __name__)

@image_routes.route('')
def images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

@image_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_image(id):
    url = request.path
    id = url.split('/')[-1]
    image = Image.query.get(id)

    form = EditGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    image.caption = form.data['caption']

    # db.session.update(images).where(images.c.id==id).values(caption=form.data['caption'])
    # Image.update(images).where(images.c.id==id).values(caption=form.data['caption'])


    db.session.commit()

    print('image.to_dict() is', image.to_dict())
    print('form.data', form.data)
    return image.to_dict()
    

@image_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_image(id):
    url = request.path
    id = url.split('/')[-1]
    image = Image.query.get(id)
    result = image.to_dict()
    db.session.query(Image).filter(Image.id == id).delete()
    db.session.commit()
    # image.delete()
    return result


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = CreateGameForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    if form.validate_on_submit():
        caption = form.data['caption']
        new_image = Image(user_id=current_user.id, url=url, caption=caption)
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    return {"error": "There was some error I guess"}