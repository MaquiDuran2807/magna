import React from 'react';
import { Helmet } from 'react-helmet-async'
import ProductItem from '../components/ProductItem';
import { useParams } from 'react-router-dom';
import { useSearchProductsQuery} from '../hooks/productHooks';

const SearchPageStr: React.FC = () => {

    // tomar el parámetro de búsqueda de la URL y pasarlo a la función de búsqueda
    const {search}= useParams();
    console.log('id', search);
    if (!search) {
        return <div>Category not found</div>
    }

    const { data: products, isLoading, isError } =useSearchProductsQuery (search);
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
                <h1 className='mt-2 mb-5'>Resulatados de la busquedade : {search}</h1>
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

export default SearchPageStr;