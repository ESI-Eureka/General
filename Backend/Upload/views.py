# views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from Eureka.settings import MEDIA_ROOT

from Upload.DataExtract import extractData
from elastic.views import index_article
import uuid
from elastic.views import es, nom_index
from django.http import JsonResponse
from .models import UploadedFile
import os
import io
import requests
from django.core.files.storage import FileSystemStorage

@api_view(['POST'])
def upload_files(request):
    """
    Uploads files or extracts data from a URL and indexes the data.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: The HTTP response object indicating the status of the file upload.

    Raises:
        None
    """
    if 'files' in request.FILES:
        files = request.FILES.getlist('files')  # 'files' should match the name attribute of your file input
        for file in files:
            Data=extractData(file)
            fs = FileSystemStorage(location=MEDIA_ROOT)
             # Get the original filename without modifications
            original_filename = file.name

            # Check if the file already exists
            if fs.exists(original_filename):
                # Append a unique identifier to the filename
                base, ext = os.path.splitext(original_filename)
                unique_filename = f"{base}_{uuid.uuid4().hex}{ext}"
                saved_file_name = fs.save(unique_filename, file)
            else:
                # Use the original filename if no conflict
                #saved_file_name = fs.save(original_filename, file)
                saved_file_name = fs.save(file.name, file)
                
            # Return the URL to the frontend
            file_url = fs.url(saved_file_name)
            Data['pdf_url']=file_url
            print("hello")
            print(Data['pdf_url'])
            index_article(Data)
            current_mapping = es.indices.get_mapping(index=nom_index)
            extracted_data_keys = set(Data.keys())
            mapping_properties = current_mapping[nom_index]['mappings']['properties'].keys()

            # Vérifier si toutes les clés extraites existent dans le mapping
            if extracted_data_keys.issubset(mapping_properties):
                print("Les clés extraites correspondent au mapping.")
            else:
                print("Les clés extraites ne correspondent pas au mapping.")
        # Comparer les clés extraites avec le mapping
    elif 'url' in request.data:
        url = request.data['url']
        file=get_pdf_file_object_from_url(url)
        Data=extractData(file)
        Data['pdf_url']=url
        index_article(Data)
        current_mapping = es.indices.get_mapping(index=nom_index)
        extracted_data_keys = set(Data.keys())
        mapping_properties = current_mapping[nom_index]['mappings']['properties'].keys()

        # Vérifier si toutes les clés extraites existent dans le mapping
        if extracted_data_keys.issubset(mapping_properties):
            print("Les clés extraites correspondent au mapping.")
        else:
            print("Les clés extraites ne correspondent pas au mapping.")
        # Comparer les clés extraites avec le mapping
    else:
        return Response({'error': 'Invalid request. Please provide either files or a URL.'}, status=400)
    
    return Response({'message': 'Files uploaded successfully'})

def get_pdf_file_object_from_url(pdf_url):
    """
    Retrieves a PDF file object from the given URL.

    Args:
        pdf_url (str): The URL of the PDF file.

    Returns:
        io.BytesIO or None: A file-like object containing the PDF content if the request was successful,
        None otherwise.
    """
    # Send a GET request to the PDF URL
    response = requests.get(pdf_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Get the content of the PDF
        pdf_content = response.content

        # Create a file-like object using io.BytesIO
        pdf_file_object = io.BytesIO(pdf_content)


        return pdf_file_object
    else:
        # Handle the case when the request was not successful
        print(f"Failed to fetch PDF from URL. Status code: {response.status_code}")
    
    return None