import React from 'react';
import { Helmet } from 'react-helmet-async'
import ProductItem from '../components/ProductItem';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../hooks/productHooks';

const SearchPage: React.FC = () => {
    // Obtener el parámetro de búsqueda de la URL
    const searchParam = new URLSearchParams(window.location.search).get('search');
    console.log('searchParam', searchParam);
    // tomar el parámetro de búsqueda de la URL y pasarlo a la función de búsqueda
    const {categoria}= useParams();
    console.log('id', categoria);
    if (!categoria) {
        return <div>Category not found</div>
    }

    const { data: products, isLoading, isError } = useGetProductsByCategoryQuery(categoria);
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error</div>
    }
    if (!products) {
        return <div>Products not found</div>
    }

    return (
        <>
            <Helmet>
                <title>Search Page</title>
            </Helmet>
            <div>
                <h1>Search Results for: {products[0].category.name}</h1>
                {/* Llamar al componente ProductItem aquí */}
                <div className="row">
                {  
                    products.map((product) => (
                        <div className='col-lg-3 col-md-4 col-sm-6'>
                            <ProductItem key={product.id} product={product} />
                        </div>
                        
                    ))
                }
                </div>
                
            </div>
        </>
    );
};

export default SearchPage;