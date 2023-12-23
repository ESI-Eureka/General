from elasticsearch import Elasticsearch
import time
import json
import os 

es = Elasticsearch([{'scheme': 'http', 'host': 'localhost', 'port': 9200}])
index_name = 'articles_scientifiques'
json_file_path = 'document.json'  # Chemin vers le fichier JSON


# Vérifiez si l'index existe avant de le créer
if not es.indices.exists(index=index_name):

    # Mapping pour les articles (à définir avant la création de l'index)
    # Identifier le type de chaque field
    mapping = {
        "mappings": {
            "properties": {
                "title": {"type": "text"},
                "abstract": {"type": "text"},
                "authors": {"type": "keyword"},
                "institutions": {"type": "keyword"},
                "keywords": {"type": "keyword"},
                "full_text": {"type": "text"},
                "pdf_url": {"type": "keyword"},
                "references": {"type": "text"},
                "publication_date": {"type": "date"}
            }
        }
    }

    # Création de l'index avec le mapping
    es.indices.create(index=index_name, body=mapping, ignore=400)  # ignore=400 permet d'ignorer l'erreur si l'index existe déjà

# Fonction pour indexer un article dans Elasticsearch
def indexer_article(article):
    es.index(index=index_name, body=article, ignore=400)

# Fonction pour obtenir de nouveaux articles (exemple)
def obtenir_nouveaux_articles(nombre_articles):
    for _ in range(nombre_articles):
        nouvel_article = {
            'title': f'Titre dynamique - {time.time()}',
            'abstract': 'Résumé dynamique',
            'authors': ['Auteur dynamique'],
            'institutions': ['Institution dynamique'],
            'keywords': ['Mot clé dynamique'],
            'full_text': 'Texte intégral dynamique',
            'pdf_url': 'https://exemple.com/chemin/vers/le/pdf_dynamique',
            'references': ['Référence dynamique'],
            'publication_date': '2023-01-01'
        }
        yield nouvel_article
        print(f"Indexation d'un nouvel article : {nouvel_article['title']}")
        time.sleep(10)  # Attendez 10 secondes avant de récupérer un nouvel article

# Charger les articles existants depuis le fichier JSON
try:
    # Vérifiez si le fichier JSON est vide avant de le charger
    if os.path.getsize(json_file_path) > 0:
        with open(json_file_path, 'r') as json_file:
            articles_existants = json.load(json_file)
    else:
        articles_existants = []
except FileNotFoundError:
    articles_existants = []

# Ajouter de nouveaux articles à la liste existante
nombre_articles_a_indexer = 2
for nouvel_article in obtenir_nouveaux_articles(nombre_articles_a_indexer):
    articles_existants.append(nouvel_article)
    indexer_article(nouvel_article)

# Sauvegarder la liste mise à jour dans le fichier JSON
with open(json_file_path, 'w') as json_file:
    json.dump(articles_existants, json_file, indent=2)

# Fermeture de Elasticsearch
es.close()