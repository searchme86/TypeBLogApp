import React from 'react';

export interface IErrorTextProps {
  error: string;
}

function ErrorText(props: IErrorTextProps) {
  const { error } = props;

  if (error === '') return null;

  return <small className="text-danger">{error}</small>;
}

export default ErrorText;
