import { useEffect } from 'react';
import ProductsList from '../components/ProductsList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';

function AddProductsScreen() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return <ProductsList items={products.data} isLoading={products.isLoading} />;
}

export default AddProductsScreen;
