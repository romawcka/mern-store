import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ListGroupItem, Loader } from '../../components';
import {
  useGetPayClientIdQuery,
  usePayOrderMutation,
} from '../../slices/ordersApiSlice';

const RigthBox = ({ orderData, refetch, orderId }) => {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = orderData;

  const [payOrder, { isLoading: isLoadingPayment }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: payPal,
    isLoading: isLoadingPaypal,
    error: errorPayPal,
  } = useGetPayClientIdQuery();

  const onApprove = (data, actions) => {
    // trigger paypal
    return actions.order.capture().then(async (details) => {
      try {
        // simply run a fn
        await payOrder({ orderId, details });
        // to update window with new info
        refetch();
        toast.success('Payment was successfull');
      } catch (error) {
        console.log(error);
        toast.error('Payment was failed');
      }
    });
  };
  const onApproveTestPay = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment was successfull');
  };

  const onError = (error) => {
    toast.error(error?.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderData.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => orderId);
  };

  useEffect(() => {
    if (!errorPayPal && !isLoadingPaypal && payPal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': payPal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (orderData && !orderData.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, isLoadingPaypal, payPal, orderData, paypalDispatch]);

  return (
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Order Summary</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroupItem type={itemsPrice} title={'Items'} />
            <ListGroupItem type={shippingPrice} title={'Shipping'} />
            <ListGroupItem type={taxPrice} title={'Tax'} />
            <ListGroupItem type={totalPrice} title={'Total'} />
          </ListGroup.Item>

          {!orderData.isPaid && (
            <ListGroup.Item>
              {isLoadingPayment && <Loader />}

              {isPending ? (
                <Loader />
              ) : (
                <div>
                  <Button
                    onClick={onApproveTestPay}
                    style={{ marginBottom: '10px' }}
                  >
                    Test Pay Order
                  </Button>
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                </div>
              )}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default RigthBox;
