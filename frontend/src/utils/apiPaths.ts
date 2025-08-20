export const BASE_URL="https://ai-interview-app-backend.onrender.com";

export const API_PATHS={
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:'/api/auth/profile'
    },
    IMAGE:{
        UPLOAD_IMAGE:'/api/auth/upload-image'
    },
    AI:{
        GENERATE_QUESTIONS:'/api/ai/generate-question',
        GENERATE_EXPLANATION:'/api/ai/generate-explanation',
    },
    SESSION:{
        CREATE:'/api/session/create',
        GET_ALL:'/api/session/my-sessions',
        GET_ONE:(id:string)=>`/api/session/${id}`,
        DELETE:(id:string)=>`/api/session/${id}`,
    },
    QUESTION:{
        ADD_TO_SESSION:'/api/questions/add',
        PIN:(id:string)=>`/api/questions/${id}/pin`,
        NOTE:(id:string)=>`/api/questions/${id}/note`
    },
}