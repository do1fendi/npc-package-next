import * as react from 'react';

interface iProps {
    threshold: number;
    rootMargin: string;
}
declare const useInViewport: (props: iProps) => readonly [react.RefObject<HTMLDivElement | null>, boolean];

export { useInViewport };
