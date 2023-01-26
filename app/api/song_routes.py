from flask import Blueprint, request
from flask_login import login_required
from app.models import Song, db
from ..forms.song_form import SongForm
from.auth_routes import validation_errors_to_error_messages
import logging
import boto3
from botocore.exceptions import ClientError
import os
from app.aws_config import (
    upload_file_to_s3, allowed_file, get_unique_filename
)

s3 = boto3.resource('s3')

bucket = 'dotify-bucket'

def upload_file(file_name, bucket, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    s3_client = boto3.client('s3')
    try: 
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

song_routes=Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {song.id : song.to_dict() for song in songs}, 200

@song_routes.route('/<int:id>')
def single_song(id):
    """
    Query for single song and returns it as a dictionary
    """
    song = Song.query.get(id)
    return song.to_dict(), 200

@song_routes.route('/', methods=['POST'])
@login_required
def upload_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song()
        form.populate_obj(new_song)
        
        song = request.files['song']
        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)
        url = upload['url']
        new_song.file_name = url

        db.session.add(new_song)
        db.session.commit()
        
        return new_song.to_dict(), 201

    return validation_errors_to_error_messages(form.errors), 401

@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_song(id):
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song = Song.query.get(id)

        song.title = form.data['title']

        db.session.commit()
        return song.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 401

@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):

    song = Song.query.get(id)
    db.session.delete(song)
    db.session.commit()