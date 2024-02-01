from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import NotFoundError, RequestError
import json
import os
from elasticsearch.helpers import scan

#------------------------------------------------------------------------------------------------------------#
# Initialisation de Elasticsearch

es = Elasticsearch([{'scheme': 'http', 'host': 'localhost', 'port': 9200}])

# Nom pour les index

# Index pour les articles scientifiques
nom_index = 'articles_scientifiques'

# Index pour les articles favoris
nom_index_fav = 'favoris'

# Chemin vers le fichier JSON
fichier_json_path = './elastic/resultat_recherche.json'

fichier2_json_path = './elastic/document.json'

# Chemin vers les fichiers JSON des favoris

fichier_json_path_fav = './elastic/resultat_recherche_fav.json'
fichier2_json_path_fav = './elastic/document_fav.json'

#------------------------------------------------------------------------------------------------------------#
# Partie de l'index des articles scientifiques 
#------------------------------------------------------------------------------------------------------------#
# Fonction pour indexer un article dans l'index artcles_scientifiques
    
def index_article(article):

    # Vérifiez si l'index existe avant de le créer
    if not es.indices.exists(index=nom_index):

        # Mapping pour les articles (à définir avant la création de l'index)
        # Identification du type de chaque field
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

        # Création de l'index avec le mapping
        es.indices.create(index=nom_index, body=mapping, ignore=400) # ignore=400 permet d'ignorer l'erreur si l'index existe déjà
        es.index(index=nom_index, body=article, ignore=400)
    
    else:
        index_stats = es.indices.stats(index=nom_index)

        # Vérifier si l'index contient au moins un article
        total_documents = index_stats['_all']['primaries']['docs']['count']

        # Vérifier si l'artcile existe déja
        exist = False
        if total_documents>0:
            exist = article_existant(article)
            print(exist)

        if exist == False:
            # Indexation de l'article dans l'index elasticsearch
            es.index(index=nom_index, body=article, ignore=400)

            # Récupération des articles sauvegardés dans le fichier JSON
            try:
                if os.path.getsize(fichier2_json_path) > 0:
                    with open(fichier2_json_path, 'r') as fichier_json:
                        articles_existants = json.load(fichier_json)
                else:
                    articles_existants = []
            except FileNotFoundError:
                articles_existants = []

            # Ajout de nouvel article à la liste des articles déja existants
            articles_existants.append(article)

            # Sauvegarde de la liste dans le fichier JSON
            with open(fichier2_json_path, 'w') as fichier_json:
                json.dump(articles_existants, fichier_json, indent=2)
        else:
            print('Article déja existant!')
        

#------------------------------------------------------------------------------------------------------------#
# Fonction pour vérifier si un article existe dans l'index
            
def article_existant(article):
    # Recherche d'un article par titre dans l'index
    query = {
        "query": {
            "match": {
                "titre": article.get("titre", "")  # Utiliser ".keyword" pour une correspondance exacte (insensible à la casse)
            }
        }
    }

    # Exécution de la recherche
    results = es.search(index=nom_index, body=query)

    # Vérification si des résultats ont été trouvés
    return results["hits"]["total"]["value"] > 0

#------------------------------------------------------------------------------------------------------------#
# Requete POST pour indexer un nouvel article dans elasticsearch
        
@require_POST
@csrf_exempt 
#Remarque : @csrf_exempt est utilisé ici pour désactiver la protection CSRF pour cette vue.

def index_article_view(request):
    
    if request.method == 'POST':
        # 1. Récupérer les données JSON de la requête
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})
        
        # 2. Vérifier que les champs nécessaires sont présents dans les données
        required_fields = ['titre', 'resume', 'auteurs', 'institutions', 'mots_cles',
                            'texte_integral', 'pdf_url', 'references', 'publication_date', 'corrected']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'status': 'error', 'message': f'Champ manquant : {field}'})

        # 3. Appeler la fonction pour indexer l'article dans Elasticsearch
        try:
            index_article(data)
            return JsonResponse({'status': 'success', 'message': 'Article indexé avec succès'})
        
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de l\'indexation : {e}'})

    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

#------------------------------------------------------------------------------------------------------------#
# Requete GET pour avoir les résultats de la recherche

@require_GET 
def search_articles(request):

    # 1. Récupérer la requete
    query = request.GET.get('query', '')

    # 2. Construction du corps de la requête Elasticsearch
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
        # 3. Exécution de la recherche Elasticsearch avec le corps de la requête construite
        resultats = es.search(index=nom_index, body=body)

        # le terme "hits" fait référence aux documents correspondants à une requête de recherche
        hits = resultats['hits']['hits']

        # 4. Avoir la liste des artilces
        search_results = [{'_id': hit['_id'], '_source': hit['_source']} for hit in hits]

        # 5. Sauvegarder la liste dans le fichier JSON
        with open(fichier_json_path, 'w') as json_file:
            json.dump(search_results, json_file, indent=2)
            
            # Pour confirmer
            print(f"Sauvegarder les résultats dans {fichier_json_path}")

        # 6. Retourner les resultats sous format JSON
        return JsonResponse(search_results, safe=False)
    
    except Exception as e:

        # Cas d'erreur, renvoyer un message d'erreur
        print(f"Erreur durant la recherche: {e}")

        # retourner une liste vide
        return JsonResponse([], safe=False)

#------------------------------------------------------------------------------------------------------------#
# Requete POST pour supprimer un article de l'index

@require_POST
@csrf_exempt
def delete_article_view(request):
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

        articles_existants = [article for article in articles_existants if article.get('_id') != article_id]

        with open(fichier2_json_path, 'w') as fichier_json:
            json.dump(articles_existants, fichier_json, indent=2)

        return JsonResponse({'status': 'success', 'message': 'Article supprimé avec succès'})

    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

#------------------------------------------------------------------------------------------------------------#
# Fonction pour récupérer tous les articles scientifiques depuis l'index 

@require_GET
def recuperer_article(request):

    try:
        # Construction du corps de la requete pour récupérer tous les articles scientifiques depuis l'index
        body = {
            "query": {
                "match_all":{}
            }
        }

        # Exécution de la recherche 
        articles = es.search(index=nom_index, body=body)

        # le terme "hits" fait référence aux documents correspondants à une requête de recherche
        hits = articles['hits']['hits']

        # Avoir la liste des artilces
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
# Requete POST pour mettre à jour un article dans elasticsearch
        
@csrf_exempt
def mettre_jour_article(request):
    # Extracting values from the POST request
    # Parse JSON data from the request body
    data = json.loads(request.body.decode('utf-8'))

        # Extract values from the parsed JSON data
    doc_id = data.get('doc_id')
    nouveau_article = data.get('nouveau_article')
    # Construction de corps de la requete de mise à jour
    try:
        body = {
            "doc": nouveau_article
        }

        # Exécution de la requete de mise à jour
        es.update(index=nom_index, id=doc_id, body=body)
        print("Mise à jour réussie.")
        
        # Mise à jour dans le fichier JSON
        try:
            with open(fichier2_json_path, 'r') as fichier_json:
                articles_existants = json.load(fichier_json)
        except FileNotFoundError:
            articles_existants = []

        # Rechercher l'article dans la liste et le mettre à jour
        for article in articles_existants:
            if article.get('_id') == doc_id:
                article.update(nouveau_article)

        # Sauvegarder la liste mise à jour dans le fichier JSON
        with open(fichier2_json_path, 'w') as fichier_json:
            json.dump(articles_existants, fichier_json, indent=2)
        return JsonResponse({'message': 'Update successful'}, status=200)
    
    except NotFoundError:
        print(f"Erreur: Document avec l'ID {doc_id} non trouvé dans l'index {nom_index}.")

    except RequestError as e:
        print(f"Erreur de requête: {e}")
    
    except Exception as e:
        # Cas d'erreur inattendue
        print(f"Erreur inattendue: {e}")
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)

#------------------------------------------------------------------------------------------------------------#
#Partie des articles favoris
#------------------------------------------------------------------------------------------------------------#
# Fonction pour indexer les articles favoris dans Elasticsearch

def index_article_fav(article):

    # Vérifiez si l'index existe avant de le créer
    if not es.indices.exists(index=nom_index_fav):

        # Mapping pour les articles (à définir avant la création de l'index)
        # Identification du type de chaque field
        mapping = {
            "mappings": {
                "properties": {
                    "idArticle": {"type": "text"},
                    "idUser": {"type": "text"},
                }
            }
        }

        # Création de l'index avec le mapping
        es.indices.create(index=nom_index_fav, body=mapping, ignore=400) 
        # ignore=400 permet d'ignorer l'erreur si l'index existe déjà

    # Indexation du contenu dans l'index Elasticsearch (favoris)
    es.index(index=nom_index_fav, body=article, ignore=400)

#------------------------------------------------------------------------------------------------------------#             
@require_POST
@csrf_exempt 
# Remarque : @csrf_exempt est utilisé ici pour désactiver la protection CSRF pour cette vue.

def index_article_view_fav(request):
    
    if request.method == 'POST':
        # 1. Récupérer les données JSON de la requête
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})
        
        # 2. Vérifier que les champs nécessaires sont présents dans les données
        required_fields = ['idArticle', 'idUser']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'status': 'error', 'message': f'Champ manquant : {field}'})
        
        # 3. Appeler la fonction pour indexer l'élement dans Elasticsearch
        try:
            index_article_fav(data)
            return JsonResponse({'status': 'success', 'message': 'Article indexé avec succès'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Erreur lors de l\'indexation : {e}'})
    
    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'})

#------------------------------------------------------------------------------------------------------------#
#Suppression de favoris selon le idArticle et idUser

@require_POST
@csrf_exempt
def delete_favoris_document(request):

    if request.method == 'POST':
        # Récupérer idArticle et idUser de la requete
        try:
            data = json.loads(request.body)
            idArticle = data.get('idArticle')
            idUser = data.get('idUser')
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Format JSON invalide'})

        # Vérifier si l'élément existe déja
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

        # Supression de l'element du cluster
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
    try:
        #  Récupérer UserId à partir de la requete
        UserId = request.GET.get('UserId', '')

        # 2. faire la recherche
        result = es.search(index=nom_index_fav, body={
            "query": {
                "match": {
                    "idUser": UserId
                }
            }
        })

        #  vérifier si on a des correspondances avec UserId
        if result['hits']['total']['value'] > 0:
            favorite_articles = result['hits']['hits']

           
            idArticles = [article['_source']['idArticle'] for article in favorite_articles]

            #  Chercher les correspondances
            articles_search_results = []
            for idArticle in idArticles:
                result_article = es.get(index=nom_index, id=idArticle)
                articles_search_results.append({'_id': result_article['_id'], '_source': result_article['_source']})

            return JsonResponse(articles_search_results, safe=False)

        else:
            return JsonResponse([], safe=False)

    except Exception as e:
        # En cas de probleme dans la sauvegarde
        print(f"Error during retrieval and saving: {e}")
        return JsonResponse({'status': 'error', 'message': f'Error during retrieval and saving: {e}'})
    
#------------------------------------------------------------------------------------------------------------#
