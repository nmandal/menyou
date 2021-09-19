import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const Place = styled.div`
  text-align: center;
  img {
      border-radius: 5px;
      margin-bottom: 20px;
  }
`;

const MenuList = ({place, cart, onAdd}) => {

    return (
        <>
        <Place>
            {/* Don't render image if there is none */}
            {place.image && (<img src={place.image} width={100} height={100} alt="Place logo" />)}
            <h3><b>{place.name}</b></h3>
            <p>{place.address}</p>
        </Place>
        {place?.categories
          ?.filter(
                  (category) => category.menu_items.filter((i) => i.is_available).length
                  )
                  .map((category) => (
                      <div key={category.id} className="mt-5">
                          <h4 className="mb-4">
                              <b>{category.name}</b>
                          </h4>
                          {category.menu_items
                            .filter((item) => item.is_available)
                        .map((item) => (
                            <MenuItem 
                              key={item.id} 
                              item={{
                                  ...item,
                                  quantity: cart[item.id]?.quantity,
                              }}
                              onAdd={onAdd}
                            />
                        ))}
                      </div>
                  ))
        }
        </>
    )
};

export default MenuList;