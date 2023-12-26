from elasticsearch import Elasticsearch
import time
import json
import os 

es = Elasticsearch([{'scheme': 'http', 'host': 'localhost', 'port': 9200}])
nom_index = 'articles_scientifiques'
fichier_json_path = 'document.json'  # Chemin vers le fichier JSON

# Vérifiez si l'index existe avant de le créer
if not es.indices.exists(index=nom_index):

    # Mapping pour les articles (à définir avant la création de l'index)
    # Identifier le type de chaque field
    mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "integer"},
                "titre": {"type": "text"},
                "resume": {"type": "text"},
                "auteurs": {"type": "text"},
                "institutions": {"type": "text"},
                "mots_cles": {"type": "text"},
                "texte_integral": {"type": "text"},
                "pdf_url": {"type": "text"},
                "references": {"type": "text"},
                "publication_date": {"type": "date"}
            }
        }
    }

    # Création de l'index avec le mapping
    es.indices.create(index=nom_index, body=mapping, ignore=400)  # ignore=400 permet d'ignorer l'erreur si l'index existe déjà

# Fonction pour indexer un article dans Elasticsearch
def indexer_article(article):
    es.index(index=nom_index, body=article, ignore=400)

# Charger les articles existants depuis le fichier JSON
try:
    # Vérifiez si le fichier JSON est vide avant de le charger
    if os.path.getsize(fichier_json_path) > 0:
        with open(fichier_json_path, 'r') as fichier_json:
            articles_existants = json.load(fichier_json)
            current_id =len(articles_existants)
    else:
        articles_existants = []
        current_id = 1
except FileNotFoundError:
    articles_existants = []
    current_id = 1

# Fonction pour obtenir de nouveaux articles (exemple) pour pouvoir tester l'indexation
def obtenir_nouveaux_articles(nombre_articles):
    for _ in range(nombre_articles):
        global current_id
        nouvel_article = {
            'id': current_id + 1,
            'titre': f'Titre dynamique - {time.time()}',
            'resume': 'Résumé dynamique',
            'auteurs': ['Auteur dynamique'],
            'institutions': ['Institution dynamique'],
            'mots_cles': ['clé dynamique'],
            'texte_integral': 'Texte intégral dynamique',
            'pdf_url': 'https://exemple.com/chemin/vers/le/pdf_dynamique',
            'references': ['Référence dynamique'],
            'publication_date': '2023-01-01'
        }
        yield nouvel_article
        current_id += 1
        print(f"Indexation d'un nouvel article : {nouvel_article['titre']}")
        time.sleep(10)  # Attendez 10 secondes avant de récupérer un nouvel article

# Ajouter de nouveaux articles (depuis la liste obtenu de l'extraction) à la liste existante
nombre_articles_a_indexer = 2
for nouvel_article in obtenir_nouveaux_articles(nombre_articles_a_indexer):
    articles_existants.append(nouvel_article)
    indexer_article(nouvel_article)

# Sauvegarder la liste dans le fichier JSON
with open(fichier_json_path, 'w') as fichier_json:
    json.dump(articles_existants, fichier_json, indent=2)

# Fermeture de Elasticsearch
es.close()