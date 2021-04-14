import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ItensIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';

import BrindeIcon from 'Icons/CustomIconBrinde';

export default ({
   value,
   onChange,
   qtBrindes
}) => (
    <Tabs
        value={value}
        onChange={onChange}
        centered
        textColor='primary'
    >
        <Tab
            label='Carrinho'
            value={1}
            icon={<ItensIcon/>}
        />
        <Tab
            label='Brindes'
            value={2}
            icon={
                <Badge
                    badgeContent={qtBrindes}
                    color='error'
                >
                    <BrindeIcon/>
                </Badge>
            }/>
    </Tabs>
);