
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PreguntasyrespuestasMagna} from '../types/types'
import { API_PREGUNTASYRESPUESTAS } from "../constans";


interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer, isOpen, onClick }) => {
  
  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
          key="question"
          className="card shadow-sm p-1 mb-1 bg-light rounded cursor-pointer"
          onClick={onClick}
        >
          <motion.div className="text-dark font-weight-bold ml-1">
            {question} <span className="toggle-icon" aria-label={isOpen ? 'Cerrar' : 'Abrir'}>{isOpen ? '-' : '+'}</span>
          </motion.div>
        </motion.div>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
            className="p-2 text-lg text-dark border-left border-bottom border-secondary"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQAccordion: React.FC = () => {
  const [accordionData, setAccordionData] = useState<PreguntasyrespuestasMagna[]>([]);

  useEffect(() => {
    // Make API call to fetch data from the database
    // Replace the URL with your actual API endpoint
    fetch(API_PREGUNTASYRESPUESTAS)
      .then(response => response.json())
      .then(data => setAccordionData(data))
      .catch(error => console.error(error));
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          question={item.pregunta}
          answer={item.respuesta}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
