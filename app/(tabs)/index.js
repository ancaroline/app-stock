import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function App(){
  return(
    <View style={styles.container}>
      
      <Text style={styles.title}>FIERCE TATTOARIA</Text>
      
      <Image
      source={require("../../src/assets/fierce.png")}
      style={styles.logo}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Verificar Estoque</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atualizar Estoque</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#D2691E",
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    marginBottom: 20,
  },
  title:{
    color: "white",
    fontSize: 30,
    marginBottom: 15,
    fontWeight: 'bold',

  },
  button:{
    backgroundColor: "white",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 8,
  }
})