import React from 'react';
import _ from 'lodash';
import { clients } from '../../../src/oidc/clients';
import openImg from '../assets/rect-light.svg';

export default () => {
    const clientIds = _.map(clients, o => o.client_id);

    return <div>
        <img
            style={{ position: 'absolute', top: 0, left: 0, height: '100vh', zIndex: -100, width: '100%' }}
            src={openImg}
        />

        Please select a client to login with:
        {clientIds.map((id, key) => {
            return <div key={key}>{id}</div>
        })}
    </div>
}