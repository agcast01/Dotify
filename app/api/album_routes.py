from flask import Blueprint, request
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Song, db, Album
from ..forms import PlaylistForm, SongPlaylistForm
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

album_routes=Blueprint('albums', __name__)

@album_routes.route('/')
def albums():
    """
    Query for albums
    """
    albums = Album.query.all()
    return {album.id: album.to_dict() for album in albums}, 200

@album_routes.route('/<int:id>')
def single_album(id):
    """
    Query for single album
    """

    album = Album.query.get(id)
    return album.to_dict(), 200

@album_routes.route('/', methods=['POST'])
@login_required
def create_album():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_album = Album()
        form.populate_obj(new_album)

        db.session.add(new_album)
        db.session.commit()

        return new_album.to_dict(), 201

    return validation_errors_to_error_messages(form.errors), 401

@album_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_album(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_album = Album.query.get(id)
        new_album.title = form.data['title']
        new_album.description = form.data['description']

        
        if request.files:
            image = request.files['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            url = upload['url']
            new_album.imageUrl = url
        print(new_album)
        db.session.commit()

        return new_album.to_dict(), 201

    return validation_errors_to_error_messages(form.errors), 401

@album_routes.route('/<int:id>', methods=['POST'])
@login_required
def addSong(id):
    album = Album.query.get(id)
    
    form = SongPlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        song = Song.query.get(form.data['songId'])
        
        album.songs.append(song)

        db.session.commit()

        return album.to_dict(), 201

    return validation_errors_to_error_messages(form.errors), 401

@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()