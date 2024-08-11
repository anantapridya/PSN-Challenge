import { useGetUser } from "@/services/useGetUser";
import { IUser } from "@/type/User";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function User() {
  const getUser = useGetUser();

  return (
    <main className="w-screen h-screen bg-white">
      {/* <button onClick={() => console.log(getUser.data)}>CEK</button> */}
      <div className="card">
        <DataTable value={getUser.data} showGridlines>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="username" header="Username"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column
            header="Address"
            body={(rowData: IUser) => (
              <p>
                {rowData.address.street}, {rowData.address.suite},{" "}
                {rowData.address.city}, {rowData.address.zipcode}
              </p>
            )}
          ></Column>
        </DataTable>
      </div>
    </main>
  );
}
