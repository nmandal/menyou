import {AiOutlineLink} from 'react-icons/ai';
import {Button} from 'react-bootstrap';
import QRCodeReact from 'qrcode.react';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {useReactToPrint} from 'react-to-print';

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  > div {
      margin: auto;
  }
`;

const ComponentToPrint = styled.div`
  text-align: center;
  margin-top: 200px;
  h1 {
      font-size: 100px;
      font-weight: bold;
      margin-bottom: 50px;
  }
  h2 {
      font-size: 60px;
      margin-bottom: 100px;
  }
`;

const QRCode = ({table, placeId, placeName}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const url = `${window.location.origin}/menu/${placeId}/${table}`;

    return (
        <Container>
            <QRCodeReact value={url} size={200} />
            <Overlay>
                <div className="d-flex">
                    <Button variant="standard" onClick={handlePrint} className="mr-2">
                        {`Get Code`}
                    </Button>
                    <Button variant="standard" href={`/menu/${placeId}/${table}`} target="_blank" className="mr-2">
                        <AiOutlineLink size={25} />
                    </Button>
                </div>
            </Overlay>
            <div style={{ display: "none" }}>
                <ComponentToPrint ref={componentRef}>
                    <h1>{placeName} MenYou</h1>
                    <h3>https://menyou.eatblynd.com{`/menu/${placeId}/${table}`}</h3>
                    <br />
                    <br />
                    <QRCodeReact value={url} size={500} />
                </ComponentToPrint>
            </div>
        </Container>
    )
}

export default QRCode;