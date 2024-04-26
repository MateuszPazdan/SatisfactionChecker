import {
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';
import Colors from '../constants/colors';
import ProductsList from '../components/ProductsList';

// const products = [
// 	{
// 		id: 1,
// 		title: 'Smartwatch',
// 		imageLink: 'https://source.unsplash.com/600x400/?smartwatch',
// 	},
// 	{
// 		id: 2,
// 		title: 'Desk Chair',
// 		imageLink: 'https://source.unsplash.com/600x400/?desk-chair',
// 	},
// 	{
// 		id: 3,
// 		title: 'Bluetooth Speaker',
// 		imageLink: 'https://source.unsplash.com/600x400/?bluetooth-speaker',
// 	},
// 	{
// 		id: 4,
// 		title: 'Backpack',
// 		imageLink: 'https://source.unsplash.com/600x400/?backpack',
// 	},
// 	{
// 		id: 5,
// 		title: 'Coffee Maker',
// 		imageLink: 'https://source.unsplash.com/600x400/?coffee-maker',
// 	},
// 	{
// 		id: 6,
// 		title: 'Yoga Mat',
// 		imageLink: 'https://source.unsplash.com/600x400/?yoga-mat',
// 	},
// 	{
// 		id: 7,
// 		title: 'Running Shoes',
// 		imageLink: 'https://source.unsplash.com/600x400/?running-shoes',
// 	},
// 	{
// 		id: 8,
// 		title: 'Sunglasses',
// 		imageLink: 'https://source.unsplash.com/600x400/?sunglasses',
// 	},
// 	{
// 		id: 9,
// 		title: 'Portable Charger',
// 		imageLink: 'https://source.unsplash.com/600x400/?portable-charger',
// 	},
// 	{
// 		id: 10,
// 		title: 'Digital Camera',
// 		imageLink: 'https://source.unsplash.com/600x400/?digital-camera',
// 	},
// 	{
// 		id: 11,
// 		title: 'Headphones',
// 		imageLink: 'https://source.unsplash.com/600x400/?headphones',
// 	},
// 	{
// 		id: 12,
// 		title: 'Dumbbell Set',
// 		imageLink: 'https://source.unsplash.com/600x400/?dumbbell-set',
// 	},
// 	{
// 		id: 13,
// 		title: 'Travel Mug',
// 		imageLink: 'https://source.unsplash.com/600x400/?travel-mug',
// 	},
// 	{
// 		id: 14,
// 		title: 'Gaming Console',
// 		imageLink: 'https://source.unsplash.com/600x400/?gaming-console',
// 	},
// 	{
// 		id: 15,
// 		title: 'Kindle E-reader',
// 		imageLink: 'https://source.unsplash.com/600x400/?kindle-e-reader',
// 	},
// 	{
// 		id: 16,
// 		title: 'Drone',
// 		imageLink: 'https://source.unsplash.com/600x400/?drone',
// 	},
// 	{
// 		id: 17,
// 		title: 'External Hard Drive',
// 		imageLink: 'https://source.unsplash.com/600x400/?external-hard-drive',
// 	},
// 	{
// 		id: 18,
// 		title: 'Graphic Tablet',
// 		imageLink: 'https://source.unsplash.com/600x400/?graphic-tablet',
// 	},
// 	{
// 		id: 19,
// 		title: 'Portable Projector',
// 		imageLink: 'https://source.unsplash.com/600x400/?portable-projector',
// 	},
// 	{
// 		id: 20,
// 		title: 'Instant Pot',
// 		imageLink: 'https://source.unsplash.com/600x400/?instant-pot',
// 	},
// ];

function AddProductsScreen({productsList, isLoading}) {
	

	return <ProductsList items={productsList} isLoading={isLoading} />;
}

export default AddProductsScreen;
