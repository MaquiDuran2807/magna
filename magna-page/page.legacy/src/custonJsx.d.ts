declare namespace JSX {
  interface IntrinsicElements {
    img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement> & {
      fetchPriority?: 'high' | 'low' | 'auto';
    }, HTMLImageElement>;
  }
}