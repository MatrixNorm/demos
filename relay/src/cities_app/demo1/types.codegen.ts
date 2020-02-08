export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type ChangeCitiesPaginationPageSizeInput = {
  pageSize: Scalars['Int'],
  userId: Scalars['ID'],
};

export type ChangeCitiesPaginationPageSizePayload = {
   __typename?: 'ChangeCitiesPaginationPageSizePayload',
  user?: Maybe<User>,
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
  pageNo: Scalars['Int'],
  hasNextPage: Scalars['Boolean'],
  hasPrevPage: Scalars['Boolean'],
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
  ordering?: Maybe<CitiesOrderAttr>,
};

export type Mutation = {
   __typename?: 'Mutation',
  changeCitiesPaginationPageSize: ChangeCitiesPaginationPageSizePayload,
};


export type MutationChangeCitiesPaginationPageSizeArgs = {
  input?: Maybe<ChangeCitiesPaginationPageSizeInput>
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
  pageNo: Scalars['Int'],
  pageSize?: Maybe<Scalars['Int']>,
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

export type User = Node & {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  settings?: Maybe<UserSettings>,
};

export type UserSettings = {
   __typename?: 'UserSettings',
  citiesPaginationPageSize?: Maybe<Scalars['Int']>,
};
