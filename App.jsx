import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import getRealm from "./src/components/services/realm";
import constants from "expo-constants";
import Books from "./src/components/Books";
import * as Native from "react-native";

export default function App() {
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");
  const [idEdit, setIdEdit] = useState(null);
  const [books, setBooks] = useState([]);

  const statusBarHeight = constants.statusBarHeight; // pegando a altura da StatusBar

  const ToEditBook = async (data) => {
    setNome(data.name);
    setPreco(data.preco);
    setIdEdit(data.id);
  };

  const handleDeleteBook = async (data) => {
    const realm = getRealm();
    const id = data.id;
    try {
      await realm.write(() => {
        const bookToDelete = realm.objects("Book").filtered("id =" + id);
        if (bookToDelete.length > 0) {
          realm.delete(bookToDelete);
        }
      });

      const currentBooks = realm.objects("Book").sorted("id", false);
      setBooks([...currentBooks]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetBooks = async () => {
    const realm = getRealm();
    const booksFromRealm = realm.objects("Book");
    setBooks(booksFromRealm);
  };

  useEffect(() => {
    handleGetBooks();
  }, []);

  const saveBook = async (data) => {
    const realm = getRealm();

    // Gerando um novo ID para o livro, caso ele seja o primeiro a ser adicionado
    const id =
      realm.objects("Book").sorted("id", true).length > 0
        ? realm.objects("Book").sorted("id", true)[0].id + 1
        : 1;
    const dataBook = {
      id: id,
      name: data?.nome,
      preco: data?.preco,
    };

    await realm.write(() => {
      realm.create("Book", dataBook);
    });
  };

  const handleBookRegistration = async () => {
    if (nome === "" || preco === "") return;
    try {
      const data = { nome: nome, preco: preco };
      await saveBook(data);
      setNome("");
      setPreco("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBook = async () => {
    if (idEdit === null) {
      alert("voce nao pode editar");
      return;
    }
    const realm = getRealm();
    const toUpdateBook = {
      id: idEdit,
      name: nome,
      preco: preco,
    };
    await realm.write(() => {
      realm.create("Book", toUpdateBook, "modified");
    });

    const currentBooks = realm.objects("Book").sorted("id", false);
    setBooks([...currentBooks]);
    setNome("");
    setPreco("");
  };

  return (
    <Native.SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#454545" />
      <Native.View
        style={{
          alignItems: "center",
          marginTop: statusBarHeight + 20,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Native.Text style={styles.title}>Próximos livros</Native.Text>
        <Native.View style={{ width: "100%" }}>
          <Native.Text style={styles.label}>Nome</Native.Text>
          <Native.TextInput
            style={styles.input}
            placeholder="Digite o nome do produto"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <Native.Text style={styles.label}>Preço</Native.Text>
          <Native.TextInput
            style={styles.input}
            placeholder="Digite o preço do produto"
            value={preco}
            onChangeText={(text) => setPreco(text)}
          />
        </Native.View>

        <Native.View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Native.TouchableOpacity
            style={styles.button}
            onPress={handleBookRegistration}
          >
            <Native.Text style={styles.buttonText}>Cadastrar</Native.Text>
          </Native.TouchableOpacity>

          <Native.TouchableOpacity
            style={styles.button}
            onPress={handleEditBook}
          >
            <Native.Text style={styles.buttonText}>Editar</Native.Text>
          </Native.TouchableOpacity>
        </Native.View>
      </Native.View>
      <Native.FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Books data={item} excluir={handleDeleteBook} editar={ToEditBook} />
        )}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={{ width: "100%" }}
      />
    </Native.SafeAreaView>
  );
}

const styles = Native.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "600",
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 7,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: "#ddd",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto",
    fontWeight: "600",
  },
});
