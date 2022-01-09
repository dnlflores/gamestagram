from .db import db

class Image(db.Model):
    __tablename__="images"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "caption": self.caption,
            "url": self.url
        }