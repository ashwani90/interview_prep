import React, { Suspense, useState, useTransition } from "react";
import { fetchData, createResource } from "./api/fetchData";
import DataList from "./components/DataList";

export default function App() {
  const [resource, setResource] = useState(null);
  const [isPending, startTransition] = useTransition();

  const loadData = () => {
    startTransition(() => {
      const res = createResource(fetchData());
      setResource(res);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React 18 Suspense + useTransition</h1>
      <button onClick={loadData} disabled={isPending}>
        {isPending ? "Loading..." : "Fetch Data"}
      </button>

      {resource && (
        <Suspense fallback={<p>Loading data...</p>}>
          <DataList resource={resource} />
        </Suspense>
      )}
    </div>
  );
}
