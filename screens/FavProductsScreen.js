import { useEffect, useState } from 'react';
import ProductsList from '../components/ProductsList';

const favProducts = [
	{
		id: 1,
		name: 'Smartwatch',
		image: 'https://source.unsplash.com/600x400/?smartwatch',
	},
	{
		id: 2,
		name: 'Desk Chair',
		image: 'https://source.unsplash.com/600x400/?desk-chair',
	},
	{
		id: 3,
		name: 'Bluetooth Speaker',
		image: 'https://source.unsplash.com/600x400/?bluetooth-speaker',
	},
];

function FavProductsScreen({ productsList }) {
	const [opinionsList, setOpinionsList] = useState(null);
	const [favProductsList, setFavProductsList] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const phoneNumber = '733949591';

	async function fetchData() {
		setIsLoading(true);
		const response = await fetch(
			`http://localhost:5170/api/Reviews/ByPhoneNumber?phoneNumber=${phoneNumber}`,
			{
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			}
		);

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			setOpinionsList(data);
		} else {
			console.log('Problem:', response.status);
		}
		setIsLoading(false);
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setFavProductsList(
			productsList?.filter((product) =>
				opinionsList?.find((opinion) => opinion.productID === product.id)
			)
		);
	}, [productsList, opinionsList, setFavProductsList]);

	console.log(favProductsList);

	return <ProductsList items={favProductsList} isLoading={isLoading} />;
}

export default FavProductsScreen;
