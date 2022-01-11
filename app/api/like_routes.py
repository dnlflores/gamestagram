from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Image, Like

like_routes = Blueprint('likes', __name__)

@like_routes.route("")
@login_required
def get_likes():
    likes = Like.query.all()
    print('backend comment: likes is', likes)
    print('backend comment: likes is', likes)
    print('backend comment: likes is', likes)
    print('********************************')
    print([like.to_dict() for like in likes])
    print('********************************')
    return {'likes': [like.to_dict() for like in likes]}



# @image_routes.route("", methods=["POST"])
# @login_required
# def upload_image():
#     form = CreateGameForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if "image" not in request.files:
#         return {"errors": "image required"}, 400

#     image = request.files["image"]

#     if not allowed_file(image.filename):
#         return {"errors": "file type not permitted"}, 400

#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400

#     url = upload["url"]
#     # flask_login allows us to get the current user from the request
#     if form.validate_on_submit():
#         caption = form.data['caption']
#         new_image = Image(user_id=current_user.id, url=url, caption=caption)
#         db.session.add(new_image)
#         db.session.commit()
#         return new_image.to_dict()
#     return {"error": "There was some error I guess"}
