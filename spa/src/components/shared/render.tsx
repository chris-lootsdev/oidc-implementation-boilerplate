import React from 'react';

export default (props: {
    allowed: boolean,
    Children: React.ComponentType<any>
}) => {
    
    const {allowed, Children} = props;
    
    return (
        !allowed ?
            <></> :
            <Children />
    );
}
