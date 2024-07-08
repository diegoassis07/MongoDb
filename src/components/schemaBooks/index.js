import Realm from "realm";

class Book extends Realm.Object {}
Book.schema = {
  name: "Book",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    name: "string",
    preco: "string",
  },
};

export default Book;