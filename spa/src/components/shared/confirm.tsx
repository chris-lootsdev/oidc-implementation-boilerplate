import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default (props: {
    title: string,
    content: string,
    onClose: any,
    dialogProps?: DialogProps,
}) => {
    
    const { title, content, onClose, dialogProps } = props;

    const validDiaplogProps = dialogProps ?? {
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        maxWidth:'sm',
        fullWidth: false,
        'aria-labelledby': 'confirmation-dialog-title',
        open: false,
    };

    return (
        <Dialog {...validDiaplogProps}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => onClose()} color='secondary'>No</Button>
                <Button onClick={(value) => onClose(value)} color='primary'>Yes</Button>
            </DialogActions>
        </Dialog>
    );
};
