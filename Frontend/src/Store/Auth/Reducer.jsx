import { 
    FIND_USER_BY_ID_SUCCESS,
    FOLLOW_USER_SUCCESS,
    GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, 
    LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, 
    LOGOUT, 
    REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, 
    UPDATE_USER_FAILURE, 
    UPDATE_USER_SUCCESS
  } from "./ActionType";
  
  const initialState = {  // ✅ Fixed typo
    user: null,
    loading: false,
    error: null,
    jwt: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
      case REGISTER_USER_REQUEST:
      case GET_USER_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          error: null, 
          jwt: action.payload, 
          user: action.payload?.user || null // ✅ Store user info if available
        };
  
      case GET_USER_PROFILE_SUCCESS:
        return { ...state, loading: false, error: null, user: action.payload };
  

        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload ,upadteUser:true};
      
        case FIND_USER_BY_ID_SUCCESS:
        
            return { ...state, loading: false, error: null, finduser: action.payload };
            case FOLLOW_USER_SUCCESS:
                return { ...state, loading: false, error: null, finduser: action.payload };
          
      case LOGIN_USER_FAILURE:
      case REGISTER_USER_FAILURE:
      case GET_USER_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
        case LOGOUT:
            return  initialState;
      
      default:
        return state;
    }
  };
  