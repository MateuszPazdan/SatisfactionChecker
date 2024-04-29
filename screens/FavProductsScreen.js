import { useEffect } from 'react';
import ProductsList from '../components/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { fetchReviews } from '../redux/reviewsSlice';

function FavProductsScreen({ userPhoneNumber }) {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const reviews = useSelector((state) => state.reviews);

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchReviews(userPhoneNumber));
	}, []);

	let fav = [];

	if (Array.isArray(products?.data) && Array.isArray(reviews?.data)) {
		fav = products.data.filter((product) =>
			reviews.data.find((opinion) => opinion.productID === product.id)
		);
	}

	return (
		<ProductsList
			items={fav}
			opinionsList={reviews?.data}
			isLoading={reviews.isLoading}
		/>
	);
}

export default FavProductsScreen;
