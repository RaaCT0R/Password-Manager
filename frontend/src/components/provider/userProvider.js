import React from "react";

export const UserContext  = React.createContext(false)
export const USER_DEFAULT = {
    partyId: null,
}

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(USER_DEFAULT)

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};
export default UserProvider;
