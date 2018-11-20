# Hidde van Oijen 12451096
import csv
import json

def main():
    dict = {}
    # reads data from csvfile
    with open("KNMI_Data.csv") as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # collects right data and puts it in a dictionary
        for row in csv_reader:
            dict_temp = {}
            temperature = int(row["   TX"].lstrip())
            dict_temp["temperature"] = temperature
            dict[row["YYYYMMDD"]] = dict_temp

    # writes data to JSON file
    with open('data.json', 'w') as json_file:
        json.dump(dict, json_file)


if __name__ == "__main__":
    main()
