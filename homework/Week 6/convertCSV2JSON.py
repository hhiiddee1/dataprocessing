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
            # link site : https://www.eea.europa.eu/data-and-maps/daviz/share-of-renewable-energy-in-4#tab-chart_1
            if row["date:text"] == "2004":
                dict_temp = {}
                year = 2004
            if row["date:text"] != "Target 2020":
                dict_temp["year" + str(year)] = int(float(row["obsValue:number"]))
                if row["date:text"] == "2015":
                    if int(float(row["obsValue:number"])) < 20:
                        dict_temp["fillKey"] = "superlight"
                    elif int(float(row["obsValue:number"])) < 40:
                        dict_temp["fillKey"] = "light"
                    elif int(float(row["obsValue:number"])) < 60:
                        dict_temp["fillKey"] = "dark"
                    elif int(float(row["obsValue:number"])) < 80:
                        dict_temp["fillKey"] = "superdark"
                dict[change_to_landcode(row["country:text"])] = dict_temp

                year += 1

    # writes data to JSON file
    with open('data.json', 'w') as json_file:
        json.dump(dict, json_file)

def change_to_landcode(name):
    with open("CountryISO-CSV_j9muc5.csv") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if row["Name"] == name:
                code ="help"
                code = row["ï»¿Code"]
                return code


if __name__ == "__main__":
    main()
