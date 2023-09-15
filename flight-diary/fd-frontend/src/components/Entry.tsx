interface EntryProps {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

const Entry = (props: EntryProps) => {
  return (
    <div>
      <h4>{props.date}</h4>
      <p>visibility: {props.visibility}</p>
      <p>weather: {props.weather}</p>
      <p>comment: {props.comment}</p>
    </div>
  );
};

export default Entry;
