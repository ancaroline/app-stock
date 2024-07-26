import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './pages/home'
import { StockCheck } from './pages/stockCheck'
import { StockUpdate } from './pages/stockUpdate'

import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <AntDesign name="home" size={24} color="orange" />
                        }
                        return <AntDesign name="home" size={24} color="black" />
                    }                   
                }}
            />
            <Tab.Screen
                name="Verificação Completa do Estoque"
                component={StockCheck}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <AntDesign name="check" size={24} color="orange" />
                        }
                        return <AntDesign name="check" size={24} color="black" />
                    }
                }}
            />
            <Tab.Screen
                name="Atualização do Estoque"
                component={StockUpdate}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <AntDesign name="edit" size={24} color="orange" />
                        }
                        return <AntDesign name="edit" size={24} color="black" />
                    }
                }}
            />
        </Tab.Navigator>
    )
}