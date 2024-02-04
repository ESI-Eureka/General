from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import NotFoundError, RequestError
import json
import os
from elasticsearch.helpers import scan

#------------------------------------------------------------------------------------------------------------#
# Elasticsearch Initialization

es = Elasticsearch([{'scheme': 'http', 'host': 'elasticsearch', 'port': 9200}])
nom_index = 'articles_scientifiques'

# Index for the favorites
nom_index_fav = 'favoris'

# Path to the JSON Document
fichier2_json_path = './elastic/document.json'

# Path to JSON documents (favorites artciles)

fichier_json_path_fav = './elastic/resultat_recherche_fav.json'
fichier2_json_path_fav = './elastic/document_fav.json'

#------------------------------------------------------------------------------------------------------------#
# Scientific Articles Indexing Part 
#------------------------------------------------------------------------------------------------------------#

def index_article(article):
    """
    Indexes an article in the articles_scientifiques index.

    Args:
        article (dict): The article to be indexed.

    Returns:
        None
    """
    # Check if the index exists before creating it
    if not es.indices.exists(index=nom_index):

        # Mapping for articles (defined before creating the index)
        # Identify the type of each field
        mapping = {
            "mappings": {
                "properties": {
                    "titre": {"type": "keyword"},
                    "resume": {"type": "text"},
                    "auteurs": {"type": "text"},
                    "institutions": {"type": "text"},
                    "mots_cles": {"type": "text"},
                    "texte_integral": {"type": "text"},
                    "pdf_url": {"type": "text"},
                    "references": {"type": "text"},
                    "publication_date": {"type": "date"},
                    "corrected":{"type": "long"} # Pour la correction
                }
            }
        }

        # Create the index with the mapping
        es.indices.create(index=nom_index, body=mapping, ignore=400) # ignore=400 permet d'ignorer l'erreur si l'index existe déjà
        result = es.index(index=nom_index, body=article, ignore=400)
        
        generated_id = result.get('_id')
        article['_id'] = generated_id

        # Retrieve saved articles from the JSON file
        try:
            if os.path.getsize(fichier2_json_path) > 0:
                with open(fichier2_json_path, 'r') as fichier_json:
                    articles_existants = json.load(fichier_json)
            else:
                articles_existants = []
        except FileNotFoundError:
            articles_existants = []

        # Add the new article to the list of existing articles
        articles_existants.append(article)

        # Save the list to the JSON file
        with open(fichier2_json_path, 'w') as fichier_json:
            json.dump(articles_existants, fichier_json, indent=2)
    
    else:
        index_stats = es.indices.stats(index=nom_index)

        # Check if the index contains at least one article
        total_documents = index_stats['_all']['primaries']['docs']['count']

        # Check if the article already exists
        exist = False
        if total_documents>0:
            exist = article_existant(article)
            print(exist)

        if exist == False:
            # Index the article in the Elasticsearch index
            result = es.index(index=nom_index, body=article, ignore=400)
            generated_id = result.get('_id')
            article['_id'] = generated_id
            
            # Retrieve saved articles from the JSON file
            try:
                if os.path.getsize(fichier2_json_path) > 0:
                    with open(fichier2_json_path, 'r') as fichier_json:
                        articles_existants = json.load(fichier_json)
                else:
                    articles_existants = []
            except FileNotFoundError:
                articles_existants = []

            # Add the new article to the list of existing articles
            articles_existants.append(article)

            # Save the list to the JSON file
            with open(fichier2_json_path, 'w') as fichier_json:
                json.dump(articles_existants, fichier_json, indent=2)
        else:
            print('Article déja existant!')

def article_existant(article):
    """
    Checks if an article exists in the index.

    Args:
        article (dict): The article to be checked.

    Returns:
        bool: True if the article exists, False otherwise.
    """
    # Search for an article by title in the index
    query = {
        "query": {
            "match": {
                "titre": article.get("titre", "")  # Utiliser ".keyword" pour une correspondance exacte (insensible à la casse)
            }
        }
    }

    # Execute the search
    results = es.search(index=nom_index, body=query)

    # Check if any results were found
    return results["hits"]["total"]["value"] > 0

@require_POST
@csrf_exempt 
def index_article_view(request):
    """
    POST request to index a new article in Elasticsearch.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: The JSON response.
    """
    if request.method == 'POST':
        # 1. Get JSON data from the request
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})
        
        # 2. Check if the required fields are present in the data
        required_fields = ['titre', 'resume', 'auteurs', 'institutions', 'mots_cles',
                            'texte_integral', 'pdf_url', 'references', 'publication_date', 'corrected']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'status': 'error', 'message': f'Champ manquant : {field}'})

        # 3. Call the function to index the article in Elasticsearch
        try:
            index_article(data)
            return JsonResponse({'status': 'success', 'message': 'Article indexé avec succès'})
        
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de l\'indexation : {e}'})

    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

@require_GET 
def search_articles(request):
    """
    GET request to get the search results.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: The JSON response containing the search results.
    """
    # 1. Get the query
    query = request.GET.get('query', '')

    # 2. Construct the Elasticsearch request body
    body = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["titre", "auteurs", "mots_cles", "texte_integral"]
                }
            },
            "sort": [
                {
                    "publication_date": {
                        "order": "desc"  # Tri par publication_date en ordre décroissant (du plus récent au plus ancien)
                    }
                }
            ]
        }

    try:
        # 3. Execute the Elasticsearch search with the constructed request body
        resultats = es.search(index=nom_index, body=body)

        # The term "hits" refers to documents matching a search query
        hits = resultats['hits']['hits']

        # 4. Get the list of articles
        search_results = [{'_id': hit['_id'], '_source': hit['_source']} for hit in hits]

        # 5. Return the results in JSON format
        return JsonResponse(search_results, safe=False)
    
    except Exception as e:

        # Error case, return an error message
        print(f"Erreur durant la recherche: {e}")

        # Return an empty list
        return JsonResponse([], safe=False)

@require_POST
@csrf_exempt
def delete_article_view(request):
    """
    POST request to delete an article from the index.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: The JSON response.
    """
    print("DELETE ARTICLE VIEW")
    if request.method == 'POST':
        # 1. Get the article ID from the request
        try:
            data = json.loads(request.body.decode('utf-8'))
            # Extract values from the parsed JSON data
            article_id = data.get('doc_id')
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})

        # 2. Check if the article exists in Elasticsearch
        try:
            result = es.get(index=nom_index, id=article_id)
            if result.get('found'):
                print(f"Article trouvé avec succès : {result['_source']}")
            else:
                print(f"Article non trouvé pour l'ID : {article_id}")
                return JsonResponse({'status': 'error', 'message': 'Article non trouvé'})
            
        except NotFoundError:
            print(f"Article non trouvé pour l'ID : {article_id}")
            return JsonResponse({'status': 'error', 'message': 'Article non trouvé'})

        # 3. Delete the article from Elasticsearch
        try:
            es.delete(index=nom_index, id=article_id)
            print(f"Article supprimé avec succès : {article_id}")

        except Exception as e:
            print(f"Erreur lors de la suppression : {e}")
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de la suppression : {e}'})

        # 4. Remove the article from the list of existing articles in the JSON file
        try:
            with open(fichier2_json_path, 'r') as fichier_json:
                articles_existants = json.load(fichier_json)
        except FileNotFoundError:
            articles_existants = []

        # Remove the article from the list in memory
        articles_existants = [article for article in articles_existants if article.get('_id') != article_id]

        # Write the modified list back to the JSON file
        with open(fichier2_json_path, 'w') as fichier_json:
            json.dump(articles_existants, fichier_json, indent=2)

        return JsonResponse({'status': 'success', 'message': 'Article supprimé avec succès'})

    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

#------------------------------------------------------------------------------------------------------------#
# Fonction pour récupérer tous les articles scientifiques depuis l'index 

@require_GET
def recuperer_article(request):
    """
    Retrieve all scientific articles from the index.

    Args:
        request: The HTTP request object.

    Returns:
        A JSON response containing the list of articles retrieved from the index.
        If the index is not found or there is an error in the request, an error message is returned.
    """
    try:
        # Construct the request body to retrieve all scientific articles from the index
        body = {
            "query": {
                "match_all":{}
            }
        }

        # Execute the search 
        articles = es.search(index=nom_index, body=body)

        # The term "hits" refers to documents matching a search query
        hits = articles['hits']['hits']

        # Get the list of articles
        articles_results = [{'_id': hit['_id'], '_source': hit['_source']} for hit in hits]

        return JsonResponse(articles_results, safe=False)
    
    except NotFoundError:
        print(f"Erreur: Index {nom_index} non trouvé.")
        return JsonResponse({'error': f"Index {nom_index} non trouvé."}, status=500)

    except RequestError as e:
        print(f"Erreur de requête: {e}")
        return JsonResponse({'error': f"Erreur de requête: {e}"}, status=500)

    except Exception as e:
        print(f"Erreur inattendue: {e}")
        return JsonResponse({'error': f"Erreur inattendue: {e}"}, status=500)


#------------------------------------------------------------------------------------------------------------#
# POST request to update an article in Elasticsearch
        
@csrf_exempt
def mettre_jour_article(request):
    """
    Update an article in Elasticsearch and JSON file.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: The JSON response indicating the success or failure of the update operation.
    """
    # Existing code...
def mettre_jour_article(request):
    # Extracting values from the POST request
    # Parse JSON data from the request body
    data = json.loads(request.body.decode('utf-8'))

    # Extract values from the parsed JSON data
    doc_id = data.get('doc_id')
    nouveau_article = data.get('nouveau_article')

    # Constructing the update request body
    try:
        body = {
            "doc": nouveau_article
        }

        # Execute the update request
        es.update(index=nom_index, id=doc_id, body=body)
        print("Mise à jour réussie.")
        
        # Update in the JSON file
        try:
            with open(fichier2_json_path, 'r') as fichier_json:
                articles_existants = json.load(fichier_json)
        except FileNotFoundError:
            articles_existants = []

        # Search for the article in the list and update it
        for article in articles_existants:
            if article.get('_id') == doc_id:
                article.update(nouveau_article)

        # Save the updated list to the JSON file
        with open(fichier2_json_path, 'w') as fichier_json:
            json.dump(articles_existants, fichier_json, indent=2)
        return JsonResponse({'message': 'Update successful'}, status=200)
    
    except NotFoundError:
        print(f"Erreur: Document avec l'ID {doc_id} non trouvé dans l'index {nom_index}.")

    except RequestError as e:
        print(f"Erreur de requête: {e}")
    
    except Exception as e:
        # Unexpected error case
        print(f"Erreur inattendue: {e}")
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)

#------------------------------------------------------------------------------------------------------------#
# Favorite Articles Section
#------------------------------------------------------------------------------------------------------------#
# Function to index favorite articles in Elasticsearch

def index_article_fav(article):
    """
    Indexes an article in the Elasticsearch index for favorites.

    Args:
        article (dict): The article to be indexed. It should contain the following fields:
            - idArticle (str): The ID of the article.
            - idUser (str): The ID of the user.

    Returns:
        None
    """
    # Check if the index exists before creating it
    if not es.indices.exists(index=nom_index_fav):

        # Mapping for articles (defined before creating the index)
        # Identify the type of each field
        mapping = {
            "mappings": {
                "properties": {
                    "idArticle": {"type": "text"},
                    "idUser": {"type": "text"},
                }
            }
        }

        # Create the index with the mapping
        es.indices.create(index=nom_index_fav, body=mapping, ignore=400) 
        # ignore=400 to ignore the error if the index already exists

    # Index the content in the Elasticsearch index (favorites)
    es.index(index=nom_index_fav, body=article, ignore=400)

#------------------------------------------------------------------------------------------------------------#             
@require_POST
@csrf_exempt 
# Note: @csrf_exempt is used here to disable CSRF protection for this view.

def index_article_view_fav(request):
    """
    View function to index an article as a favorite in Elasticsearch.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: A JSON response indicating the status of the indexing operation.
    """
    
    if request.method == 'POST':
        # 1. Get JSON data from the request
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})
        
        # 2. Check if the required fields are present in the data
        required_fields = ['idArticle', 'idUser']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'status': 'error', 'message': f'Champ manquant : {field}'})
        
        # 3. Call the function to index the element in Elasticsearch
        try:
            index_article_fav(data)
            return JsonResponse({'status': 'success', 'message': 'Article indexé avec succès'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de l\'indexation : {e}'})
    
    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

#------------------------------------------------------------------------------------------------------------#
# Deletion of favorites based on idArticle and idUser

@require_POST
@csrf_exempt
def delete_favoris_document(request):
    """
    Delete a favoris document from Elasticsearch.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: A JSON response indicating the status of the deletion.
    """
    if request.method == 'POST':
        # Get idArticle and idUser from the request
        try:
            data = json.loads(request.body)
            idArticle = data.get('idArticle')
            idUser = data.get('idUser')
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})

        # Check if the element already exists
        try:
            result = es.search(index=nom_index_fav, body={
                "query": {
                    "bool": {
                        "must": [
                            {"match": {"idArticle": idArticle}},
                            {"match": {"idUser": idUser}}
                        ]
                    }
                }
            })

            if result['hits']['total']['value'] > 0:
                document_id = result['hits']['hits'][0]['_id']
                print(f"Document trouvé avec succès : {result['hits']['hits'][0]['_source']}")
            else:
                print(f"Document non trouvé pour idArticle={idArticle}, idUser={idUser}")
                return JsonResponse({'status': 'error', 'message': 'Document non trouvé'})

        except Exception as e:
            print(f"Erreur lors de la recherche : {e}")
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de la recherche : {e}'})

        # Delete the element from Elasticsearch
        try:
            es.delete(index=nom_index_fav, id=document_id)
            print(f"Document supprimé avec succès : {document_id}")

        except Exception as e:
            print(f"Erreur lors de la suppression : {e}")
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de la suppression : {e}'})

        return JsonResponse({'status': 'success', 'message': 'Document supprimé avec succès'})

    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

#------------------------------------------------------------------------------------------------------------#
@require_GET
def retrieve_and_save_favorite_articles(request):
    """
    Retrieve and save favorite articles based on the provided UserId.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: A JSON response containing the search results of favorite articles.
            If there are matches for the given UserId, it returns a list of corresponding articles.
            If there are no matches, it returns an empty list.
            If an error occurs during the retrieval and saving process, it returns an error message.
    """
    try:
        # Retrieve UserId from the request's query parameters
        UserId = request.GET.get('UserId', '')

        # Perform a search in the favorite articles index based on UserId
        result = es.search(index=nom_index_fav, body={
            "query": {
                "match": {
                    "idUser": UserId
                }
            }
        })

        # Check if there are matches for the given UserId
        if result['hits']['total']['value'] > 0:
            # Retrieve the favorite articles
            favorite_articles = result['hits']['hits']

            # Extract the idArticle from each favorite article
            idArticles = [article['_source']['idArticle'] for article in favorite_articles]

            # Search for corresponding articles
            articles_search_results = []
            for idArticle in idArticles:
                result_article = es.get(index=nom_index, id=idArticle)
                articles_search_results.append({'_id': result_article['_id'], '_source': result_article['_source']})

            return JsonResponse(articles_search_results, safe=False)

        else:
            return JsonResponse([], safe=False)

    except Exception as e:
        # Handle any errors that occur during the retrieval and saving process
        print(f"Error during retrieval and saving: {e}")
        return JsonResponse({'status': 'error', 'message': f'Error during retrieval and saving: {e}'})
    
#------------------------------------------------------------------------------------------------------------#
