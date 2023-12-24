#Imports *******************************
from functions import *
from pdfminer.high_level import extract_text
import sys
import re
import fitz
import PyPDF2
#*************************************************
def extractData(Path):

    Data= {
        'Title': "",
        'Authors' : [],
        'Institutions' : [],
        'Abstract':"",
        'Keywords': "" ,
        'References': "",
        'Date':''
    }

    #extracting the first page only since the title/authors/institutions are there 
    text= extractTextFromPDFFirstP(Path)
    #create a list(phrases) of phrases from the text 
    phrases=texttoSen(text)

    #title extraction ***********************************

    #split the first sentences in case we got the title linked with the next sentence after removing non printable characters
    part1,part2=split_sentence(phrases[0])
    phrases.pop(0)
    if (part2!=''):
        phrases.insert(0,part2)
    phrases.insert(0,part1)

    Data['Title']=part1
    #title extraction done***********************************

    #Authors+Institutions extraction ********************************
    i=1
    Authors=[]
    Institutions=[]
    #since mostly authors start with Upper case and ends with the number that reffers to the institution 
    #we verify each sentence after the title to look for authors
    while i< len(phrases) and starts_with_upper_and_ends_with_number_star_comma(phrases[i]) :
        Authors.append(phrases[i])
        i=i+1
    #and here look for institutions each starting with number as ref
    while i< len(phrases) and starts_with_number(phrases[i]) :
        if ((i<len(phrases)-1) and not (starts_with_number(phrases[i+1])) and starts_with_number(phrases[i+2])) or (i<len(phrases)-1) and ('Institute' in phrases[i+1] or'Institut' in phrases[i+1] or 'University' in phrases[i+1]) :
            phrases[i]=phrases[i]+' '+phrases[i+1]
            phrases.pop(i+1)
        if (i<len(phrases)-1) and phrases[i+1]=='and' :
            phrases[i]=phrases[i]+' '+phrases[i+1]+' '+phrases[i+2]
            phrases.pop(i+1)
            phrases.pop(i+1)
        Institutions.append(phrases[i])
        i=i+1
        
    Data['Authors']=Authors
    Data['Institutions']=Institutions
    #Authors+Institutions extraction done

    # Abstract extraction*****************************
    sys.stdout.reconfigure(encoding='utf-8')
    #reread the whole text not only the first page
    text=extract_text(Path)

    pattern = re.compile(r'(Abstract|ABSTRACT).*?(?:\.\n\n|(?=Introduction|INTRODUCTION|OVERVIEW|Overview))', re.DOTALL)

    match = pattern.search(text)
    if match:
        matched_paragraph = match.group()
        matched_paragraph = re.sub(r'(Abstract|ABSTRACT)', '', matched_paragraph)
        Data['Abstract']=matched_paragraph.strip()
    else:
        pattern = re.compile(fr'{phrases[i+1]}.*?(?:\.\n|(?=Introduction|INTRODUCTION|OVERVIEW|Overview))', re.DOTALL)
        match = pattern.search(text)
        if match:
            matched_paragraph = match.group()
            Data['Abstract']=matched_paragraph
    # Abstract extraction done ***************************************\
        
    # Keywrods extraction*****************************

    #we look for keywords using regular expressions
    pattern = re.compile(r'(Keywords|KEYWORDS).*?(?:\.\n\n)', re.DOTALL)

    match = pattern.search(text)
    if match:
        keywords=match.group()
        keywords=re.sub(r'(Keywords|KEYWORDS)','',keywords)
        keywords=keywords.strip()
    else:
        #if there wasn't we use spacy to extract most used words in the document 
        keywords = extract_most_used_words(text)
        keywords= [f'{word}' for word, count in keywords]
        
    Data['Keywords']=keywords
    # Keywrods extraction done *****************************

    #References extraction *****************************
    pattern = re.compile(r'\b(?:References|REFERENCES)\b.*?(?:\.\n.*?){4}\.\n', re.DOTALL)
    #we search using regular expression else we extract from last page three refs
    match = pattern.search(text)
    if match:
        matched_paragraph = match.group()
        matched_paragraph=re.sub(r'(References|REFERENCES)','',matched_paragraph)
    else:
        pdf_document = fitz.open(Path)
        # Get the text from the first page
        first_page = pdf_document.load_page(-1)
        text = first_page.get_text()
        # Close the PDF file
        pdf_document.close()
        pattern = re.compile(r'\b(?:[\d])\b.*?(?:\.\n.*?){3}\.\n', re.DOTALL)
        match = pattern.search(text)
        if match:
            matched_paragraph = match.group()
            
    Data['References']=matched_paragraph.strip()
    #References extraction done *****************************

    #date extraction************************************
    # Open the PDF file
    pdf_file = open('example2.pdf', 'rb')

    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    # Access metadata
    metadata = pdf_reader.metadata
    created_date = metadata.get('/CreationDate', 'No Creation Date')
    pdf_file.close()

    Data['Date']=convert_pdf_date(created_date)
     #date extraction done ************************************
    return Data