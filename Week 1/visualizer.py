#!/usr/bin/env python
# Name: Hidde van Oijen
# Student number: 12451096
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018
first_line = True
# Global dictionary for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}

# iteraties over movies and adds the rating to the corresponding year
with open("movies.csv", "r") as csvfile:
    reader = csv.reader(csvfile, delimiter=",")
    for row in reader:
        if first_line == False:
            data_dict[row[2]].append(row[1])
        first_line = False
# calculates the average rating for each year
average_list = []
for year in data_dict:
    total = 0
    counter = 1
    average = 0
    for film in data_dict[year]:
        total += float(film)
        average = total / counter
        counter += 1
    average_list.append(average)

# makes list for years
years = []
for year in range(START_YEAR, END_YEAR):
    years.append(year)

# plots the data
plt.plot(years, average_list)
plt.axis([2008,2017,8,9])
plt.show()




if __name__ == "__main__":
    print(data_dict)
