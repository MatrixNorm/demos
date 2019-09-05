const db = {}

db.postsById = {
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

db.usersById = {
  "user1": {id: "user1", name: "Boris"},
  "user2": {id: "user2", name: "Vadim"}
}

export default db