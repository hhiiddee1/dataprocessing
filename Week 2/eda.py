import csv
import pandas as pd
import matplotlib.pyplot as plt
import json

if __name__ == "__main__":
    countries = {}
    with open("input.csv") as file:
        csv_reader = csv.DictReader(file)
        
        # loads in correct data
        for row in csv_reader:
            country = {}
            country["region"] = row["Region"].rstrip()
            country["pop. density"] = row["Pop. Density (per sq. mi.)"]

            # removes bad data and adds infant mortality
            if not row["Infant mortality (per 1000 births)"] == "":
                if not row["Infant mortality (per 1000 births)"] == "unknown":
                    infant_mortality = row["Infant mortality (per 1000 births)"].replace(",", ".")
                    country["infant mortality"] = float(infant_mortality)

            # removes dad data and adds GDP
            if not row["GDP ($ per capita) dollars"] == "":
                if not row["GDP ($ per capita) dollars"] == "unknown":
                    if int(row["GDP ($ per capita) dollars"].strip("dollars")) < 200000:
                        country["GDP"] = int(row["GDP ($ per capita) dollars"].strip("dollars"))

            # makes dictionary with all the countries
            countries[row["Country"].rstrip()] = country

    # makes dataframe
    data_list = pd.DataFrame.from_dict(countries, orient='index')

    # calculates mean value
    mean_GDP = data_list.loc[:, "GDP"].mean()
    print(f"mean: {'%.0f' % mean_GDP}")

    # calculates median
    median_GDP = data_list.loc[:, "GDP"].median()
    print(f"median: {median_GDP}")

    # caculates mode
    mode_GDP = data_list.loc[:, "GDP"].mode()
    print(f"mode: {mode_GDP[0]}")

    # calculates standard deviation
    std_GDP = data_list.loc[:, "GDP"].std()
    print(f"standard deviation: {'%.0f' % std_GDP}")

    # makes histogram for GDP
    hist = data_list.hist(column="GDP", bins=40)
    plt.ylabel("frequency")
    plt.xlabel("GDP ($ per capita) dollars")
    plt.show()

    # makes boxplot for infant mortality
    boxplot = data_list.boxplot(column="infant mortality")
    plt.ylabel("Infant mortality (per 1000 births)")
    plt.show()

    # makes json file for data
    with open('data.json', 'w') as json_file:
        json.dump(countries, json_file)
