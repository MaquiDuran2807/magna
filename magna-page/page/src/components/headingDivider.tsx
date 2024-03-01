import { motion } from 'framer-motion';




const HeadingDivider: React.FC = (

) => {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            style={{
                height: 2 ,
                
                transformOrigin: 'left',
                width: '30%',
                margin: '0 auto 30px' ,
            }}
            className='heading-divider'
        />
        
    );
};

export default HeadingDivider;
