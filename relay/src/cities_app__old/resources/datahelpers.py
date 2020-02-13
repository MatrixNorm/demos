import pandas

raw_df = pandas.read_csv(open('./worldcities.csv'))
cities_df = raw_df[['city', 'lat', 'lng', 'country', 'population']].dropna()
cities_df.rename(columns={'city': 'name'}, inplace=True)
cities_df.reset_index(inplace=True)
cities_df.rename(columns={'index': 'id'}, inplace=True)
cities_df = cities_df[cities_df.population > 1000000]
cities_df.to_json('cities.json', orient='records')
