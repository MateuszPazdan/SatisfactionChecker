import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Platform,
} from 'react-native';
import Colors from './constants/colors';
import LoginScreen from './screens/LoginScreen';
import AddProductsScreen from './screens/AddProductsScreen';
import {
	NavigationContainer,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import FavProductsScreen from './screens/FavProductsScreen';
import FormScreen from './screens/FormScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import MenuPanel from './components/MenuPanel';

export default function App() {
	const [userPhoneNumber, setUserPhoneNumber] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const Tab = createBottomTabNavigator();

	function logoutHandle() {
		setUserPhoneNumber('');
		setIsAuthenticated(false);
	}

	const LogoutComponent = () => {
		return null;
	};

	const styles = StyleSheet.create({
		screen: {
			flex: 1,
			backgroundColor: isAuthenticated ? Colors.white : Colors.accent500,
		},
	});

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchData() {
		setIsLoading(true);
		const response = await fetch('http://localhost:5170/api/Products', {
			method: 'GET',
			headers: {
				accept: 'text/plain',
			},
		});

		if (response.ok) {
			const data = await response.json();
			setData(data);
			console.log(data);
		} else {
			console.log('Problem:', response.status);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<SafeAreaView style={styles.screen}>
			{isAuthenticated ? (
				<>
					<NavigationContainer>
						<Tab.Navigator
							screenOptions={{
								tabBarActiveTintColor:
									Platform.OS === 'android'
										? Colors.shadowBlack
										: Colors.accent500,
								headerStyle: {
									borderBottomWidth: 1,
								},
								tabBarStyle: {},
							}}
							initialRouteName='AddProductsScreen'
							tabBar={() => <MenuPanel onLogout={logoutHandle}></MenuPanel>}
						>
							<Tab.Screen
								options={{
									title: 'Your Forms',
									headerTitleAlign: 'center',
								}}
								name='favouriteProducts'
								children={() => <FavProductsScreen productsList={data} />}
							/>
							<Tab.Screen
								options={{
									headerShown: false,
									tabBarLabel: 'Add products',
									tabBarIcon: ({ color, size }) => (
										<AntDesign name='plus' size={size} color={color} />
									),
								}}
								name='AddProductsScreen'
								children={() => (
									<AddProductsScreen
										productsList={data}
										isLoading={isLoading}
									/>
								)}
							/>
							<Tab.Screen
								accessibilityRole='button'
								name='Logout'
								component={LogoutComponent}
								options={{
									tabBarButton: () => (
										<TouchableOpacity
											accessibilityRole='button'
											onPress={logoutHandle}
											style={{
												flex: 1,
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: 9,
												marginBottom: 0,
											}}
										>
											<AntDesign name='logout' size={20} color={'gray'} />
											<Text style={{ color: 'gray', fontSize: 11 }}>
												Logout
											</Text>
										</TouchableOpacity>
									),
								}}
							/>
							<Tab.Screen
								options={{
									title: 'Form',
									headerTitleAlign: 'center',
								}}
								name='formScreen'
								component={FormScreen}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				</>
			) : (
				<LoginScreen
					userPhoneNumber={userPhoneNumber}
					setUserPhoneNumber={setUserPhoneNumber}
					setIsAuthenticated={setIsAuthenticated}
				/>
			)}
			<StatusBar style='dark' />
		</SafeAreaView>
	);
}
