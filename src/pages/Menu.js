import {Container, Row, Col, Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom';
import React, {useState, useEffect, useMemo} from 'react';
import {fetchPlace} from '../apis';
import {IoCloseOutline} from 'react-icons/io5'
import styled from 'styled-components';

import MenuList from '../components/MenuList';
import ShoppingCart from '../components/ShoppingCart';
import TipJar from '../components/TipJar';

const OrderButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.2);
  width: 60px;
  height: 60px;
`;

const TipButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.2);
  width: 75px;
  height: 75px;
`;

const Menu = () => {
    const [place, setPlace] = useState({});
    const [cart, setCart] = useState({});
    const [showCart, setShowCart] = useState(false);
    const [showTip, setShowTip] = useState(false);

    const params = useParams();

    const onFetchPlace = async () => {
        const json = await fetchPlace(params.id);
        if (json) {
            setPlace(json);
        }
    };

    const onAddItemToCart = (item) => {
        setCart({
            ...cart,
            [item.id]: {
                ...item,
                quantity: (cart[item.id]?.quantity || 0) + 1,
            }
        });
    }

    const onRemoveItemFromCart = (item) => {
        if (totalQuantity === 1) {
            setShowCart(false);
        }
        setCart({
            ...cart,
            [item.id]: {
                ...item,
                quantity: (cart[item.id]?.quantity || 0) - 1,
            }
        });
    }

    const onPaymentDone = () => {
        setCart({});
        setShowCart(false);
    }

    const totalQuantity = useMemo(
        () => Object.keys(cart)
                .map((i) => cart[i].quantity)
                .reduce((a,b) => a+b, 0),
          [cart]
    );

    useEffect(() => {
        onFetchPlace();
    }, []);

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    {/* {showCart ? (
                        <ShoppingCart items={Object.keys(cart).map((key) => cart[key]).filter((item) => item.quantity > 0)} onAdd={onAddItemToCart} onRemove={onRemoveItemFromCart} onPaymentDone={onPaymentDone} />
                    ) : (
                        <MenuList place={place} cart={cart} onAdd={onAddItemToCart} />
                    )} */}

                    {showTip ? (
                        <TipJar items={Object.keys(cart).map((key) => cart[key]).filter((item) => item.quantity > 0)} onAdd={onAddItemToCart} onRemove={onRemoveItemFromCart} onPaymentDone={onPaymentDone} />
                    ) : (
                        
                        <MenuList place={place} cart={cart} onAdd={onAddItemToCart} /> 
                    )}
                    {/** TODO: can add onVote here too */}
                </Col>
            </Row>
            {/* {totalQuantity? (
                <OrderButton variant="standard" onClick={() => setShowCart(!showCart)}>
                    {showCart ? <IoCloseOutline size={25} /> : totalQuantity}
                </OrderButton>
            ) : <TipButton variant="standard" onClick={() => setShowCart(!showTip)}>
                    {showTip ? <IoCloseOutline size={25} /> : "Leave tip?"}
                </TipButton>} */}
            {/* {showTip? (
                <OrderButton variant="standard" onClick={() => setShowTip(!showTip)}>
                    {showTip ? <IoCloseOutline size={25} /> : totalQuantity}
                </OrderButton>
            ) : <TipButton variant="standard" onClick={() => setShowTip(!showTip)}>
                    {showTip ? <IoCloseOutline size={25} /> : "Leave tip?"}
                </TipButton>} */}
        </Container>
    )
};

export default Menu;