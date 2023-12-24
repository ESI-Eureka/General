#Imports *******************************
import spacy 
import sys
from spacy.language import Language
import re
import fitz
from collections import Counter
from datetime import datetime
#************************************************
#Functions 
#************start of is_sentence_link********************************
def is_sentence_link(sentence):
    # Regular expression to match a sentence that is a link
    link_pattern = re.compile(r'^https?://\S+$|^www\.\S+$')
    # Check if the entire sentence is a link
    return bool(re.match(link_pattern, sentence))
#************end of is_sentence_link********************************

#*********************start of starts_with_upper_and_ends_with_number_star_comma function ************
def starts_with_upper_and_ends_with_number_star_comma(input_string):
    pattern = r"^[A-Z].*?(\d+|\*|,)$"
    match = re.search(pattern, input_string)
    return bool(match)
#*********************end of starts_with_upper_and_ends_with_number_star_comma function ************

#*****************start of starts_with_number function*************************
def starts_with_number(input_string):
    pattern = r"^\d"
    match = re.search(pattern, input_string)
    return bool(match)
#*****************end of starts_with_number function*************************

#********************start of split_sentence function***********************
def split_sentence(sentence):
    # Check if the sentence starts with a lowercase letter and remove it 
    #it returns two strings at the end each one a separate sentence
    if sentence and sentence[0].islower():
        sentence = sentence[1:]
    #iterate over the sentence to detect the unusual cases in sentences 
    # ex : HelloWorld we consider World a separate sentence
    for i in range(1, len(sentence)):
        # Condition 1: Uppercase follows lowercase
        if sentence[i-1].islower() or sentence[i-1].isdigit():
            if sentence[i].isupper():
                return sentence[:i], sentence[i:]
        if sentence[i-1].isupper():
            if (sentence[i].islower()) and (sentence[i-2].isupper()):
                return sentence[:i-1], sentence[i-1:]
    return sentence, ''

#function for extracting text from first page********************************
def extractTextFromPDFFirstP(path):
    #to avoid encoding errors
    sys.stdout.reconfigure(encoding='utf-8')
    #extracting text from pdf file
    pdf_document = fitz.open(path)
    
    # Get the text from the first page
    first_page = pdf_document.load_page(0)
    text = first_page.get_text()

    # Close the PDF file
    pdf_document.close()
    return text
#************************************************************


# remove non printable characters from the pdf text
def remove_non_printable_chars(text):
    # Use a regular expression to remove non-printable characters
     return re.sub(r'[^\x20-\x7E\r—]', '', text)
#*************************************************************



#**********************************************************************
# editing the logic of boundaries in sentences separation fro spacy
@Language.component("set_custom_boundaries")
def set_custom_boundaries(doc):
    """Add support to use `\n` as a delimiter for sentence detection"""
    for token in doc[:-1]:
        if token.text == "\n":
            doc[token.i + 1].is_sent_start = True
    return doc
#**********************************************************************

#**************start of extract_most_used_function ***************************
def extract_most_used_words(article_text, num_words=10):
    #it returns a list of tuples for words and their frequency
    # Load the spaCy English model
    nlp = spacy.load("en_core_web_sm")

    # Process the article text using spaCy
    doc = nlp(article_text)

    # Filter out stop words and punctuation
    words = [token.text.lower() for token in doc if token.is_alpha and not token.is_stop]

    # Use Counter to count word frequencies
    word_frequencies = Counter(words)

    # Extract the most common words
    most_common_words = word_frequencies.most_common(num_words)

    return most_common_words
#**************end of extract_most_used_function ***************************


#********************start of filter_sentences function***********************
def filter_sentences(sentences):
    #for each setence we remove non prinitable characters and remove short useless sentences
    filtered_sentences = []
    for sentence in sentences:
        #remove non_printable_ characters from the sentences
         cleaned_text = remove_non_printable_chars(sentence.text)
        # Check if the sentence has more than two characters and aren't digits to avoid meaningless sentences
         if len(cleaned_text) > 2 and  not cleaned_text.isdigit() and not is_sentence_link(cleaned_text):
            filtered_sentences.append(cleaned_text)
    return filtered_sentences
#********************end of filter_sentences function******************************

#********************start of texttoSen function***********************
def texttoSen(text):
    #loading the language model that supports english from spacy
    custom_nlp = spacy.load("en_core_web_sm")
    #for the changed set_custom_boudaries 
    custom_nlp.add_pipe("set_custom_boundaries", before="parser")
    #tokeinzation of the text
    custom_ellipsis_doc = custom_nlp(text)
    #creating sentences using spacy out of tokens
    custom_ellipsis_sentences = list(custom_ellipsis_doc.sents)
    #filtering sentences extracted by a custom function
    filtered_sentences = filter_sentences(custom_ellipsis_sentences)
    return filtered_sentences
#*******************end of texttoSen function***********************
def convert_pdf_date(pdf_date):
    # Extract relevant parts from the PDF date string
    year = int(pdf_date[2:6])
    month = int(pdf_date[6:8])
    day = int(pdf_date[8:10])

    # Create a datetime object
    pdf_datetime = datetime(year, month, day)

    return pdf_datetime
#**********************************************************