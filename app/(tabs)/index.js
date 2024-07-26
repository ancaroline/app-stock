import { NavigationContainer } from "@react-navigation/native";
import { Routes } from '../../src/routes'
import { StockProvider } from "@/src/contexts/StockContext";

export default function App(){
  return(
    <StockProvider>
      <NavigationContainer independent={true}>
        <Routes/>
      </NavigationContainer>
    </StockProvider>
  )
}