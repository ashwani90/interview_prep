import React from "react";
import Table from "../components/Table";

export default function Home() {
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Age", accessor: "age" },
    { label: "City", accessor: "city" },
  ];

  const data = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "Chicago" },
    { name: "Charlie", age: 22, city: "San Francisco" },
    { name: "David", age: 35, city: "Los Angeles" },
    { name: "Eve", age: 28, city: "Seattle" },
    { name: "Frank", age: 33, city: "Miami" },
    { name: "Grace", age: 27, city: "Denver" },
    { name: "Hank", age: 40, city: "Boston" },
    { name: "Ivy", age: 29, city: "Austin" },
    { name: "Jack", age: 24, city: "Portland" },
  ];

  return (
    <div>
      <h1>Sortable & Filterable Table with Pagination</h1>
      <Table data={data} columns={columns} />
    </div>
  );
}
