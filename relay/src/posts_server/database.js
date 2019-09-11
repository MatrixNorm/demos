 const db = {
   posts: {
     byId: {},
     indexes: {
       createdAt: [],
       viewsCount: [],
     }
   },
   users: {
     byId: {}
   }
 }

db.posts.byId = {
  "post1":  {id: "post1",  title: "Values and Change: Clojure’s approach to Identity and State",  authorId: "user1", createdAt: 1, viewsCount: 4523},
  "post2":  {id: "post2",  title: "Ocaml tuturial",  authorId: "user1", createdAt: 2, viewsCount: 523},
  "post3":  {id: "post3",  title: "The Dunning-Kruger Effect",  authorId: "user1", createdAt: 3, viewsCount: 1423},
  "post4":  {id: "post4",  title: "Demand-driven architecture: Relay, Falcor, Om.Next",  authorId: "user1", createdAt: 4, viewsCount: 894},
  "post5":  {id: "post5",  title: "React Hooks",  authorId: "user2", createdAt: 5, viewsCount: 45},
  "post6":  {id: "post6",  title: "Python >>> Ruby",  authorId: "user2", createdAt: 6, viewsCount: 577},
  "post7":  {id: "post7",  title: "Scala",  authorId: "user1", createdAt: 7, viewsCount: 974},
  "post8":  {id: "post8",  title: "Why ReasonML?",  authorId: "user1", createdAt: 8, viewsCount: 78},
  "post9":  {id: "post9",  title: "Clojurescript >>> Javascript",  authorId: "user1", createdAt: 9, viewsCount: 23455},
  "post10": {id: "post10", title: "Datomic, Datascipt and Datalog", authorId: "user1", createdAt: 10, viewsCount: 3451},
  "post11": {id: "post11", title: "Haskell type system", authorId: "user2", createdAt: 11, viewsCount: 129},
  "post12": {id: "post12", title: "SQL", authorId: "user1", createdAt: 12, viewsCount: 53},
  "post13": {id: "post13", title: "React radio input", authorId: "user1", createdAt: 13, viewsCount: 5673},
  "post14": {id: "post14", title: "Ocaml vs Haskell", authorId: "user2", createdAt: 14, viewsCount: 1224},
}

db.users.byId = {
  "user1": {id: "user1", name: "Boris"},
  "user2": {id: "user2", name: "Vadim"}
}

export function createIndex(table, attr) {
  const records = Object.values(table)
  records.sort((a, b) => {
    const x = a[attr],  y = b[attr]
    return x < y ? -1 : (x === y ? 0 : 1)
  })
  return records
}

export class Index {
  constructor(index) {
    this.index = index
  }

  get ({ itemId, count }: {itemId: ?string, count: number}) {
    //console.log(itemId, count)
    if ( count >= 0 ) {
      return this.getAfter(itemId, count)
    } 
    return this.getBefore(itemId, (-1) * count)
  }

  getAfter(itemId: ?string, count: number) {
    console.log(itemId, count)
    let positionInIndex, items;
    if ( itemId ) {
      positionInIndex = this.index.findIndex(p => p.id === itemId)
      items = this.index.slice(positionInIndex + 1, positionInIndex + count + 1)
    } else {
      positionInIndex = 0
      items = this.index.slice(0, count)
    }
    const hasNext = positionInIndex + 1 + count < this.index.length - 1
    const hasPrev = positionInIndex > 0
    return { items, hasNext, hasPrev }
  }

  getBefore(itemId: ?string, count: number) {
    let positionInIndex, items;
    if ( itemId ) {
      positionInIndex = this.index.findIndex(p => p.id === itemId)
      items = this.index.slice(Math.max(positionInIndex - count, 0), positionInIndex)
    } else {
      positionInIndex = this.index.length
      items = this.index.slice(positionInIndex - count, positionInIndex)
    }
    const hasNext = positionInIndex < this.index.length - 1
    const hasPrev = positionInIndex - count > 0
    return { items, hasNext, hasPrev }
  }
}

const indexes = {}
indexes.createdAt = new Index(createIndex(db.posts.byId, 'createdAt'))
indexes.viewsCount = new Index(createIndex(db.posts.byId, 'viewsCount'))

export function getIndex(orderBy): Index {
  return indexes[orderBy]
}

export default db