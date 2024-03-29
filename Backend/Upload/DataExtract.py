#imports **************************
from datetime import datetime, timedelta
from Upload.functions import *
from pdfminer.high_level import extract_text
import sys
import re
import fitz
import PyPDF2
from collections import Counter
import xmltodict
import sys
import requests
import xml.etree.ElementTree as ET
from io import BytesIO
sys.stdout.reconfigure(encoding='utf-8')
grobid_url = "http://grobid:8070/api/processFulltextDocument"
##############################################
def convert_readable_date(date_str):
    try:
        # Extract the date part and convert it to a datetime object
        date_part = date_str[2:15]
        date_object = datetime.strptime(date_part, '%Y%m%d%H%M%S')

        # Format the final date as a readable string (day-month-year)
        readable_date = date_object.strftime('%d-%m-%Y')

        return readable_date

    except ValueError as e:
        print(f"Error converting date: {e}")
        return "Unknown Date"

def extractData(pdf_file):
    """
    Extracts data from a PDF file.

    Parameters:
    - pdf_file (file): The PDF file to extract data from.

    Returns:
    - dict: A dictionary containing the extracted data with the following keys:
        - 'titre' (str): The title of the document.
        - 'resume' (str): The abstract or summary of the document.
        - 'auteurs' (list): The list of authors of the document.
        - 'institutions' (list): The list of institutions mentioned in the document.
        - 'mots_cles' (list): The list of keywords or index terms of the document.
        - 'texte_integral' (str): The full text of the document.
        - 'pdf_url' (str): The URL of the PDF file.
        - 'references' (list): The list of references cited in the document.
        - 'publication_date' (str): The publication date of the document.
        - 'corrected' (int): A flag indicating whether the document has been corrected (1 for corrected, 0 for not corrected).
    """
    buff=pdf_file.read()
    files = {'input': ('filename.pdf', BytesIO(buff), 'application/pdf')}
    response = requests.post(grobid_url, files=files)
    index_of_closing_angle_bracket = response.text.find('?>') + 2
    # Extract the XML content without the declaration
    xml_content_without_declaration = response.text[index_of_closing_angle_bracket:]
    parsed_dict = xmltodict.parse(xml_content_without_declaration)
    sys.stdout.reconfigure(encoding='utf-8')
    pdf_content = buff
    pdf_reader =fitz.open("pdf",pdf_content)
    num_pages = pdf_reader.page_count
    Data= {
        "titre": "",
        "resume":"",
        "auteurs" : [],
        "institutions" : [],
        "mots_cles": [] ,
        "texte_integral": "",
        "pdf_url": "",
        "references": [],
        "publication_date":'',
        "corrected": 1
    }
    
    filter1=[]
    for page_num in range(2):
        page = pdf_reader[page_num]
        blocks = page.get_text("blocks")
        fourth_elements = [block[4] for block in blocks]
        filtered=filter_sentences(fourth_elements)
        for phrase in filtered:
            if not has_link(phrase) and not "available at" in phrase and not "All rights reserved" in phrase:
                p1,p2=split_sentence(phrase)
                if p2:
                    phrase=p1+' '+p2
                else:
                    phrase=p1
                filter1.append(phrase)
    if not process_text_with_spacy(filter1[1]) and not has_link_email(filter1[1]) :
        Data['titre']=filter1[1]
        if not process_text_with_spacy(filter1[2]) and not has_link_email(filter1[2]):
            Data['titre']=Data['titre']+' '+filter1[2]
            
    else:
        Data['titre']=filter1[0]    
    try:
        titre=parsed_dict['TEI']['teiHeader']['fileDesc']['titleStmt']['title']['#text']
        Data['titre']=titre
    except:
        print("hello1")
    i=0
    index_of_abstract=0
    
    abstract_pattern = re.compile(r"\b(A\s+B\s+S\s+T\s+R\s+A\s+C\s+T|Abstract)\b", re.IGNORECASE)

    for i, sentence in enumerate(filter1):
        if abstract_pattern.search(sentence):
            index_of_abstract = i
            break  # Stop iteration after finding the first match
            
    #print(index_of_abstract)
    if(len(filter1[index_of_abstract])<20):
        Data['resume']=filter1[index_of_abstract+1]
    else:
        
        Data['resume']=filter1[index_of_abstract]
    pattern = re.compile(r'(Keywords|KEYWORDS|Index Terms).*?$', re.DOTALL | re.IGNORECASE)
    match = pattern.search(Data['resume'])
    if match:
        matched=match.group()
        Data['resume']=re.sub(fr'{matched}','',Data['resume'])
    university_names = ['Université', 'Laboratoire','University','Universit','Ecole','Department','Technology','Laboratory','Research','Center','Institute','Institut','Centre','Polytechnique']
    
    try:
        list1=parsed_dict['TEI']['teiHeader']['profileDesc']['abstract']['div']
        Abstract=list1[0]['p']
        Data['resume']=Abstract
    except:
        try:
            Abstract=parsed_dict['TEI']['text']['body']['div'][0]['p']['#text']
            Data['resume']=Abstract
        except:
            print("hello2")
        
    # Result = [name for name in filter1 if  any(univ_name in name for univ_name in university_names)]
    # k=0
    # for k in range(len(Result)):
    #     Result[k]=remove_email_links(Result[k])
    # Data['institutions']=(list(set(Result)))
    text = ''
    for page_num in range(0,num_pages):
        page = pdf_reader[page_num]
        if (page_num==0):
            text1=page.get_text()
        text += page.get_text()
        
    # auteurs=process_text_with_spacy(text1)
    # for Author in auteurs:
    #     if not has_link_email(Author) and not any(univ_name in Author for univ_name in university_names):
    #         Data['auteurs'].append(Author)
    
    pattern = re.compile(r'\b(Keywords|KEYWORDS|Index Terms)\b.*?(\n.*?\n|$)', re.DOTALL)
    match = pattern.search(text)
    if match:
        matched_paragraph = match.group()
        matched_paragraph=re.sub(r'(Keywords|KEYWORDS|Index Terms)','',matched_paragraph)
        if (ord(matched_paragraph[-2])==45):
            pattern = re.compile(r'\b(Keywords|KEYWORDS|Index Terms)\b.*?(\n.*?\n.*?\n|$)', re.DOTALL)
            match = pattern.search(text)
            if match:
                matched_paragraph = match.group()
                matched_paragraph=re.sub(r'(Keywords|KEYWORDS|Index Terms)','',matched_paragraph)
        matched_paragraph=re.sub(r'\n',' ',matched_paragraph)
        keywords=matched_paragraph.split(',')
    else:
        #if there wasn't we use spacy to extract most used words in the document 
        keywords = extract_most_used_words(text)
        keywords= [f'{word}' for word, count in keywords]
    
    Data['mots_cles']=keywords
    try:
        keywords = parsed_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']
        all_keywords=[]
        all_keywords.extend(keywords['term'])
        Data['mots_cles']=all_keywords
        print("keywords : ",all_keywords)
            
        # if keywords:
        #     if isinstance(keywords, list):
        #         # Flatten the list of lists
        #         flat_keywords = [keyword for sublist in keywords for keyword in sublist]
        #         Data['mots_cles'] = flat_keywords
        #     elif isinstance(keywords, dict):
        #         # If 'keywords' is a dictionary, then extract 'term' directly
        #         Data['mots_cles'] = [keywords.get('term')]
        #     else:
        #         # Handle other cases where 'keywords' might be of unexpected type
        #         mots_cles = []
        # else:
        #     mots_cles = []

        # print("keywords : ", Data['mots_cles'])
    except:
        Data['mots_cles']=keywords
        print("hello3")
    pattern = re.compile(r'\b(?:References|REFERENCES)\b(?:\s*\[.*?\].*?\n){3}', re.DOTALL)


    #we search using regular expression else we extract from last page three refs
    match = pattern.search(text)
    if match:
        matched_paragraph = match.group()
        matched_paragraph=re.sub(r'(References|REFERENCES)','',matched_paragraph)
        Data['references']=(matched_paragraph.strip()).split('\n')
    else:
        pattern = re.compile(r'\b(?:References|REFERENCES)\b(?:\s*\[.*?\].*?\n){0,3}', re.DOTALL)
    #we search using regular expression else we extract from last page three refs
        match = pattern.search(text)
        if match:
            matched_paragraph = match.group()
            matched_paragraph=re.sub(r'(References|REFERENCES)','',matched_paragraph)
            Data['references']=(matched_paragraph.strip()).split('\n')
        else:
            
            # Get the text from the first page
            first_page = pdf_reader[-1]
            text1 = first_page.get_text()
            # Close the PDF file
            pattern = re.compile(r'\b(?:[\d])\b.*?(?:\.\n.*?){3}\.\n', re.DOTALL)
            match = pattern.search(text1)
            if match:
                matched_paragraph = match.group()
                Data['references']=(matched_paragraph.strip()).split('\n')
                
    
    metadata = pdf_reader.metadata
    dattee = metadata.get("modDate", "N/A")

    # Extraction des composants de la date
    year = int(dattee[2:6])
    month = int(dattee[6:8])
    day = int(dattee[8:10])

    # Création de l'objet datetime
    date_object = datetime(year, month, day)

    # La conversion au format ISO 8601 n'inclura que l'année, le mois et le jour
    Data['publication_date'] = date_object.isoformat()
    authors = parsed_dict['TEI']['teiHeader']['fileDesc']['sourceDesc']['biblStruct']['analytic']['author']

    # Extracting author names
    author_institutions = []
    author_names = []

    institutions_set = set()  # To keep track of unique institutions

    if isinstance(authors, dict):  # If only one author
        pers_name = authors.get('persName', {})
        forename = pers_name.get('forename', {})
        surname = pers_name.get('surname', '')
        if isinstance(forename, list):
            forename = ' '.join([fn.get('#text', '') for fn in forename])
        else:
            forename = forename.get('#text', '')
        full_name = f"{forename} {surname}"
        author_names.append(full_name)



        if 'affiliation' in authors:
            affiliation = authors['affiliation']
            if isinstance(affiliation, list):
                for aff in affiliation:
                    org_name = aff.get('orgName', '')
                    if isinstance(org_name, list):
                        org_name = org_name[0]['#text'] if org_name else ''
                    elif isinstance(org_name, dict):
                        org_name = org_name['#text']  # Extract the text from the dictionary
                    if org_name and org_name not in institutions_set:  # Check if not already encountered
                        author_institutions.append(org_name)
                        institutions_set.add(org_name)
            else:
                org_name = affiliation.get('orgName', '')
                if isinstance(org_name, list):
                    org_name = org_name[0]['#text'] if org_name else ''
                elif isinstance(org_name, dict):
                    org_name = org_name['#text']  # Extract the text from the dictionary
                if org_name and org_name not in institutions_set:  # Check if not already encountered
                    author_institutions.append(org_name)
                    institutions_set.add(org_name)

    elif isinstance(authors, list):  # If multiple authors
        for author in authors:
            if isinstance(author, dict) and 'persName' in author:
                pers_name = author.get('persName', '')
                forename = pers_name.get('forename', '')
                surname = pers_name.get('surname', '')
                if isinstance(forename, list):
                    forename = ' '.join([fn.get('#text', '') for fn in forename])
                elif isinstance(forename, dict):
                    forename = forename.get('#text', '')
                else:
                    forename = forename
                full_name = f"{forename} {surname}"
                author_names.append(full_name)


            if 'affiliation' in author:
                affiliation = author['affiliation']
                if isinstance(affiliation, list):
                    for aff in affiliation:
                        org_name = aff.get('orgName', '')
                        if isinstance(org_name, list):

                            org_name = org_name[0]['#text'] if org_name else ''
                        elif isinstance(org_name, dict):
                            org_name = org_name['#text']  # Extract the text from the dictionary
                        if org_name and org_name not in institutions_set:  # Check if not already encountered
                            author_institutions.append(org_name)
                            institutions_set.add(org_name)
                else:
                    org_name = affiliation.get('orgName', '')
                    if isinstance(org_name, list):
                        org_name = org_name[0]['#text'] if org_name else ''
                    elif isinstance(org_name, dict):
                        org_name = org_name['#text']  # Extract the text from the dictionary
                    if org_name and org_name not in institutions_set:  # Check if not already encountered
                        author_institutions.append(org_name)
                        institutions_set.add(org_name)



# Display the parsed dictionary
    Data['auteurs']=author_names
    Data['institutions']=author_institutions
    #readable_date = convert_readable_date(metadata.get("modDate", "N/A"))
    # Data['publication_date']=metadata.get("modDate", "N/A")
    Data['texte_integral']=text
    Data['corrected']=0
    print("Authors : ", author_names)
    print("Institutions",author_institutions)
    return Data 




    """_summary_
    """