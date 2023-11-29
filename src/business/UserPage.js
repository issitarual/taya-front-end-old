import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";

import { Edit, DeleteOutline } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import { ControlledTextField, ZipCodeTextField } from "../components/inputs";
import Loading from "./Loading";
import {
  Typography,
  Button,
  FormControl,
  AppBar,
  withStyles,
} from "@material-ui/core";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };
  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  const getCepData = async (cep) => {
    if (!cep.lenght === 8) return;
    await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
      const { uf, localidade } = res.data;
      data.cidade = localidade;
      data.uf = uf;
    });
  };

  if (loading) {
    return <Loading message={"Carregando usuário"} />;
  }
  const MTextField = withStyles((theme) => ({
    root: {
      width: "100%",
    },
  }))(FormControl);
  return (
    <>
      <AppBar position="static">
        <Typography variant="h2" component="h2" align="center">
          Usuário #{id}
        </Typography>
      </AppBar>

      <MTextField onSubmit={formProps.handleSubmit(handleSubmit)}>
        <ControlledTextField label="Nome" name={"nome"} formProps={formProps} />
        {/* add ZipCodeTextField */}
        <ControlledTextField label="CEP" name={"cep"} formProps={formProps} />
        <ControlledTextField
          label="Cidade"
          name={"cidade"}
          formProps={formProps}
        />
        <ControlledTextField label="UF" name={"uf"} formProps={formProps} />
        <Button type={"submit"}>GRAVAR</Button>
      </MTextField>
    </>
  );
};

export default UserPage;
