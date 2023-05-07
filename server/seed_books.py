import requests
import json
# &sort=random
response_API = requests.get('https://openlibrary.org/search.json?q=bannedbooks&limit=10&sort=random')
print(response_API.status_code)
data = response_API.text
parse_json = json.loads(data)
# print(parse_json['docs'])

books= []
for book in parse_json['docs']:
    if book.get('author_name'):
        author = ', '.join(book['author_name'])
    else:
        author = None
    if book.get('subject'):
        genre = book['subject'][0]
    else:
        genre = None
    if book.get('cover_i'):
        cover=book['cover_i']
        image =f'https://covers.openlibrary.org/b/id/{cover}-M.jpg'
    else:
        image = None

    key=book['key']
    response_API = requests.get(f'https://openlibrary.org{key}.json')
    book_data = response_API.text
    book_parse_json = json.loads(book_data)

    if book_parse_json.get('description'):
        description = book_parse_json['description'].partition('\r')[0]
    else:
        description = None
    
    
    book_dict = dict(
        key=key,
        title= book['title'],
        year=book.get('first_publish_year'),
        author = author,
        genre=genre,
        image = image,
        description = description
    )
    books.append(book_dict)

dictionary = {
    'books':books
    }

with open('book-list.json', 'w') as fp:
    json.dump(dictionary,fp)
