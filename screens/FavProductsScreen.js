import ProductsList from '../components/ProductsList';

const favProducts = [
	{
		id: 1,
		title: 'Smartwatch',
		imageLink: 'https://source.unsplash.com/600x400/?smartwatch',
		readyIn: 1,
	},
	{
		id: 2,
		title: 'Desk Chair',
		imageLink: 'https://source.unsplash.com/600x400/?desk-chair',
		readyIn: 0,
	},
	{
		id: 3,
		title: 'Bluetooth Speaker',
		imageLink: 'https://source.unsplash.com/600x400/?bluetooth-speaker',
		readyIn: 3,
	},
];

function FavProductsScreen() {
	return <ProductsList items={favProducts} />;
}

export default FavProductsScreen;
