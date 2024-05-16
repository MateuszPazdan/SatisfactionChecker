import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProductItem({ item, readyIn, opinion }) {
	const navigation = useNavigation();

	const { image, name } = item;

	function pressHandler() {
		if (!opinion) navigation.navigate('formScreen', { item: item });
		if (opinion && item)
			navigation.navigate('yourRateScreen', { item: item, opinion: opinion });
	}

	return (
		<View style={styles.itemOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [styles.itemContainer, styles.pressed]
						: [styles.itemContainer, readyIn > 0 && styles.pressed]
				}
				android_ripple={{ color: Colors.whiteHover }}
				onPress={readyIn == 0 || readyIn == null ? pressHandler : null}
			>
				<Image style={styles.image} source={{ uri: image }} />
				<Text style={styles.itemText}>{name}</Text>
				<View style={styles.iconContainer}>
					{!opinion ? (
						<AntDesign name='form' size={24} color='black' />
					) : (
						<View style={styles.starContainer}>
							<Text style={styles.starText}>{opinion?.points}</Text>
							<AntDesign name='staro' size={28} color={Colors.accent500} />
						</View>
					)}
				</View>
			</Pressable>
		</View>
	);
}

export default ProductItem;

const styles = StyleSheet.create({
	itemOuterContainer: {
		position: 'relative',
	},

	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: 20,
		paddingVertical: 4,
		paddingHorizontal: 4,
		marginHorizontal: 8,
		marginBottom: 16,
		shadowRadius: 1,
		shadowOffset: { height: 1, width: 1 },
		shadowOpacity: 0.2,
		elevation: 2,
	},
	containerShadow: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
		zIndex: 100,
		opacity: 0.2,
	},
	image: {
		borderRadius: 18,
		width: 64,
		height: 64,
		borderWidth: 2,
		borderColor: Colors.accent500,
	},
	itemText: {
		marginHorizontal: 16,
		flex: 1,
		textAlign: 'left',
		fontSize: 16,
	},
	iconContainer: {
		fontSize: 24,
		paddingHorizontal: 14,
	},
	starContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	starText: { fontSize: 20 },
	pressed: { backgroundColor: Colors.whiteHover },
	counterContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	counterStyle: {
		fontSize: 12,
	},
});

// {readyIn > 0 ? (
// 	<View style={styles.counterContainer}>
// 		<View>
// 			<Ionicons name='timer-outline' size={24} color='black' />
// 		</View>
// 		<View>
// 			<Text style={styles.counterStyle}>
// 				{readyIn > 1 ? `${readyIn} Days` : `${readyIn} Day`}
// 			</Text>
// 		</View>
// 	</View>
// ) : (
// 	// <AntDesign name='form' size={24} color='black' />
// )}
