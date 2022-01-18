from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import Image, Comment, db
from app.forms import CreateGameForm, EditGameForm, CreateCommentForm, EditCommentForm

image_routes = Blueprint('images', __name__)


@image_routes.route('')
def images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}


@image_routes.route('/<int:id>')
def get_image(id):
    image = Image.query.get(id)
    return {'image': image.to_dict()}


@image_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_image(id):
    image = Image.query.get(id)

    form = EditGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    image.caption = form.data['caption']

    db.session.commit()

    return image.to_dict()


@image_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    result = image.to_dict()
    imageToDelete = db.session.query(Image).filter(Image.id == id).first()

    db.session.delete(imageToDelete)

    db.session.commit()
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


@image_routes.route('/comments')
def load_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}


@image_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def create_comment(id):
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        content = form.data['content']
        new_comment = Comment(
            content=content,
            user_id=current_user.id,
            image_id=id
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {"error": form.errors}

@image_routes.route('/<int:image_id>/comments/<int:comment_id>', methods=["PUT"])
@login_required
def edit_comment(image_id, comment_id):
    comment = Comment.query.get(comment_id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment.content = form.data['content']

    db.session.commit()

    return comment.to_dict()

@image_routes.route('/<int:image_id>/comments/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment(image_id, comment_id):
    comment = Comment.query.get(comment_id)
    result = comment.to_dict()
    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()
    db.session.delete(comment)

    db.session.commit()
    return result
