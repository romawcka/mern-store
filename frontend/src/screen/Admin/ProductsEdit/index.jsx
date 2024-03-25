import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormContainer, FormGroup, Loader, Message } from '../../../components';
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from '../../../slices/productsApiSlice';

const ProductEdit = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  // @@desc --> receive currect product's data
  const {
    data: productData,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  // @@desc --> fn for updaing product
  const [updateProduct, { isLoading: isCreating, error: updateError }] =
    useUpdateProductMutation();

  const [uploadImage, { isLoading: isUploding }] = useUploadImageMutation();

  useEffect(() => {
    if (productData) {
      setData({
        name: productData.name,
        price: productData.price,
        image: productData.image,
        brand: productData.brand,
        category: productData.category,
        countInStock: productData.countInStock,
        description: productData.description,
      });
    }
  }, [productData]);

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId,
      name: data.name,
      price: data.price,
      image: data.image,
      brand: data.brand,
      category: data.category,
      countInStock: data.countInStock,
      description: data.description,
    };
    try {
      await updateProduct(updatedProduct).unwrap();
      toast.success('The product was successfully updated');
      navigate('/admin/productslist');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(formData);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setData({ ...data, image: res.image });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  const loading = isCreating || isLoading || isUploding;

  return (
    <>
      <Link to="/admin/productslist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {loading && <Loader />}
        {error ||
          (updateError && (
            <Message variant="danger">{error || updateError}</Message>
          ))}
        <Form onSubmit={sumbitHandler}>
          {/* name field */}
          <FormGroup
            label="Name"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {/* price field */}
          <FormGroup
            label="Price"
            type="number"
            value={data.price}
            placeholder="Enter price"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
          {/* image input placeholder */}
          {/* image field */}
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
            ></Form.Control>
            <Form.Control
              type="file"
              label="Choose file"
              onChange={uploadImageHandler}
            ></Form.Control>
          </Form.Group>
          {/* brand field */}
          <FormGroup
            label="Brand"
            value={data.brand}
            placeholder="Enter brand"
            onChange={(e) => setData({ ...data, brand: e.target.value })}
          />
          {/* count in stock field */}
          <FormGroup
            label="Count In Stock"
            type="number"
            value={data.countInStock}
            placeholder="Enter count in stock"
            onChange={(e) => setData({ ...data, countInStock: e.target.value })}
          />
          {/* category field */}
          <FormGroup
            label="Category"
            value={data.category}
            placeholder="Enter category"
            onChange={(e) => setData({ ...data, category: e.target.value })}
          />
          {/* description field */}
          <FormGroup
            label="Description"
            value={data.description}
            placeholder="Enter description"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEdit;
