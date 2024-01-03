import colors from 'tailwindcss/colors';

/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';

import ScaleLoader from 'react-spinners/ScaleLoader';

interface Props {
    class?: string;
}

export function AppLoader(props: Props) {
    return ScaleLoader({
        className: props.class,
        color: colors.blue['300'],
        style: { display: 'block' },
    });
}

export const QLoader = qwikify$(AppLoader, { eagerness: 'visible' });