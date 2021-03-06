input FilmFilter {
  AND: [FilmFilter!]
  OR: [FilmFilter!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  director: String
  director_not: String
  director_in: [String!]
  director_not_in: [String!]
  director_lt: String
  director_lte: String
  director_gt: String
  director_gte: String
  director_contains: String
  director_not_contains: String
  director_starts_with: String
  director_not_starts_with: String
  director_ends_with: String
  director_not_ends_with: String
  episodeId: Int
  episodeId_not: Int
  episodeId_in: [Int!]
  episodeId_not_in: [Int!]
  episodeId_lt: Int
  episodeId_lte: Int
  episodeId_gt: Int
  episodeId_gte: Int
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  isPublished: Boolean
  isPublished_not: Boolean
  openingCrawl: String
  openingCrawl_not: String
  openingCrawl_in: [String!]
  openingCrawl_not_in: [String!]
  openingCrawl_lt: String
  openingCrawl_lte: String
  openingCrawl_gt: String
  openingCrawl_gte: String
  openingCrawl_contains: String
  openingCrawl_not_contains: String
  openingCrawl_starts_with: String
  openingCrawl_not_starts_with: String
  openingCrawl_ends_with: String
  openingCrawl_not_ends_with: String
  releaseDate: DateTime
  releaseDate_not: DateTime
  releaseDate_in: [DateTime!]
  releaseDate_not_in: [DateTime!]
  releaseDate_lt: DateTime
  releaseDate_lte: DateTime
  releaseDate_gt: DateTime
  releaseDate_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  characters_every: PersonFilter
  characters_some: PersonFilter
  characters_none: PersonFilter
  planets_every: PlanetFilter
  planets_some: PlanetFilter
  planets_none: PlanetFilter
  species_every: SpeciesFilter
  species_some: SpeciesFilter
  species_none: SpeciesFilter
  starships_every: StarshipFilter
  starships_some: StarshipFilter
  starships_none: StarshipFilter
  vehicles_every: VehicleFilter
  vehicles_some: VehicleFilter
  vehicles_none: VehicleFilter
}

input PersonFilter {
  AND: [PersonFilter!]
  OR: [PersonFilter!]
  birthYear: String
  birthYear_not: String
  birthYear_in: [String!]
  birthYear_not_in: [String!]
  birthYear_lt: String
  birthYear_lte: String
  birthYear_gt: String
  birthYear_gte: String
  birthYear_contains: String
  birthYear_not_contains: String
  birthYear_starts_with: String
  birthYear_not_starts_with: String
  birthYear_ends_with: String
  birthYear_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  gender: PERSON_GENDER
  gender_not: PERSON_GENDER
  gender_in: [PERSON_GENDER!]
  gender_not_in: [PERSON_GENDER!]
  height: Int
  height_not: Int
  height_in: [Int!]
  height_not_in: [Int!]
  height_lt: Int
  height_lte: Int
  height_gt: Int
  height_gte: Int
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  isPublished: Boolean
  isPublished_not: Boolean
  mass: Float
  mass_not: Float
  mass_in: [Float!]
  mass_not_in: [Float!]
  mass_lt: Float
  mass_lte: Float
  mass_gt: Float
  mass_gte: Float
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  films_every: FilmFilter
  films_some: FilmFilter
  films_none: FilmFilter
  homeworld: PlanetFilter
  species_every: SpeciesFilter
  species_some: SpeciesFilter
  species_none: SpeciesFilter
  starships_every: StarshipFilter
  starships_some: StarshipFilter
  starships_none: StarshipFilter
  vehicles_every: VehicleFilter
  vehicles_some: VehicleFilter
  vehicles_none: VehicleFilter
}

