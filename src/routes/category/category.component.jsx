import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

import { Title, CategoryContainer } from "./category.styles";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  console.log("render/re-rendering category component");

  useEffect(() => {
    console.log("useEffect in category component");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map(
            (
              product // here, add a safeguard
            ) => <ProductCard key={product.id} product={product} />
          )}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
