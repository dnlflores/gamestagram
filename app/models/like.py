from .db import db

class Like(db.Model):
    __tablename__="likes"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)

    user = db.relationship('User', back_populates="like")
    image = db.relationship('Image', back_populates="like")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image_id": self.image_id
        }