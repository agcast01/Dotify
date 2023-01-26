from flask import Blueprint, request
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Song, db, Playlist
from ..forms import PlaylistForm
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

playlist_routes=Blueprint('playlists', __name__)

@playlist_routes.route('/')
def playlists():
    """
    Query for all playlists
    """
    playlists = Playlist.query.all()
    return {playlist.id: playlist.to_dict() for playlist in playlists}, 200

@playlist_routes.route('/<int:id>')
def single_playlist(id):
    """
    Query for single playlist
    """

    playlist = Playlist.query.get(id)
    return playlist.to_dict(), 200

@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_playlist = Playlist()
        form.populate_obj(new_playlist)

        db.session.add(new_playlist)
        db.session.commit()

        return new_playlist.to_dict(), 201

    return validation_errors_to_error_messages(form.errors), 401

@playlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_playlist = Playlist.query.get(id)
        form.populate_obj(new_playlist)
        
        if request.files['image']:
            image = request.files['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            url = upload['url']
            new_playlist.imageUrl = url

        db.session.commit()

        return new_playlist.to_dict(), 201

    return validation_errors_to_error_messages(form.errors), 401

@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    db.session.delete(playlist)
    db.session.commit()