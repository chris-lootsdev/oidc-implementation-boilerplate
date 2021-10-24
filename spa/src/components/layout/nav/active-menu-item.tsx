import React from 'react';
import _ from 'lodash';
// import { ClientMetadata } from 'oidc-provider';
import { clients } from '../../../../../src/oidc/clients';
// import { claims } from '../../../../../../src/oidc/claims';
// import { jwks } from '../../../../../../src/oidc/jwks';
// import menuItemsHook from '../menu-items-hook';
import CollapseTable from './collapse-table';

export default () => {
	const stickyProperties = ['client_id'];

	const rows = _.map(clients, (client) => ({
		headlines: _.pick(client, stickyProperties),
		details: _.omit(client, stickyProperties),
	}));

	return <CollapseTable stickyColumnNames={stickyProperties} rows={rows} />;
};
