import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import Loading from "./Loading";

import { Edit, DeleteOutline } from "@material-ui/icons";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  AppBar,
  withStyles,
} from "@material-ui/core";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <Loading message={"Carregando usuários"} />;
  }

  const TableHeaderCell = withStyles((theme) => ({
    root: {
      fontWeight: "bold",
    },
  }))(TableCell);

  const calculate_age = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const sortByBirthDate = (users) => {
    return users.sort(function (a, b) {
      return a.dataNascimento.getTime() - b.dataNascimento.getTime();
    });
  };

  return (
    <>
      <AppBar position="static">
        <Typography variant="h2" component="h2" align="center">
          Usuários
        </Typography>
      </AppBar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Cidade/UF</TableHeaderCell>
              <TableHeaderCell>Idade</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortByBirthDate(data).map((u) => {
              return (
                <TableRow
                  key={u.id}
                  x={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{u.nome}</TableCell>
                  <TableCell>
                    {u.cidade}/{u.uf}
                  </TableCell>
                  <TableCell>{calculate_age(u.dataNascimento)}</TableCell>
                  <TableCell>
                    <Edit
                      onClick={() =>
                        dispatch(
                          routeActions.redirectTo(routes.USER, { id: u.id })
                        )
                      }
                    />
                    <DeleteOutline />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HomePage;
