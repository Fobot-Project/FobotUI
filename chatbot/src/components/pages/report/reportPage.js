import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useAuth } from "../../../context/AuthContext";
import { v1 as uuidv1 } from "uuid";
import {
  auth,
  getcurrentRestaurantId,
  getcurrentRestaurantName,
  getOrders,
  getRestaurants,
} from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function RestaurantOrderPage() {
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        getcurrentRestaurantId(id).then((doc) => {
          setRestaurantId(doc);
        });

        if (restaurantId) {
          getOrders(restaurantId).then((doc) => {
            setOrders(doc);
          });

          getcurrentRestaurantName(restaurantId).then((doc) => {
            setRestaurantName(doc);
          });
        }
      } else {
      }
    });
  }, [restaurantId, id]);

  const columns = [
    {
      id: "name",
      label: "Restaurantname",
      minWidth: 170,
    },

    {
      id: "food",
      label: "Foodname",
      minWidth: 100,
    },

    {
      id: "amount",
      label: "Amount",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "contact",
      label: "Contact",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  let row = [];
  let rows = [];

  const createRowsData = () => {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i][0]) {
        row.push(
          restaurantName,
          orders[i][0].Food,
          orders[i][0].Amount,
          orders[i].Contact
        );
        rows.push(row);
        row = [];
      } else {
        continue;
      }
    }
    return rows;
  };
  createRowsData();

  function createData(name, order) {
    let food;
    let amount;
    let contact;
    if (order) {
      food = order[1];
      amount = order[2];
      contact = order[3];
      // if (order[1].length > 1) {
      // }
    }
    return { name, food, amount, contact };
  }
  console.log(orders[4]);
  rows = rows.map((row) => createData(restaurantName, row));

  return (
    // <p>Order for restaurant: {id}</p>

    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <p>Order for restaurant: {id}</p>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    key={rows.indexOf(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
