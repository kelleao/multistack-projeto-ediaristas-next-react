import React from 'react';
// import { } from '@mui/material';
import { BreadcrumContainer, BreadcrumbItem } from './Breadcrumd.style';

export interface BreadcrumdProps {
    selected: string;
    items: string[];
}

const Breadcrumd: React.FC<BreadcrumdProps> = ({
    selected, items
}) => {
    return (
        <BreadcrumContainer>
            {items.map((item, index) => (
                <React.Fragment key={item}>
                    <BreadcrumbItem isSelected={selected === item}>
                        {item}
                    </BreadcrumbItem>
                    {index !== items.length - 1 && <span> &gt; </span>}
                </React.Fragment>
            ))}
        </BreadcrumContainer>
    );
}

export default Breadcrumd;