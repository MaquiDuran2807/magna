import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <motion.button
                        onClick={() => toggleAccordion(index)}
                        initial={false}
                        animate={{ backgroundColor: activeIndex === index ? "#f5f5f5" : "#ffffff" }}
                        style={{ marginBottom: 10 }}
                    >
                        {item.question}
                    </motion.button>
                    <AnimatePresence initial={false}>
                        {activeIndex === index && (
                            <motion.div
                                key="content"
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                    open: { opacity: 1, height: "auto" },
                                    collapsed: { opacity: 0, height: 0 },
                                }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: "hidden" }}
                            >
                                <div>{item.answer}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
