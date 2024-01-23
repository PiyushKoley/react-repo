import React from 'react';
import UserContext from './UserContext';


//******* THIS COMPONENT IS USED AS STORE AND CAN BE ACCESSED ANY WHERE *******

function UserContextProvider({children}) {

    const [user,setUser] = React.useState(null);

  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider; 