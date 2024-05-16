import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
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

function FormScreen() {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const { params } = useRoute();
	const { image, name } = params.item;

	const handleRating = (rating) => {
		setRating(rating);
	};

	const handleReview = (text) => {
		setReview(text);
	};
	const handleSubmit = () => {
		console.log('Ocena:', rating);
		console.log('Opinia:', review);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.formContainer}>
				<View style={styles.productInfoContainer}>
					<Image style={styles.productImage} source={{ uri: image }} />
					{/* <Text style={styles.productText}>{name}</Text> */}
				</View>
				<View style={styles.feedbackContainer}>
					<Text
						style={{
							textAlign: 'left',
							fontSize: 24,
							fontWeight: 'bold',
							marginBottom: 10,
						}}
					>
						Share your feedback
					</Text>
					<Text style={{ textAlign: 'left', fontSize: 18 }}>
						Rate your experience
					</Text>
					<StarRating
						rating={rating}
						onChange={setRating}
						enableHalfStar={false}
						starSize={36}
						style={{ alignSelf: 'center' }}
					/>
					<Text style={{ textAlign: 'left', fontSize: 18 }}>Comment</Text>
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
