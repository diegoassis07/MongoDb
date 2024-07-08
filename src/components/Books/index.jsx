import * as Native from "react-native";

export default function Books({ data, excluir, editar }) {
  return (
    <Native.View style={styles.container}>
      <Native.View style={styles.contentContainer}>
        <Native.Text style={styles.textName}>
          {data.id} - {data.name}
        </Native.Text>
        <Native.Text style={styles.textPreco}>R$ {data.preco}</Native.Text>

        <Native.View style={styles.contentButton}>
          
          <Native.TouchableOpacity
            style={styles.button}
            onPress={() => editar(data)}
          >
            <Native.Text>Editar</Native.Text>
          </Native.TouchableOpacity>

          <Native.TouchableOpacity
            style={styles.button}
            onPress={() => excluir(data)}
          >
            <Native.Text>Excluir</Native.Text>
          </Native.TouchableOpacity>
        </Native.View>
      </Native.View>
    </Native.View>
  );
}

const styles = Native.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingTop: 15,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textPreco: {
    fontSize: 16,
    marginTop: 5,
  },
  contentButton: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    gap: 15,
    alignItems: "center",
  },
  button: {
    padding: 7,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
