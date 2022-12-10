import React from 'react';

export interface ISuccessTextProps {
  success: string;
}

function SuccessText(props: ISuccessTextProps) {
  const { success } = props;

  if (success === '') return null;

  return <small className="text-success">{success}</small>;
}

export default SuccessText;
