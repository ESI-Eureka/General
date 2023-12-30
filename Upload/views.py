# views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view

from Upload.DataExtract import extractData
from elastic.Index_script import indexer_article

@api_view(['POST'])
def upload_files(request):
    files = request.FILES.getlist('files')  # 'files' should match the name attribute of your file input
    for file in files:
        Data=extractData(file)
        indexer_article(Data)
    # Process the files as needed (save to disk, database, etc.)
    
    return Response({'message': 'Files uploaded successfully'})
