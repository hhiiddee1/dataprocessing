# Hidde van Oijen 12451096
import csv
import json


def main():
    dict = {}
    # reads data from csvfile
    with open("share-of-renewable-energy-in-4.csv") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        # collects right data and puts it in a dictionary
        for row in csv_reader:
            dict_temp = {}
            # link site : https://www.eea.europa.eu/data-and-maps/daviz/share-of-renewable-energy-in-4#tab-chart_1
            if row["date:text"] == "2015":
                dict_temp["percentage"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp

    # writes data to JSON file
    with open('data.json', 'w') as json_file:
        json.dump(dict, json_file)


if __name__ == "__main__":
    main()
