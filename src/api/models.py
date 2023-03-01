from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    # Enviamos FK
    tasks = db.relationship('Task', backref='user', lazy=True)        

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    priority = db.Column(db.String(10), nullable=False)
    done = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f'<Task {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "priority": self.priority,
            "done": self.done
            # do not serialize the password, its a security breach
        }

    # Recibimos FK
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)