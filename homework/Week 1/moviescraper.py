#!/usr/bin/env python
# Name: Hidde van Oijen
# Student number: 12451096
"""
This script scrapes IMDB and outputs a CSV file with highest rated movies.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc"
BACKUP_HTML = 'movies.html'
OUTPUT_CSV = 'movies.csv'


def extract_movies(dom):
    """
    Extract a list of highest rated movies from DOM (of IMDB page).
    Each movie entry should contain the following fields:
    - Title
    - Rating
    - Year of release (only a number!)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """

    movies = []
    stars_final = []
    # enters the right div for the movies
    all_movies = dom.find_all("div", {"class":"lister-item-content"})

    # iterates over the movies
    for i in range (50):
        movie = []
        # adds movie title
        title = all_movies[i].find("a").get_text()
        movie.append(title)
        # adds movie rating
        rating = all_movies[i].find("strong").get_text()
        movie.append(rating)
        # adds movie year
        year = all_movies[i].find("span",{"class":"lister-item-year"}).get_text()
        year = year.split()
        for word in year:
            word = word.strip("(")
            word = word.strip(")")
            if word.isnumeric():
                movie.append(word)
        # adds the movie actors
        person_list = all_movies[i].find_all("p",{"class":""})
        stars = person_list[1].find_all("a")
        stars_final =[]
        for star in stars:
            if "adv_li_st" in star.get('href'):
                stars_final.append(star.get_text())
        movie.append(", ".join(stars_final))
        # adds the runtime
        runtime = all_movies[i].find("span",{"class":"runtime"}).get_text()
        movie.append(runtime)
        movies.append(movie)
    return movies


def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    # writes the data to csv file
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])
    for movie in movies:
        writer.writerow([movie[0],movie[1], movie[2], movie[3],movie[4]])


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get("https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc")

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the movies (using the function you implemented)
    movies = extract_movies(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, movies)
