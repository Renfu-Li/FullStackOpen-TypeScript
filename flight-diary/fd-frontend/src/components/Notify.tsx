interface NotifyProps {
  message: string;
  setMessage: (message: string) => void;
}

const Notify = (props: NotifyProps) => {
  return props.message === "" ? null : <p>{props.message}</p>;
};

export default Notify;
