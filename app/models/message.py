from .db import db

class Message(db.Model):
    __tablename__="messages"

    id = db.Column(db.Integer, primary_key=True)

    content = db.Column(db.String(255), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)

    user = db.relationship('User', back_populates="messages")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id
        }