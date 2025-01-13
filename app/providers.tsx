"use client"

import { store } from "./store/store"; // Adjust path as needed
import { Provider } from 'react-redux';

export default function Providers({ children}: { children: React.ReactNode}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
