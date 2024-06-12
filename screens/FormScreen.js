import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import Colors from '../constants/colors';
import Button from '../components/Button';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { API_KEY } from '../util/http';
import { useDispatch } from 'react-redux';
import { fetchReviews } from '../redux/reviewsSlice';
import { fetchProducts } from '../redux/productsSlice';

function FormScreen({ userPhoneNumber }) {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const navigation = useNavigation();
	const { params } = useRoute();
	const { image, name } = params.item;
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		navigation.setOptions({ title: name });
	}, [navigation, name]);

	const handleReview = (text) => {
		setReview(text);
	};
	const handleSubmit = () => {
		if (rating !== 0 && review !== '') {
			sendForm();
		}
	};

	async function sendForm() {
		const response = await fetch(`${API_KEY}/api/Reviews/AddReview`, {
			method: 'POST',
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				phoneNumber: userPhoneNumber,
				points: rating,
				text: review,
				productID: params.item.id,
			}),
		});
		const data = await response.text();
		console.log(data);
		dispatch(fetchProducts());
		dispatch(fetchReviews(userPhoneNumber));
		navigation.navigate('AddProductsScreen')
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.formContainer}>
				<View style={styles.productInfoContainer}>
					<Image style={styles.productImage} source={{ uri: image }} />
				</View>
				<View style={styles.feedbackContainer}>
					<Text
						style={{
							textAlign: 'left',
							fontSize: 28,
							fontWeight: 'bold',
							marginBottom: 16,
						}}
					>
						Share your feedback
					</Text>
					<Text
						style={{
							textAlign: 'left',
							fontSize: 18,
							fontWeight: 'bold',
							marginBottom: 8,
						}}
					>
						Rate your experience
					</Text>
					<StarRating
						rating={rating}
						onChange={setRating}
						enableHalfStar={false}
						starSize={36}
						style={{ alignSelf: 'center', marginBottom: 16 }}
					/>
					<Text
						style={{
							textAlign: 'left',
							fontSize: 18,
							fontWeight: 'bold',
							marginBottom: 8,
						}}
					>
						Comment
					</Text>
					<TextInput
						style={styles.commentInput}
						onChangeText={handleReview}
						value={review}
						multiline={true}
					/>

					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button onPress={handleSubmit}>Send</Button>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default FormScreen;

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
	feedbackContainer: {
		flex: 1,
		padding: 20,
		gap: 10,
	},
	commentInput: {
		width: '100%',
		fontSize: 18,
		borderRadius: 18,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
	},
});
