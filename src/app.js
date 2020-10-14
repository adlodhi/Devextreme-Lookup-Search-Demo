import React from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.dark.css";
import styles from "./app.module.scss";
import { DataGrid, Column, Lookup, FilterRow } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { httpRequest } from "./helper/httpclient";

const url = "https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi";

function App() {
  const orders = {
    store: new CustomStore({
      key: "OrderID",
      load: (loadOption) => {
        return httpRequest(`${url}/Orders`, "Get", undefined, loadOption);
      },
    }),
  };

  const customers = {
    store: new CustomStore({
      key: "Value",
      load: (loadOption) => {
        console.log("LOADOPTIONS", loadOption);
        return httpRequest(`${url}/CustomersLookup`, "Get", undefined, loadOption);
      },
    }),
  };

  return (
    <div className={styles.main}>
      <DataGrid dataSource={orders} showBorders={true} height={600} remoteOperations={true}>
        <FilterRow visible={true} />
        <Column dataField={"CustomerID"} width={500}>
          <Lookup dataSource={customers} valueExpr="Value" displayExpr="Text" />
        </Column>
        <Column dataField="OrderDate" dataType="date" width={200}></Column>
      </DataGrid>
    </div>
  );
}

export default App;
