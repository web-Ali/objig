declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}
