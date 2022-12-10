import React, { ReactNode } from 'react';
import Loading from './Loading';
import CenterPiece from './CenterPiece';
import { Card, CardBody } from 'reactstrap';

export interface ILoadingComponentProps {
  card?: boolean;
  dotType?: string;
  children?: ReactNode;
}

function LoadingComponents({
  card,
  children,
  dotType,
}: ILoadingComponentProps) {
  // const { card, children, dotType } = props;

  if (card) {
    return (
      <CenterPiece>
        <Card className="text-center">
          <CardBody>
            <Loading dotType={dotType}>{children}</Loading>
          </CardBody>
        </Card>
      </CenterPiece>
    );
  }

  return (
    <div className="text-center">
      <div className="stage">
        <div className={dotType} />
      </div>
      {children}
    </div>
  );
}

LoadingComponents.defaultProps = {
  card: true,
  dotType: 'dot-bricks',
};

export default LoadingComponents;
