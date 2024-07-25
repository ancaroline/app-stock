import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'

export default function App(){
  const localImage = require("../../src/assets/cover.png")
  return(
      <ImageBackground source={localImage} style={styles.container}>

        <Text style={styles.title}>FIERCE TATTOARIA</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Verificar Estoque</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Atualizar Estoque</Text>
        </TouchableOpacity>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#D2691E",
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: "white",
    fontSize: 35,
    marginBottom: 15,
    marginTop: 50,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    backgroundColor: '#00000099',
    padding: 16,
  },
  button:{
    backgroundColor: "white",
    width: "60%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText:{
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
  }
})