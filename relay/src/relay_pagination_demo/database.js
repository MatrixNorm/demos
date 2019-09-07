 const db = {
   posts: {
     byId: {},
     indexes: {
       createdAt: [],
       title: [],
     }
   },
   users: {
     byId: {}
   }
 }

db.posts.byId = {
  "post1":  {id: "post1",  title: "Ocaml 1",  authorId: "user1", createdAt: 1},
  "post2":  {id: "post2",  title: "Ocaml 2",  authorId: "user1", createdAt: 2},
  "post3":  {id: "post3",  title: "Ocaml 3",  authorId: "user1", createdAt: 3},
  "post4":  {id: "post4",  title: "Ocaml 4",  authorId: "user1", createdAt: 4},
  "post5":  {id: "post5",  title: "Ocaml 5",  authorId: "user2", createdAt: 5},
  "post6":  {id: "post6",  title: "Ocaml 6",  authorId: "user2", createdAt: 6},
  "post7":  {id: "post7",  title: "Ocaml 7",  authorId: "user1", createdAt: 7},
  "post8":  {id: "post8",  title: "Ocaml 8",  authorId: "user1", createdAt: 8},
  "post9":  {id: "post9",  title: "Ocaml 9",  authorId: "user1", createdAt: 9},
  "post10": {id: "post10", title: "Ocaml 10", authorId: "user1", createdAt: 10},
  "post11": {id: "post11", title: "Ocaml 11", authorId: "user2", createdAt: 11},
  "post12": {id: "post12", title: "Ocaml 12", authorId: "user1", createdAt: 12},
  "post13": {id: "post13", title: "Ocaml 13", authorId: "user1", createdAt: 13},
  "post14": {id: "post14", title: "Ocaml 14", authorId: "user2", createdAt: 14},
}

db.users.byId = {
  "user1": {id: "user1", name: "Boris"},
  "user2": {id: "user2", name: "Vadim"}
}

function createIndex(table, attr) {
  const records = Object.values(table)
  records.sort((a, b) => {
    const x = a[attr],  y = b[attr]
    return x < y ? -1 : (x === y ? 0 : 1)
  })
  return records
}

class Index {
  constructor(table, attr) {
    this.index = createIndex(table, attr)
  }

  get () {

  }

  getAfter(itemId, count) {
    let positionInIndex, items;
    if ( itemId ) {
      positionInIndex = this.index.findIndex(p => p.id === itemId)
      items = this.index.slice(positionInIndex + 1, positionInIndex + count + 1)
    } else {
      positionInIndex = 0
      items = this.index.slice(0, count)
    }
    const hasNext = positionInIndex + count + 1 < this.index.length - 1
    const hasPrev = positionInIndex > 0
    return { items, hasNext, hasPrev }
  }

  getBefore(itemId, count) {
    let positionInIndex, items;
    if ( itemId ) {
      positionInIndex = this.index.findIndex(p => p.id === itemId)
      items = this.index.slice(positionInIndex + 1, positionInIndex + count + 1)
    } else {
      positionInIndex = 0
      items = this.index.slice(0, count)
    }
    const hasNext = positionInIndex + count + 1 < this.index.length - 1
    const hasPrev = positionInIndex > 0
    return { items, hasNext, hasPrev }
  }
}

db.posts.indexes.createdAt = new Index(db.posts.byId, 'createdAt')
db.posts.indexes.title = new Index(db.posts.byId, 'title')

export default db