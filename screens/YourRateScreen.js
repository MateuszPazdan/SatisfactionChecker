import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors';
import { Keyboard } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

function YourRateScreen() {
	const navigation = useNavigation();
	const { params } = useRoute();
	const { image, name } = params.item;
	const { points, text } = params.opinion;

	useLayoutEffect(() => {
		navigation.setOptions({ title: name });
	}, [navigation, name]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.formContainer}>
				<View style={styles.productInfoContainer}>
					<Image style={styles.productImage} source={{ uri: image }} />
					<View style={{ width: '100%' }}>
						<Text
							style={{
								textAlign: 'left',
								fontSize: 24,
								fontWeight: 'bold',
								marginBottom: 8,
							}}
						>
							Your rate
						</Text>
						<StarRating
							rating={points}
							starSize={36}
							style={{ alignSelf: 'center', marginBottom: 16 }}
							enableSwiping={false}
							onChange={() => {}}
						/>
						<Text
							style={{
								textAlign: 'left',
								fontSize: 24,
								fontWeight: 'bold',
								marginBottom: 8,
							}}
						>
							Your comment
						</Text>
						<Text style={{ fontSize: 18 }}>{text}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default YourRateScreen;

const styles = StyleSheet.create({
	formContainer: { flex: 1 },
	productInfoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
		padding: 10,
		marginTop: 25,
		marginBottom: 15,
	},
	productImage: {
		borderRadius: 18,
		width: '40%',
		minWidth: 64,
		aspectRatio: 1,
		borderWidth: 2,
		borderColor: Colors.accent500,
	},
	productText: {
		fontSize: 24,
	},
});
