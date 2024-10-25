import os
import base64
from google_drive import GoogleDriveService
import dotenv
dotenv.load_dotenv()

async def upload_image_to_drive(base64_image):
    # Configuration for Google Drive
    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")
    redirect_uri = os.getenv("REDIRECT_URI")
    refresh_token = os.getenv("REFRESH_TOKEN")
    
    # Decode the base64 string
    header, encoded = base64_image.split(',', 1)
    image_data = base64.b64decode(encoded)

    # Save the image to a temporary file
    temp_file_path = 'temp_image.png'
    with open(temp_file_path, 'wb') as f:
        f.write(image_data)

    # Initialize Google Drive service
    google_drive_service = GoogleDriveService(client_id, client_secret, redirect_uri, refresh_token)

    # Create folder if it doesn't exist
    folder_name = 'UploadedImages'
    folder = google_drive_service.search_folder(folder_name)
    if not folder:
        folder = google_drive_service.create_folder(folder_name)

    # Upload the image file
    drive_response = google_drive_service.save_file('uploaded_image.png', temp_file_path, 'image/png', folder['id'])

    # Print the URL of the uploaded image
    imgurl = f"https://drive.google.com/uc?id={drive_response['id']}"
    # print(f"Image uploaded: https://drive.google.com/uc?id={drive_response['id']}")
    # Clean up temporary file
    os.remove(temp_file_path)
    return imgurl

if __name__ == "__main__":
    upload_image_to_drive()