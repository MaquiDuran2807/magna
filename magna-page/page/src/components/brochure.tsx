

import { pdfjs } from 'react-pdf';  

import { fetchBrochure } from '../api/pagesInfo';
import { useEffect ,useState} from 'react';
import brochure from '../../../../media/brochures/largo_brochure_A4_8.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
    const [pdf, setPdf] = useState<string>("");
    const brochurePath = brochure.replace('/media/brochures/largo_brochure_A4_8.pdf', '');
    const fetchPdf = async () => {
            await fetchBrochure().then((data) => {
                if (!data) return;
                setPdf(data[0].archivo);
            }
            );
        }
        useEffect(() => {
            fetchPdf();
        }, []);
        const pdfUrl = `${brochurePath}${pdf}`;
  return (
    <div>
      <embed src={pdfUrl} type='application/pdf' width='100%' height='700px' />
    </div>
  );
};

export default PdfViewer;