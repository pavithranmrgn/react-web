import React from 'react';
import { toast } from 'react-toastify';

export function MessageBox(message, type) {
    toast(message, { type: type, position: toast.POSITION.TOP_RIGHT });
}