import { useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	Pressable,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import Colors from '../constants/colors';
import { API_KEY } from '../util/http';

function LoginScreen({
	userPhoneNumber,
	setUserPhoneNumber,
	setIsAuthenticated,
}) {
	const [phoneNumber, setPhoneNumber] = useState();
	const [smsCode, setSmsCode] = useState();
	const [verificationCode, setVerificationCode] = useState();
	const [error, setError] = useState('');

	function confirmHandle() {
		setPhoneNumber('');
		setVerificationCode('');
		if (userPhoneNumber) {
			if (smsCode === verificationCode) {
				setIsAuthenticated(true);
				setError('');
			} else {
				setError('Incorrect Code');
			}
		} else {
			setUserPhoneNumber(phoneNumber);
			getCode();
		}
	}

	function cancelHandler() {
		setUserPhoneNumber('');
		setError('');
	}

	async function getCode() {
		const response = await fetch(
			`${API_KEY}/api/MFA/sendMFA?phoneNumber=${phoneNumber}`,
			{
				method: 'POST',
			}
		);
		const data = await response.json();
		setSmsCode(data.code);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.textInputContainer}>
				<View style={styles.logoContainer}>
					<Image
						source={require('../assets/images/LogoBlack.png')}
						style={styles.logoImage}
					/>
					<Text style={styles.logoText}>Satisfaction Checker</Text>
				</View>
				{!userPhoneNumber ? (
					<TextInputComponent
						placeholder='Phone Number'
						autoCorrect={false}
						inputMode='tel'
						onChangeText={setPhoneNumber}
						value={phoneNumber}
					/>
				) : (
					<>
						<View style={styles.inputContainer}>
							<TextInputComponent
								placeholder='Code'
								autoCorrect={false}
								keyboardType='number-pad'
								value={verificationCode}
								onChangeText={setVerificationCode}
							/>
							{error && userPhoneNumber && (
								<Text style={styles.errorText}>{error}</Text>
							)}
						</View>
					</>
				)}
				<View style={styles.btnContainer}>
					{userPhoneNumber && <Button onPress={cancelHandler}>Cancel</Button>}
					<Button onPress={confirmHandle}>Log in</Button>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	root: { flex: 1 },
	textInputContainer: {
		flex: 1,
		marginTop: 50,
		flexDirection: 'column',
		alignItems: 'center',
		gap: 32,
	},
	logoContainer: { marginBottom: 25 },

	logoImage: {
		width: 170,
		height: 170,
		shadowColor: Colors.shadowWhite,
		shadowOffset: { height: 2, width: 0 },
		shadowRadius: 2,
		shadowOpacity: 0.25,
	},
	logoText: { textAlign: 'center', fontSize: 16 },
	codeText: {
		fontSize: 16,
		color: Colors.shadowBlack,
	},
	btnContainer: {
		flexDirection: 'row',
	},
	inputContainer: {
		position: 'relative',
		width: '100%',
		alignItems: 'center',
	},
	errorText: {
		position: 'absolute',
		bottom: -25,
		left: 60,
		color: 'red',
		fontSize: 16,
	},
});
