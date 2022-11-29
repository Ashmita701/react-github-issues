import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

export function UserDetails({ userImage, userName }) {

    return (
        <figure>
            {userImage ? <img src={userImage} alt={`${userName}-avatar`} /> :
                <AiOutlineUser />}
            <figcaption>
                {userName}
            </figcaption>
        </figure>
    );
}