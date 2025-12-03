const getBentoSpan = (index: number) => {
    const patterns = [
      'md:col-span-2 md:row-span-2',     // Big featured
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-2',     // Tall
      'md:col-span-2 md:row-span-1',     // Wide
      'md:col-span-1 md:row-span-1',
      'md:col-span-3 md:row-span-2',     // Huge
      'md:col-span-1 md:row-span-1',
      'md:col-span-2 md:row-span-2',
      'md:col-span-col-span-1 md:row-span-3', // Super tall
      'md:col-span-1 md:row-span-1',
    ];
    return patterns[index % patterns.length] || '';
  };
  export default getBentoSpan;