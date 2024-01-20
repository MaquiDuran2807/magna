import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const accordionData = [
    { question: 'Pregunta 1', answer: 'Respuesta 1' },
    { question: 'Pregunta 2', answer: 'Respuesta 2' },
    { question: 'Pregunta 3', answer: 'Respuesta 3' },
    { question: 'Pregunta 4', answer: 'Respuesta 4' },
    { question: 'Pregunta 5', answer: 'Respuesta 5' },
    { question: 'Pregunta 6', answer: 'Respuesta 6' },
    { question: 'Pregunta 7', answer: 'Respuesta 7' },
    { question: 'Pregunta 8', answer: 'Respuesta 8' },
    { question: 'Pregunta 9', answer: 'Respuesta 9' },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
