import React from 'react';
import { calcTimeAgo } from '../utils/helperFunctions';

export function TimeAgo({ time }) {

    return (
        <p>{calcTimeAgo(time)}</p>
    );
}