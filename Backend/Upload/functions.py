#Imports *******************************
import spacy 
import sys
from spacy.language import Language
import re
import fitz
from collections import Counter
from datetime import datetime
import PyPDF2
from email_validator import validate_email, EmailNotValidError

#************************************************
#Functions 

def orgname(orgname):
    """
    Extracts the organization name from the given input.

    Args:
        orgname (dict or list): The input containing the organization name.

    Returns:
        str: The extracted organization name.
    """
    if type(orgname) is dict:
        return orgname['#text']
    else:
        institute=''
        for k in range(len(orgname)):
            institute=institute+' '+orgname[k]['#text']
        return institute
def affliation(affiliation, Institution):
    """
    Add the affiliation's organization name to the Institution list.

    Parameters:
    - affiliation (dict or list): The affiliation information.
        If it is a dictionary, the organization name is extracted from the 'orgName' key.
        If it is a list, the organization name is extracted from the 'orgName' key of each element.
    - Institution (list): The list to which the organization names will be appended.

    Returns:
    - list: The updated Institution list.
    """
    if type(affiliation) is dict:
        Institution.append(orgname(affiliation['orgName']))
    else:
        for k in range(len(affiliation)):
            Institution.append(orgname(affiliation[k]['orgName']))
    return Institution

def remove_links_emails(text):
    """
    Removes any links (URLs or email addresses) from a given text.

    Args:
        text (str): The text to be processed.

    Returns:
        str: The text with links and email addresses removed.
    """

    # Improved pattern to include "www." as a possible URL prefix:
    pattern = r"(https?://|www\.)\S+|(?:[\w\.-]+@[\w\.-]+\.\w+)"

    # Replace the matched patterns with an empty string
    cleaned_text = re.sub(pattern, '', text)

    return cleaned_text
def is_link_email(text):
    
    link_pattern = re.compile(r"(https?://|www\.)\S+|(?:[\w\.-]+@[\w\.-]+\.\w+)")
    # Check if the entire sentence is a link
    return bool(re.match(link_pattern, text))
def has_link_email(text):
  """
  Checks if a sentence contains any type of link (URL or email address).

  Args:
    text: The sentence to be analyzed.

  Returns:
    True if the sentence contains any type of link, False otherwise.
  """

  # Improved pattern to include "www." as a possible URL prefix:
  pattern = r"(https?://|www\.)\S+|(?:[\w\.-]+@[\w\.-]+\.\w+)"

  # Check if any match is found
  return bool(re.search(pattern, text))

def has_link(text):
  """
  Checks if a sentence contains any type of link (URL).

  Args:
    text: The sentence to be analyzed.

  Returns:
    True if the sentence contains any type of link, False otherwise.
  """

  # Improved pattern to include "www." as a possible URL prefix:
  pattern = r"(https?://|www\.)\S+"

  # Check if any match is found
  return bool(re.search(pattern, text))

#************start of is_sentence_link********************************
def is_sentence_link(sentence):
    """
    Check if a given sentence is a link.

    Args:
        sentence (str): The sentence to be checked.

    Returns:
        bool: True if the sentence is a link, False otherwise.
    """
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
    """
    Splits a sentence into two parts based on certain conditions.

    Args:
        sentence (str): The sentence to be split.

    Returns:
        tuple: A tuple containing two parts of the sentence.

    """
    # Check if the sentence starts with a lowercase letter and remove it
    if sentence and sentence[0].islower():
        sentence = sentence[1:]

    # Check for two consecutive spaces and split the sentence
    index_of_double_space = sentence.find("  ")
    if index_of_double_space != -1:
        return sentence[:index_of_double_space], sentence[index_of_double_space + 2:]

    # Iterate over the sentence to detect the unusual cases in sentences
    for i in range(1, len(sentence)):
        # Condition 1: Uppercase follows lowercase
        if sentence[i-1].islower() or sentence[i-1].isdigit():
            if sentence[i].isupper():
                return sentence[:i], sentence[i:]
        if sentence[i-1].isupper():
            if (i >= 2 and sentence[i].islower()) and (sentence[i-2].isupper()):
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
    """
    Remove non-printable characters from the given text.

    Args:
        text (str): The input text.

    Returns:
        str: The text with non-printable characters removed.
    """
    # Use a regular expression to remove non-printable characters
    # Retain French characters and specify additional characters if needed
    return re.sub(r'[^\x20-\x7E\r—À-ÿ]', '', text)
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
    """
    Extracts the most used words from the given article text.

    Args:
        article_text (str): The text of the article.
        num_words (int, optional): The number of most common words to extract. Defaults to 10.

    Returns:
        list: A list of tuples containing the most common words and their frequencies.
    """
    # Rest of the code...
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
    """
    Filters a list of sentences by removing non-printable characters and short useless sentences.

    Args:
        sentences (list): A list of sentences to be filtered.

    Returns:
        list: A list of filtered sentences.
    """
    filtered_sentences = []
    for sentence in sentences:
        try:
            if not header_pattern(sentence.text) and sentence.text[0]!='.':
                    cleaned_text = remove_non_printable_chars(sentence.text)
                    if len(cleaned_text) > 2 and not cleaned_text.isdigit() and not is_sentence_link(cleaned_text):
                        index_of_double_space = cleaned_text.find("  ")
                        if index_of_double_space != -1:
                             filtered_sentences.append(cleaned_text[:index_of_double_space])
                             filtered_sentences.append(cleaned_text[index_of_double_space + 2:])
                        else:
                            filtered_sentences.append(cleaned_text)
        except(AttributeError):
            sentence=remove_non_printable_chars(sentence)
            if len(sentence)>2 and not header_pattern(sentence) and sentence[0]!='.':
                    cleaned_text = sentence
                    if len(cleaned_text) > 2 and not cleaned_text.isdigit() and not is_sentence_link(cleaned_text):
                        filtered_sentences.append(cleaned_text)
    return filtered_sentences
#********************end of filter_sentences function******************************

#********************start of texttoSen function***********************
def texttoSen(text):
    """
    Converts a given text into a list of filtered sentences.

    Parameters:
    text (str): The input text to be converted into sentences.

    Returns:
    list: A list of filtered sentences extracted from the input text.
    """
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
def convert_pdf_to_text(pdf_path, output_text_path):
    """
    Converts a PDF file to plain text and saves it to a text file.

    Args:
        pdf_path (str): The path to the PDF file.
        output_text_path (str): The path to save the extracted text.

    Raises:
        Exception: If there is an error during the conversion process.

    Returns:
        None
    """
    try:
        # Try PyMuPDF first for better handling of multi-column layouts
        pdf_document = fitz.open(pdf_path)
        text = ""
        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            text += page.get_text("text")

        pdf_document.close()
    except Exception as mu_pdf_error:
        print(f"PyMuPDF error: {mu_pdf_error}")
        print("Trying PyPDF2...")
        try:
            # Fallback to PyPDF2 if PyMuPDF fails
            with open(pdf_path, "rb") as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text = ""
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text()
        except Exception as pdf2_error:
            print(f"PyPDF2 error: {pdf2_error}")
            print("Unable to extract text from the PDF.")
            return

    # Save the extracted text to a text file
    with open(output_text_path, "w", encoding="utf-8") as output_file:
        output_file.write(text)

    print(f"Text extracted successfully and saved to {output_text_path}")
    
    
    
    
def process_text_with_spacy(text):
    """
    Process the given text using SpaCy and extract authors.

    Args:
        text (str): The text to be processed.

    Returns:
        list: A list of authors extracted from the text.
    """
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    authors = [entity.text for entity in doc.ents if entity.label_ == "PERSON"]
    return authors
    
    
    
def remove_email_links(paragraph):
    """
    Removes email links from a given paragraph.

    Args:
        paragraph (str): The paragraph containing email links.

    Returns:
        str: The cleaned paragraph with email links removed.
    """
    # Regular expression to match email addresses
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')

    # Replace email addresses with an empty string
    cleaned_paragraph = email_pattern.sub('', paragraph)

    return cleaned_paragraph


def remove_strings_from_paragraph(paragraph, strings_to_remove):
    for string_to_remove in strings_to_remove:
        paragraph = paragraph.replace(string_to_remove, '')
    return paragraph


    
def remove_repeated_paragraphs(text):
    # Split the text into paragraphs
    paragraphs = [paragraph.strip() for paragraph in text.split('\n\n') if paragraph.strip()]

    # Remove duplicate paragraphs
    unique_paragraphs = list(set(paragraphs))

    # Reconstruct the cleaned text without repeated paragraphs
    cleaned_text = '\n\n'.join(unique_paragraphs)

    return cleaned_text


def header_pattern(sentence):
    """
    Checks if a sentence matches patterns common for headers.

    Args:
        sentence (str): The sentence to be checked.

    Returns:
        bool: True if the sentence matches any of the header patterns, False otherwise.
    """
    # Regular expressions for header patterns:
    date_pattern = re.compile(r'\b\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b')
    consecutive_numbers_pattern = re.compile(r'\d{7,}')
    # Pattern for entire sentence wrapped in brackets:
    pattern = re.compile(r'^[\[{(<].*[\]})>]$')  # Ensure start and end with brackets

    # Check for matches:
    match = re.search(date_pattern, sentence)
    match1 = re.search(pattern, sentence)
    match2 = re.search(consecutive_numbers_pattern, sentence)

    return bool(match or match1 or match2 or 'arXiv' in sentence)

def remove_emails(text):
    """Removes email addresses from a string."""

    email_pattern = r"[\wàâçéèêëîïôûùüÿñæœ\.-]+@[\wàâçéèêëîïôûùüÿñæœ\.-]+\.[a-zA-Z0-9]{2,5}"
    clean_text = re.sub(email_pattern, "", text)
    return clean_text

def extract_institutions(text):
    """Extracts institution names from text."""

    patterns = [
        r"(University|College|Institute|School|Académie|École|Université) of ([\wàâçéèêëîïôûùüÿñæœ\- ]+)",
        r"([\wàâçéèêëîïôûùüÿñæœ\- ]+ )?(University|College|Institute|School)( of [\wàâçéèêëîïôûùüÿñæœ\- ]+)?",
        r"(Department|Faculty|Division|Département) of ([\wàâçéèêëîïôûùüÿñæœ\- ]+), ([\wàâçéèêëîïôûùüÿñæœ\- ]+) (University|College|Institute|School)",
    ]

    institutions = []
    for pattern in patterns:
        matches = re.findall(pattern, text, flags=re.IGNORECASE)
        institutions.extend(matches)
    return institutions