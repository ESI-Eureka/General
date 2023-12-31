# views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from Eureka.settings import MEDIA_ROOT

from Upload.DataExtract import extractData
from elastic.views import index_article

from elastic.views import es, nom_index
from django.http import JsonResponse
from .models import UploadedFile
import os
from django.core.files.storage import FileSystemStorage

@api_view(['POST'])
def upload_files(request):
    files = request.FILES.getlist('files')  # 'files' should match the name attribute of your file input
    for file in files:
        Data=extractData(file)
        fs = FileSystemStorage(location=MEDIA_ROOT)
        saved_file_name = fs.save(file.name, file)

        # Return the URL to the frontend
        file_url = fs.url(saved_file_name)
        Data['pdf_url']=file_url
        index_article(Data)
        current_mapping = es.indices.get_mapping(index=nom_index)
        
        
    # Comparer les clés extraites avec le mapping
    extracted_data_keys = set(Data.keys())
    mapping_properties = current_mapping[nom_index]['mappings']['properties'].keys()

    # Vérifier si toutes les clés extraites existent dans le mapping
    if extracted_data_keys.issubset(mapping_properties):
        print("Les clés extraites correspondent au mapping.")
    else:
        print("Les clés extraites ne correspondent pas au mapping.")
        
    
    return Response({'message': 'Files uploaded successfully'})
