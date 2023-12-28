from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from elasticsearch import Elasticsearch
import json
import os

# Initialiser Elasticsearch
es = Elasticsearch([{'scheme': 'http', 'host': 'localhost', 'port': 9200}])
nom_index = 'articles_scientifiques'
dernier_id = 0

# Chemin vers le fichier JSON

fichier_json_path = './elastic/resultat_recherche.json'

fichier2_json_path = './elastic/document.json'

#------------------------------------------------------------------------------------------------------------#
# Requete GET pour avoir les résultats de la recherche

@require_GET 
def search_articles(request):

    # 1. Get the search query from the request parameters
    query = request.GET.get('query', '')

    # 2. Construction du corps de la requête Elasticsearch
    body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["titre", "auteurs", "mots_cles", "texte_integral"]
            }
        }
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
# Fonction pour obtenir le dernier ID attribué
def get_dernier_id():

    body = {
        "query": {
            "match_all": {}
        },
        "sort": [
            {
                "id": {
                    "order": "desc"
                }
            }
        ],
        "size": 1
    }

    resultats = es.search(index=nom_index, body=body)
    hits = resultats['hits']['hits']

    if hits:
        # Si des documents sont trouvés, récupérez le dernier ID attribué
        dernier_id_attribue = hits[0]['_source']['id']
        return dernier_id_attribue
    else:
        # Aucun document trouvé, l'index est peut-être vide
        return 0  # Ou tout autre valeur par défaut que vous souhaitez utiliser
    
#------------------------------------------------------------------------------------------------------------#
# Fonction pour indexer les articles scientifiques dans elasticsearch
    
def index_article(article):

    # Vérifiez si l'index existe avant de le créer
    if not es.indices.exists(index=nom_index):

        # Mapping pour les articles (à définir avant la création de l'index)
        # Identification du type de chaque field
        mapping = {
            "mappings": {
                "properties": {
                    "titre": {"type": "text"},
                    "resume": {"type": "text"},
                    "auteurs": {"type": "text"},
                    "institutions": {"type": "text"},
                    "mots_cles": {"type": "text"},
                    "texte_integral": {"type": "text"},
                    "pdf_url": {"type": "text"},
                    "references": {"type": "text"},
                    "publication_date": {
                        "type": "date",
                        "format": "dd/MM/yyyy"  # Spécifiez le format de date ici
                    }
                }
            }
        }

        # Création de l'index avec le mapping
        es.indices.create(index=nom_index, body=mapping, ignore=400) # ignore=400 permet d'ignorer l'erreur si l'index existe déjà

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
                            'texte_integral', 'pdf_url', 'references', 'publication_date']
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