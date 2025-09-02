import React from "react";
import Personal from "./Personal";
import Relation from "./Relation";
import Family from "./Family";
import Behavior from "./Behavior";
import Risk from "./Risk";
import Other from "./Other";

const Index = () => {
  const [page, setPage] = React.useState(1);
  return (
    <div>
      {page === 1 && <Personal page={page} setPage={setPage} />}
      {page === 2 && <Relation page={page} setPage={setPage} />}
      {page === 3 && <Family page={page} setPage={setPage} />}
      {page === 4 && <Behavior page={page} setPage={setPage} />}
      {page === 5 && <Risk page={page} setPage={setPage} />}
      {page === 6 && <Other page={page} setPage={setPage} />}
    </div>
  );
};

export default Index;
