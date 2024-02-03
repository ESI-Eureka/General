import json, unittest
from django.http import HttpRequest
from django.test import TestCase
from .views import index_article_view

class TestIndexation(TestCase):

    def test_index_article(self):
        # Mock data for testing
        article = {
            "titre": "Titre de l'article 3",
            "resume": "Résumé de l'article",
            "auteurs": ["Auteur 1", "Auteur 2"],
            "institutions": ["Institution 1", "Institution 2"],
            "mots_cles": ["Mot clé 1", "Mot clé 2"],
            "texte_integral": "Texte intégral",
            "pdf_url": "Url pdf",
            "references": ["Référence 1", "Référence 2"],
            "publication_date": "2023-11-07T00:00:00",
            "corrected": 0
        }

        # Create a simulated HttpRequest
        request = HttpRequest()
        request.method = 'POST'
        request._body = json.dumps(article).encode('utf-8')  # Use _body attribute to set the body content
        request.content_type = 'application/json'

        # Call the view function directly
        response = index_article_view(request)

        # Assert the status code
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
