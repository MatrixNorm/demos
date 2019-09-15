/* @flow */


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Node = {
  id: $ElementType<Scalars, 'ID'>,
};

export type PageInfo = {
   __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: $ElementType<Scalars, 'Boolean'>,
  /** When paginating backwards, are there more items? */
  hasPreviousPage: $ElementType<Scalars, 'Boolean'>,
  /** When paginating backwards, the cursor to continue. */
  startCursor?: ?$ElementType<Scalars, 'String'>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: ?$ElementType<Scalars, 'String'>,
};

export type Post = Node & {
   __typename?: 'Post',
  id: $ElementType<Scalars, 'ID'>,
  title: $ElementType<Scalars, 'String'>,
  author: User,
};

export type PostConnection = {
   __typename?: 'PostConnection',
  pageInfo: PageInfo,
  edges: Array<?PostEdge>,
};

export type PostEdge = {
   __typename?: 'PostEdge',
  node?: ?Post,
  cursor: $ElementType<Scalars, 'String'>,
};

export type PostOrdering = {
  field: PostOrderingFields,
  desc?: ?$ElementType<Scalars, 'Boolean'>,
};

export const PostOrderingFieldsValues = Object.freeze({
  CreatedAt: 'createdAt', 
  ViewsCount: 'viewsCount'
});


export type PostOrderingFields = $Values<typeof PostOrderingFieldsValues>;

export type Query = {
   __typename?: 'Query',
  node?: ?Node,
  /**  https://github.com/facebook/relay/issues/1983  */
  xxx?: ?Xxx,
};


export type QueryNodeArgs = {
  id: $ElementType<Scalars, 'ID'>
};

export type User = Node & {
   __typename?: 'User',
  id: $ElementType<Scalars, 'ID'>,
  name: $ElementType<Scalars, 'String'>,
  posts?: ?Array<?Post>,
};

export type Xxx = {
   __typename?: 'XXX',
  posts?: ?PostConnection,
};


export type XxxPostsArgs = {
  after?: ?$ElementType<Scalars, 'String'>,
  first?: ?$ElementType<Scalars, 'Int'>,
  before?: ?$ElementType<Scalars, 'String'>,
  last?: ?$ElementType<Scalars, 'Int'>,
  orderBy?: ?PostOrdering
};
