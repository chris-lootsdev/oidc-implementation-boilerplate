import React, { useState } from 'react';

export default (props: {
    ActiveComponent:  React.ComponentType<any>,
    InactiveComponent: React.ComponentType<any>,
    defaultActive?: boolean,
}) => {
    const {
        ActiveComponent,
        InactiveComponent,
        defaultActive,
    } = props;

    const [active, setActive] = useState(defaultActive ? defaultActive : false);

    const toggleMe = () => {
        setActive(!active);
    }

    return (
        active ?
            <ActiveComponent toggle={toggleMe} /> :
            <InactiveComponent toggle={toggleMe} />
    );
}
