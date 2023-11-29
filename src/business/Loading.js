import { TailSpin } from "react-loader-spinner";
import { Typography, Container, withStyles } from "@material-ui/core";

const Loading = ({ message }) => {
  const LoadingContainer = withStyles((theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }))(Container);
  return (
    <LoadingContainer>
      <Typography variant="h5" gutterBottom>
        {message}
      </Typography>
      <TailSpin
        height="160"
        width="160"
        color="#3F51B5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoadingContainer>
  );
};

export default Loading;
