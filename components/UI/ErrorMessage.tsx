interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="text-red-500 text-center p-4">{message}</div>;
}
