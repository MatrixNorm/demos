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
  "post1":  {id: "post1",  title: "Ocaml 1",  authorId: "user1", createdAt: 1, viewsCount: 4523},
  "post2":  {id: "post2",  title: "Ocaml 2",  authorId: "user1", createdAt: 2, viewsCount: 523},
  "post3":  {id: "post3",  title: "Ocaml 3",  authorId: "user1", createdAt: 3, viewsCount: 1423},
  "post4":  {id: "post4",  title: "Ocaml 4",  authorId: "user1", createdAt: 4, viewsCount: 894},
  "post5":  {id: "post5",  title: "Ocaml 5",  authorId: "user2", createdAt: 5, viewsCount: 45},
  "post6":  {id: "post6",  title: "Ocaml 6",  authorId: "user2", createdAt: 6, viewsCount: 577},
  "post7":  {id: "post7",  title: "Ocaml 7",  authorId: "user1", createdAt: 7, viewsCount: 974},
  "post8":  {id: "post8",  title: "Ocaml 8",  authorId: "user1", createdAt: 8, viewsCount: 78},
  "post9":  {id: "post9",  title: "Ocaml 9",  authorId: "user1", createdAt: 9, viewsCount: 23455},
  "post10": {id: "post10", title: "Ocaml 10", authorId: "user1", createdAt: 10, viewsCount: 3451},
  "post11": {id: "post11", title: "Ocaml 11", authorId: "user2", createdAt: 11, viewsCount: 129},
  "post12": {id: "post12", title: "Ocaml 12", authorId: "user1", createdAt: 12, viewsCount: 53},
  "post13": {id: "post13", title: "Ocaml 13", authorId: "user1", createdAt: 13, viewsCount: 5673},
  "post14": {id: "post14", title: "Ocaml 14", authorId: "user2", createdAt: 14, viewsCount: 1224},
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

  get ({ direction, itemId, count }) {
    console.log(direction, itemId, count)
    if (direction === 'forward') {
      return this.getAfter(itemId, count)
    } else if (direction === 'backward') {
      return this.getBefore(itemId, count)
    }
  }

  getAfter(itemId, count) {
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

  getBefore(itemId, count) {
    let positionInIndex, items;
    if ( itemId ) {
      positionInIndex = this.index.findIndex(p => p.id === itemId)
      items = this.index.slice(Math.max(positionInIndex - count, 0), positionInIndex)
    } else {
      positionInIndex = this.index.length - 1
      items = this.index.slice(positionInIndex - count, positionInIndex)
    }
    const hasNext = positionInIndex < this.index.length - 1
    const hasPrev = positionInIndex - count > 0
    return { items, hasNext, hasPrev }
  }
}

db.posts.indexes.createdAt = new Index(createIndex(db.posts.byId, 'createdAt'))
db.posts.indexes.viewsCount = new Index(createIndex(db.posts.byId, 'viewsCount'))

export default db