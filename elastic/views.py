from django.http import JsonResponse
from django.views.decorators.http import require_GET
from elasticsearch import Elasticsearch
import json
import os

# Initialiser Elasticsearch
es = Elasticsearch([{'scheme': 'http', 'host': 'localhost', 'port': 9200}])
nom_index = 'articles_scientifiques'

# Chemin vers le fichier JSON
fichier_json_path = './elastic/resultat_recherche.json'

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
            print(f"Saved articles to {fichier_json_path}")

        # 6. Retourner les resultats sous format JSON
        return JsonResponse(search_results, safe=False)
    
    except Exception as e:

        # Cas d'erreur, renvoyer un message d'erreur
        print(f"Erreur durant la recherche: {e}")

        # retourner une liste vide
        return JsonResponse([], safe=False)
