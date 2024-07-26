import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './pages/home'
import { StockCheck } from './pages/stockCheck'
import { StockUpdate } from './pages/stockUpdate'

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
            />
            <Tab.Screen
                name="stock check"
                component={StockCheck}
            />
            <Tab.Screen
                name="stock update"
                component={StockUpdate}
            />
        </Tab.Navigator>
    )
}