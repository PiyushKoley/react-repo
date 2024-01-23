import React from "react";

// HERE WE ARE CREATING THE CONTEXT AND EXPORTING IT ...
// SO WE CAN USE IT ANY WHERE WE NEED...
// ****** we have use this in UserContextProvider.jsx , to give access to any field of that component..*****

const UserContext = React.createContext();

export default UserContext;