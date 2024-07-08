import Realm from "realm";
import Book from "./../schemaBooks/";

export default function getRealm() {
  return new Realm({
    schema: [Book]
  });
}
