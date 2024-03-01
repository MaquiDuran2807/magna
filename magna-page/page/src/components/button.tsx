// Date: 04/04/21
//importar iconos de react icons
import { BsArrowRightCircleFill } from "react-icons/bs";
import './styles/button.css'

interface ButtonProps {
    content: string;
    direction: string;
    button:Boolean;
}

const Button: React.FC<ButtonProps> = ({ content, button }) => {
    
    if (button) {
        return (
            <button className="boton">
            <div className="contenido">
              Contenido
            </div>
            <div className="flecha">
              <BsArrowRightCircleFill />
            </div>
          </button>
    
        );
    }

    return (
        <div className="ver-mas">
            <div className="content">
                {content}<span >
                <BsArrowRightCircleFill />
                </span>
            </div>
        </div>

    );
};

export default Button;
