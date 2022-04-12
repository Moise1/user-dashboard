interface Props{
    overflow?: boolean;    
    autoremove?: boolean;    
    time?: number;        
    size?: string;       
    cartoon?: boolean;      
    limit?: number;            
    text?: string;
}
declare module 'mini-alert'{
    const miniAlert: (args: Props) => void;
    export default miniAlert;
};
