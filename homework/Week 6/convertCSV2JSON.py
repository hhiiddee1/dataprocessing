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
                print(dict_temp)
                dict_temp["2004"] = int(float(row["obsValue:number"]))
                print(dict_temp)
                dict[row["country:text"]] = dict_temp
                print(dict)
            if row["date:text"] == "2005":
                dict_temp["2005"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2006":
                dict_temp["2006"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2007":
                dict_temp["2007"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2008":
                dict_temp["2008"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2009":
                dict_temp["2009"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2010":
                dict_temp["2010"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2011":
                dict_temp["2011"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2012":
                dict_temp["2012"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2013":
                dict_temp["2013"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2014":
                dict_temp["2014"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
            if row["date:text"] == "2015":
                dict_temp["2015"] = int(float(row["obsValue:number"]))
                dict[row["country:text"]] = dict_temp
    # writes data to JSON file
    with open('data.json', 'w') as json_file:
        json.dump(dict, json_file)


if __name__ == "__main__":
    main()
