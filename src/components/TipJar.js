import React, {useMemo} from 'react';
import {Card} from 'react-bootstrap';
import OperationButton from './OperationButton';
import PaymentForm from '../containers/PaymentForm';

const TipJar = ({items, onAdd, onRemove, onPaymentDone}) => {
    const totalPrice = useMemo(
        () => items.map((i) => i.quantity * i.price).reduce((a,b) => a+b, 0),
        [items]
    );

    // const totalTip = 

    return (
        <>
          <h3 className="text-center mb-4"><b>Tip Jar</b></h3>
          <Card>
              <Card.Body>
                  {items.map((item) => (
                      <div key={item.id} className="d-flex mb-4 align-items-center">
                          <div className="flex-grow-1">
                              <p className="mb-0"><b>{item.name}</b></p>
                              <span>${item.price}</span>
                          </div>
                          <div className="d-flex align-items-center">
                          <OperationButton
                            variant="lightgray"
                            size="sm"
                            onClick={() => onRemove(item)}
                          >-</OperationButton>
                              <span>{item.quantity}</span>
                          <OperationButton
                            variant="lightgray"
                            size="sm"
                            onClick={() => onAdd(item)}
                          >+</OperationButton>
                          </div>
                      </div>
                  ))}

                      <div className="d-flex mb-4 align-items-center">
                          <div className="flex-grow-1">
                              <p className="mb-0"><b>"YOLO"</b></p>
                          </div>
                          <div className="d-flex align-items-center">
                          <OperationButton
                            variant="lightgray"
                            size="sm"
                            // onClick={}
                          >-</OperationButton>
                              <span>20%</span>
                          <OperationButton
                            variant="lightgray"
                            size="sm"
                            // onClick={}
                          >+</OperationButton>
                          </div>
                      </div>

                  <hr />
                  <div className="d-flex justify-content-between">
                      <h5><b>Total</b></h5>
                      <h5><b>${totalPrice}</b></h5>
                  </div>
                  <hr className="mb-4" />
                  <PaymentForm amount={totalPrice} items={items} onDone={onPaymentDone} />
              </Card.Body>
          </Card>
        </>
    )
}

export default TipJar;