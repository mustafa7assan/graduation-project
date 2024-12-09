import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "50px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      size={50}
      color="pruple"
      cssOverride={override}
      loading={loading}
    />
  );
};

export default Spinner;
