import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
    const navigate = useNavigate();
    return (
        <div className="warp-breadcrumb" data-testid="breadcrumb">
            <Breadcrumb>
                {items?.map((item, index) => (
                    item.url !== "" ? (
                        <Breadcrumb.Item
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(item.url);
                            }}
                            href={item.url}
                        >
                            {item.title}
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={index} active>
                            {item.title}
                        </Breadcrumb.Item>
                    )
                ))}
            </Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;
