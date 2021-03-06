export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CitiesMetadata = {
   __typename?: 'CitiesMetadata',
  populationLowerBound: Scalars['Int'],
  populationUpperBound: Scalars['Int'],
  latLowerBound: Scalars['Float'],
  latUpperBound: Scalars['Float'],
  lngLowerBound: Scalars['Float'],
  lngUpperBound: Scalars['Float'],
};

export enum CitiesOrderAttr {
  NameAsc = 'nameASC',
  NameDesc = 'nameDESC',
  PopulationAsc = 'populationASC',
  PopulationDesc = 'populationDESC',
  LatAsc = 'latASC',
  LatDesc = 'latDESC',
  LngAsc = 'lngASC',
  LngDesc = 'lngDESC',
  CountryAsc = 'countryASC',
  CountryDesc = 'countryDESC'
}

export type CitiesPagination = {
   __typename?: 'CitiesPagination',
  nodes?: Maybe<Array<City>>,
  hasNext: Scalars['Boolean'],
  hasPrev: Scalars['Boolean'],
};

export type City = Node & {
   __typename?: 'City',
  id: Scalars['ID'],
  name: Scalars['String'],
  country: Scalars['String'],
  population: Scalars['Int'],
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type CitySearchParamsInput = {
  countryNameContains?: Maybe<Scalars['String']>,
  populationGte?: Maybe<Scalars['Int']>,
  populationLte?: Maybe<Scalars['Int']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updateUserSettings: UpdateUserSettingsPayload,
};


export type MutationUpdateUserSettingsArgs = {
  input: UpdateUserSettingsInput
};

export type Node = {
  id: Scalars['ID'],
};

export type Query = {
   __typename?: 'Query',
  citiesMetadata?: Maybe<CitiesMetadata>,
  citiesPagination?: Maybe<CitiesPagination>,
  countries?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<Node>,
  uiState?: Maybe<UiState>,
  viewer?: Maybe<User>,
};


export type QueryCitiesPaginationArgs = {
  pageSize?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  searchParams?: Maybe<CitySearchParamsInput>
};


export type QueryCountriesArgs = {
  searchString: Scalars['String']
};


export type QueryNodeArgs = {
  id: Scalars['ID']
};

export type UiCitySearchParams = {
   __typename?: 'UICitySearchParams',
  countryNameContains?: Maybe<Scalars['String']>,
  populationGte?: Maybe<Scalars['Int']>,
  populationLte?: Maybe<Scalars['Int']>,
};

export type UiState = {
   __typename?: 'UIState',
  id: Scalars['ID'],
  citySearchParams?: Maybe<UiCitySearchParams>,
};

export type UpdateUserSettingsInput = {
  userId: Scalars['ID'],
  citiesPaginationPageSize?: Maybe<Scalars['Int']>,
  foo?: Maybe<Scalars['String']>,
  bar?: Maybe<Scalars['Int']>,
};

export type UpdateUserSettingsPayload = {
   __typename?: 'UpdateUserSettingsPayload',
  user: User,
};

export type User = Node & {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  settings: UserSettings,
};

export type UserSettings = {
   __typename?: 'UserSettings',
  citiesPaginationPageSize: Scalars['Int'],
  foo: Scalars['String'],
  bar: Scalars['Int'],
};
