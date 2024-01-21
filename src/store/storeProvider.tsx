// import React, { createContext, useContext } from 'react';
// import { store$ } from './store';

// const StoreContext = createContext({});

// // we can wrap the APP with this store provider.
// export const StoreProvider = ({ children }:(any)) => {
//     return (
//         <StoreContext.Provider value={store$}>
//             {children}
//         </StoreContext.Provider>
//     );
// };

// export const useStoreContext = () => {
//     const context = useContext(StoreContext);

//     if (!context) {
//         throw new Error('useStoreContext must be used within a StoreProvider');
//     }

//     return context;
// };
