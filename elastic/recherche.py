from elasticsearch import Elasticsearch
import json

es = Elasticsearch([{'scheme': 'http', 'host': 'localhost', 'port': 9200}])
nom_index = 'articles_scientifiques'
fichier_json_path = 'resultat_recherche.json'  # Chemin vers le fichier JSON

#Fonction qui effectue une recherche dans le titre, mots clés, auteurs et le texte integral 

def recherche_articles(requete):
    # 1. Construction du corps de la requête Elasticsearch
    body = {
        "query": {
            "multi_match": {
                "query": requete,
                "fields": ["titre", "mots_cles", "auteurs", "texte_integral"]
            }
        }
    }

    # 2. Exécution de la recherche Elasticsearch avec le corps de la requête construit
    resultats = es.search(index=nom_index, body=body)

    # 3. Récupération des résultats de la recherche dans la variable 'result'
    # le terme "hits" fait référence aux documents correspondants à une requête de recherche
    return resultats['hits']['hits']

# Test 

requete_utilisateur = " 1703363381.2571812"
resultats_recherche = recherche_articles(requete_utilisateur)

#Mettre les résultats de la recherche dans un fichier JSON (resultat_recherche.py)

#Le fichier au début est vide

articles = [] 

for article in recherche_articles(requete_utilisateur):
    articles.append(article)

# Sauvegarder la liste mise à jour dans le fichier JSON
with open(fichier_json_path, 'w') as json_file:
    json.dump(articles, json_file, indent=2)

# Fermeture de Elasticsearch
es.close()



