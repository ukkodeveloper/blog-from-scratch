import { ReactNode, Children, isValidElement } from 'react';

const BadgesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="gpa-y-2 flex flex-wrap gap-x-2 gap-y-1">
      {Children.map(
        children,
        (child) => isValidElement(child) && <li>{child}</li>
      )}
    </ul>
  );
};

export default BadgesContainer;
