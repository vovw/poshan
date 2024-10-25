import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

class GoogleDriveService:
    def __init__(self, client_id, client_secret, redirect_uri, refresh_token):
        self.drive_client = self.create_drive_client(client_id, client_secret, redirect_uri, refresh_token)

    def create_drive_client(self, client_id, client_secret, redirect_uri, refresh_token):
        credentials = Credentials(
            token=None,
            refresh_token=refresh_token,
            client_id=client_id,
            client_secret=client_secret,
            token_uri='https://oauth2.googleapis.com/token'
        )
        return build('drive', 'v3', credentials=credentials)

    def create_folder(self, folder_name):
        folder_metadata = {
            'name': folder_name,
            'mimeType': 'application/vnd.google-apps.folder'
        }
        folder = self.drive_client.files().create(body=folder_metadata, fields='id, name').execute()
        return folder

    def search_folder(self, folder_name):
        query = f"mimeType='application/vnd.google-apps.folder' and name='{folder_name}'"
        results = self.drive_client.files().list(q=query, fields='files(id, name)').execute()
        items = results.get('files', [])
        return items[0] if items else None

    def save_file(self, file_name, file_path, file_mime_type, folder_id=None):
        file_metadata = {
            'name': file_name,
            'mimeType': file_mime_type,
            'parents': [folder_id] if folder_id else []
        }
        media = MediaFileUpload(file_path, mimetype=file_mime_type)
        file = self.drive_client.files().create(body=file_metadata, media_body=media, fields='id').execute()
        self.set_file_permissions(file['id'])
        return file

    def delete_file(self, file_id):
        self.drive_client.files().delete(fileId=file_id).execute()

    def set_file_permissions(self, file_id):
        permissions = {
            'role': 'reader',
            'type': 'anyone'
        }
        self.drive_client.permissions().create(fileId=file_id, body=permissions).execute()
