import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";

import {
  auth,
  getcurrentRestaurantId,
  getcurrentRestaurantName,
  getOrders,
  getRestaurants,
} from "../../../firebase";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

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

// function loadServerRows(page, data) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data.rows.slice(page * 5, (page + 1) * 5));
//     }, Math.random() * 500 + 100); // simulate network latency
//   });
// }

export default function RestaurantBookingPage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [restaurantId, setRestaurantId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [orders, setOrders] = useState([]);

  // const columns = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "name",
  //     headerName: "Restaurantname",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "food",
  //     headerName: "Foodname",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "amount",
  //     headerName: "Amount",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "contact",
  //     headerName: "Contact",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  // ];

  const testraws = [
    createData("SOUL BAR&BISTRO", "caesar salad", 2, "1234"),
    createData("SOUL BAR&BISTRO", "caesar salad", 3, "1234"),
    createData("SOUL BAR&BISTRO", "IT", 60483973, "1234"),
    createData("SOUL BAR&BISTRO", "US", 327167434, "1234"),
    createData("SOUL BAR&BISTRO", "CA", 37602103, "1234"),
    createData("SOUL BAR&BISTRO", "AU", 25475400, "1234"),
  ];
  createData(restaurantName, rows[0]);

  const { id } = useParams();
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

  let list = [];
  let lists = [];

  const createRowsData = () => {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i][0]) {
        list.push(
          restaurantName,
          orders[i][0].Food,
          orders[i][0].Amount,
          orders[i].Contact
        );
        lists.push(list);
        list = [];
      } else {
        continue;
      }
    }
    return lists;
  };
  createRowsData();

  function createData(name, order) {
    let food;
    let amount;
    let contact;
    let id;
    if (order) {
      food = order[1];
      amount = order[2];
      contact = order[3];
      id = uuidv1();
    }
    return { id, name, food, amount, contact };
  }

  // let rows = [lists.map((row) => createData(restaurantName, row))];
  // const { data } = createData({
  //   dataSet: "Commodity",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  // useEffect(() => {
  //   let active = true;

  //   (async () => {
  //     setLoading(true);
  //     const newRows = await loadServerRows(page, data);

  //     if (!active) {
  //       return;
  //     }

  //     setRows(newRows);
  //     setLoading(false);
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [page, data]);
  // function createRows(name, food, amount, contact) {
  //   id = uuidv1();

  //   return { id, name, food, amount, contact };
  // }
  // const testraws = [
  //   createRows("SOUL BAR&BISTRO", "caesar salad", 2, "1234"),
  //   createRows("SOUL BAR&BISTRO", "caesar salad", 3, "1234"),
  //   createRows("SOUL BAR&BISTRO", "IT", 60483973, "1234"),
  //   createRows("SOUL BAR&BISTRO", "US", 327167434, "1234"),
  //   createRows("SOUL BAR&BISTRO", "CA", 37602103, "1234"),
  //   createRows("SOUL BAR&BISTRO", "AU", 25475400, "1234"),
  // ];
  // console.log(testraws);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <p>Booking for restaurant: {id}</p>
      <DataGrid
        rows={testraws}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowCount={100}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        loading={loading}
      />
    </div>
  );
}
