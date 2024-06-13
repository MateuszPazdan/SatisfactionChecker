import { useEffect, useState } from 'react';
import {
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import ProductItem from './ProductItem';
import Colors from '../constants/colors';

function ProductsList({ items, isLoading, opinionsList }) {
	const [inputData, setInputData] = useState('');
	const [choosenProducts, setChoosenProducts] = useState(items);

	useEffect(() => {
		const filtredProducts = items?.filter((product) =>
			product.name.toLowerCase().includes(inputData.toLowerCase())
		);
		setChoosenProducts(filtredProducts);
	}, [inputData, items]);

	return (
		<View style={styles.listContainer}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setInputData}
					placeholder='Search'
				/>
			</View>
			<View style={styles.flatListContainer}>
				{!isLoading ? (
					<FlatList
						data={choosenProducts}
						renderItem={({ item }) => (
							<ProductItem
								item={item}
								opinion={opinionsList?.find(
									(opinion) => opinion.productId === item.id
								)}
							></ProductItem>
						)}
						ListEmptyComponent={
							<Text style={{ textAlign: 'center', fontSize: 18 }}>
								No items found
							</Text>
						}
						keyExtractor={(item) => item.id}
						style={styles.flatList}
						contentContainerStyle={{ paddingBottom: 24 }}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
						Loading...
					</Text>
				)}
			</View>
		</View>
	);
}

export default ProductsList;

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		alignItems: 'center',
	},
	inputContainer: {
		alignItems: 'center',
		width: '100%',
		paddingTop: 25,
	},
	input: {
		backgroundColor: Colors.white,
		padding: 10,
		fontSize: 16,
		width: '80%',
		borderRadius: 16,
		shadowRadius: 1,
		shadowOffset: { height: 1, width: 0 },
		shadowOpacity: 0.2,
		elevation: 2,
	},
	flatListContainer: {
		flex: 1,
		marginHorizontal: 'auto',
		width: '80%',
		zIndex: -1,
	},
	flatList: {
		paddingVertical: 15,
	},
});
