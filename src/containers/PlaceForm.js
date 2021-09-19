import { Form, Button } from "react-bootstrap";
import React, {useState, useContext} from "react";

import {addPlace, addCategory} from '../apis';
import AuthContext from "../contexts/AuthContext";

import ImageDropzone from "./ImageDropzone";

const PlaceForm = ({onDone}) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [site, setSite] = useState("")
    const [image, setImage] = useState("")

    const auth = useContext(AuthContext);

    const onClick = async () => {
        const json = await addPlace({name, address, site, image}, auth.token);

        
        if (json) {
            setName("");
            setAddress("");
            setSite("");
            setImage("");
            ['Starters', 'Mains'].forEach(async d => {
                await addCategory({name: d, place: json.id}, auth.token);
            })
            onDone();
        }
    }

    return (
        <div>
            <h4 className="text-center">Place</h4>
            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Site</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter Site" 
                value={site} 
                onChange={(e) => setSite(e.target.value)} 
            />
            </Form.Group>
    
            <Form.Group>
            <Form.Label>Image (optional)</Form.Label>
            <ImageDropzone value={image} onChange={setImage} />
            </Form.Group>
    
            <Button variant="standard" block onClick={onClick}>
                Add
            </Button>
        </div>
    )
}



export default PlaceForm;