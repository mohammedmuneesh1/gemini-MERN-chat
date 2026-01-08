export const generateTitle = (message: string) =>{
    return message.length > 32 ? message.slice(0, 32) + "…" : message;

}