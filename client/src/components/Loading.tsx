import React, { ReactNode } from 'react';

export interface ILoadingProps {
  dotType?: string;
  children?: ReactNode;
}

function Loading(props: ILoadingProps) {
  const { children, dotType } = props;

  return (
    <div className="text-center">
      <div className="stage">
        <div className={dotType} />
      </div>
      {children}
    </div>
  );
}

Loading.defaultProps = {
  dotType: 'dot-bricks',
};

export default Loading;
