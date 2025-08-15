import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./api/posts";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: fetchPosts,
    });

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.text}>Carregando usuários...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={[styles.text, styles.error]}>Erro ao carregar usuários</Text>
                <Text>{error.message}</Text>
                <TouchableOpacity style={styles.button} onPress={refetch}>
                    <Text style={styles.buttonText}>Tentar novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isFetching}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.iconContainer}>
              <Icon name="email" size={16} color="#666" style={styles.icon} />
              <Text style={styles.iconText}>{item.email}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="location-city" size={16} color="#666" style={styles.icon} />
              <Text style={styles.iconText}>{item.address.city}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginTop: 8
  },
  error: {
    color: "red",
    fontWeight: "bold"
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  icon: {
    marginRight: 6
  },
  iconText: {
    fontSize: 14,
    color: "#666"
  },
  button: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
});